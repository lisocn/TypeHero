const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const { mkdirSync, mkdtempSync, copyFileSync } = require('node:fs')
const { join, resolve } = require('node:path')
const net = require('node:net')
const assert = require('node:assert/strict')

const root = resolve(__dirname, '../..')
const base = join(root, '.desktop-test')
mkdirSync(base, { recursive: true })
const testDirectory = mkdtempSync(join(base, 'portable-'))
const profile = join(testDirectory, 'save')
const executable = join(root, `release/TypeHero-${require('../../package.json').version}-Windows-x64.exe`)
const env = { ...process.env, TYPEHERO_USER_DATA: profile, TYPEHERO_SMOKE_TEST: '1' }
delete env.ELECTRON_RUN_AS_NODE
let activePage
let activeProcess

async function launch(file) {
  const listener = net.createServer()
  await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve))
  const port = listener.address().port
  await new Promise(resolve => listener.close(resolve))
  const child = spawn(file, [`--remote-debugging-port=${port}`], { env, windowsHide: true, stdio: 'ignore' })
  activeProcess = child
  let browser
  for (let attempt = 0; attempt < 160; attempt++) {
    try { browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`, { timeout: 1000 }); break }
    catch { await new Promise(resolve => setTimeout(resolve, 250)) }
  }
  assert.ok(browser, 'Portable executable did not open its desktop window')
  const context = browser.contexts()[0]
  const page = context.pages()[0] || await context.waitForEvent('page')
  activePage = page
  page.setDefaultTimeout(15000)
  await page.waitForLoadState('domcontentloaded')
  assert.equal(new URL(page.url()).origin, 'null') // Node does not register Electron's custom schemes.
  assert.equal(await page.evaluate(() => location.origin), 'typehero://app')
  return { page, child }
}

async function close({ page, child }) {
  await page.close()
  if (child.exitCode === null) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Portable executable did not shut down')), 20000)
      child.once('exit', () => { clearTimeout(timer); resolve() })
    })
  }
  activePage = null
  activeProcess = null
}

async function main() {
  let instance = await launch(executable)
  let page = instance.page
  await page.getByRole('button', { name: /开始冒险/ }).waitFor()
  await page.keyboard.press('Enter')
  await page.getByLabel('英雄昵称').fill('便携版测试')
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
  await page.keyboard.type('rulepbag', { delay: 20 })
  await page.getByText('🎉 关卡完成！').waitFor()
  await page.waitForFunction(async () => {
    const r = await fetch('/api/progress', { headers: { Authorization: `Bearer ${localStorage.getItem('typehero_token')}` } })
    const { progress } = await r.json()
    return progress['eng-3a-ch1']?.['eng-3a-ch1-l1']?.completed
  })
  const token = await page.evaluate(() => localStorage.getItem('typehero_token'))
  await close(instance)
  console.log('PASS actual single-file exe: launch, registration, textbook and completed level saved')

  const renamed = join(testDirectory, '打字小英雄.exe')
  copyFileSync(executable, renamed)
  instance = await launch(renamed)
  page = instance.page
  await page.locator('.textbook-card').first().waitFor()
  assert.equal(await page.evaluate(() => localStorage.getItem('typehero_token')), token)
  assert.equal(await page.locator('.textbook-card').first().getAttribute('aria-pressed'), 'true')
  await page.getByRole('button', { name: /确认选择/ }).click()
  await page.waitForURL('**/adventure')
  await page.locator('.adventure-level').nth(1).waitFor()
  assert.equal(await page.locator('.adventure-level').nth(1).isEnabled(), true)
  await page.screenshot({ path: join(base, 'portable-restored-progress.png') })
  await close(instance)
  console.log('PASS copied/renamed single-file exe: same local identity and progress restored')
}

main().catch(async error => {
  console.error(error)
  if (activePage) await activePage.close().catch(() => {})
  if (activeProcess && activeProcess.exitCode === null) activeProcess.kill()
  process.exitCode = 1
})
