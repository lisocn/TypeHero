const { _electron } = require('playwright')
const assert = require('node:assert/strict')
const { mkdirSync, mkdtempSync, existsSync } = require('node:fs')
const { join, resolve } = require('node:path')

const root = resolve(__dirname, '../..')
const testDirectory = join(root, '.desktop-test')
mkdirSync(testDirectory, { recursive: true })
const profile = mkdtempSync(join(testDirectory, 'profile-'))
const executablePath = process.env.TYPEHERO_TEST_EXECUTABLE || require('electron')
const env = { ...process.env, TYPEHERO_USER_DATA: profile, TYPEHERO_SMOKE_TEST: '1' }
delete env.ELECTRON_RUN_AS_NODE
let desktopApp

async function checkFullscreen(page, playing = false) {
  const input = (type, keyCode) => desktopApp.evaluate(({ BrowserWindow }, input) => BrowserWindow.getAllWindows()[0].webContents.sendInputEvent(input), { type, keyCode })
  const press = async key => { await input('keyDown', key); await input('keyUp', key) }
  const fullscreen = () => desktopApp.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows()[0].isFullScreen())
  const waitForFullscreen = async expected => {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await fullscreen() === expected) return
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    assert.fail(`Fullscreen did not become ${expected}`)
  }
  await page.evaluate(() => {
    if (window.__escapeListener) window.removeEventListener('keydown', window.__escapeListener)
    window.__escapeEvents = 0
    window.__escapeListener = event => { if (event.key === 'Escape') window.__escapeEvents++ }
    window.addEventListener('keydown', window.__escapeListener)
  })
  await press('F11')
  await waitForFullscreen(true)
  await press('F11')
  await waitForFullscreen(false)
  // Enter via the native menu too, then leave while a renderer control has focus.
  await desktopApp.evaluate(({ Menu, BrowserWindow }) => {
    const item = Menu.getApplicationMenu().items.find(item => item.label === '显示').submenu.items.find(item => item.role === 'togglefullscreen')
    item.click(undefined, BrowserWindow.getAllWindows()[0])
  })
  await waitForFullscreen(true)
  await page.locator('button').first().focus()
  await input('keyDown', 'Escape')
  await waitForFullscreen(false)
  await input('keyDown', 'Escape') // Held key must not leak a repeat into the game.
  await input('keyUp', 'Escape')
  assert.equal(await page.evaluate(() => window.__escapeEvents), 0)
  if (playing) assert.equal(await page.locator('.game-text').isVisible(), true)
  await press('Escape')
  assert.equal(await page.evaluate(() => window.__escapeEvents), 1)
  if (playing) {
    await page.getByRole('button', { name: '▶️ 继续', exact: true }).waitFor()
    await page.getByRole('button', { name: '▶️ 继续', exact: true }).press('Enter')
    await page.locator('.game-text').waitFor()
  }
  console.log('PASS: F11 toggles fullscreen; Escape exits menu fullscreen without reaching game controls; windowed Escape still works')
}

async function launch() {
  desktopApp = await _electron.launch({ executablePath, args: process.env.TYPEHERO_TEST_EXECUTABLE ? [] : [root], env })
  const page = await desktopApp.firstWindow()
  page.setDefaultTimeout(15000)
  page.on('pageerror', error => { throw error })
  await page.waitForLoadState('domcontentloaded')
  assert.equal(await page.evaluate(() => location.origin), 'typehero://app')
  return page
}

async function main() {
  let page = await launch()
  await page.getByRole('button', { name: /开始冒险/ }).waitFor()
  await checkFullscreen(page)
  const foreignRequests = []
  page.on('request', request => { if (!request.url().startsWith('typehero://app/')) foreignRequests.push(request.url()) })
  await page.keyboard.press('Enter')
  await page.getByLabel('英雄昵称').fill('离线测试')
  await page.getByLabel('英雄昵称').press('Enter')
  await page.locator('.textbook-card').first().waitFor()
  await page.locator('.textbook-card').first().click()
  await page.getByRole('button', { name: /确认选择/ }).click()
  await page.waitForURL('**/adventure')
  await page.locator('.adventure-level').first().waitFor()
  await page.keyboard.press('Enter')
  await page.waitForURL('**/eng-3a-ch1-l1')
  await page.keyboard.press('Enter')
  await page.locator('.game-text').waitFor()
  await checkFullscreen(page, true)
  await page.keyboard.type('rulepbag', { delay: 20 })
  await page.getByText('🎉 关卡完成！').waitFor()
  await page.waitForFunction(async () => {
    const response = await fetch('/api/progress', { headers: { Authorization: `Bearer ${localStorage.getItem('typehero_token')}` } })
    const { progress } = await response.json()
    return progress['eng-3a-ch1']?.['eng-3a-ch1-l1']?.completed
  })
  const token = await page.evaluate(() => localStorage.getItem('typehero_token'))
  const exp = await page.evaluate(() => JSON.parse(localStorage.getItem('typehero-user')).state.user.totalExp)
  assert.ok(token && exp > 0)
  assert.deepEqual(foreignRequests, [])
  await desktopApp.close()
  desktopApp = null
  assert.ok(existsSync(join(profile, 'data.db')))

  page = await launch()
  await page.locator('.textbook-card').first().waitFor()
  assert.equal(await page.evaluate(() => localStorage.getItem('typehero_token')), token)
  assert.equal(await page.locator('.textbook-card').first().getAttribute('aria-pressed'), 'true')
  await page.getByRole('button', { name: /确认选择/ }).click()
  await page.waitForURL('**/adventure')
  await page.locator('.adventure-level').nth(1).waitFor()
  assert.equal(await page.locator('.adventure-level').nth(1).isEnabled(), true)
  const me = await page.evaluate(async () => {
    const r = await fetch('/api/me', { headers: { Authorization: `Bearer ${localStorage.getItem('typehero_token')}` } })
    return (await r.json()).user
  })
  assert.equal(me.nickname, '离线测试')
  assert.equal(me.totalExp, exp)
  await page.screenshot({ path: join(testDirectory, 'restored-progress.png') })
  await desktopApp.close()
  desktopApp = null
  console.log('PASS: offline desktop launch, registration, textbook selection, level completion, local database, identity and progress restored after restart')
  console.log(`Isolated test save: ${profile}`)
}

main().catch(async error => {
  console.error(error)
  if (desktopApp) await desktopApp.close().catch(() => {})
  process.exitCode = 1
})
