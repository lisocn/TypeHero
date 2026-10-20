const { _electron } = require('playwright')
const assert = require('node:assert/strict')
const { mkdirSync, mkdtempSync } = require('node:fs')
const { join, resolve } = require('node:path')

const root = resolve(__dirname, '../..')
const base = join(root, '.desktop-test')
mkdirSync(base, { recursive: true })
const env = { ...process.env, TYPEHERO_USER_DATA: mkdtempSync(join(base, 'chinese-')), TYPEHERO_SMOKE_TEST: '1' }
delete env.ELECTRON_RUN_AS_NODE
let desktopApp

async function main() {
  desktopApp = await _electron.launch({
    executablePath: process.env.TYPEHERO_TEST_EXECUTABLE || require('electron'),
    args: process.env.TYPEHERO_TEST_EXECUTABLE ? [] : [root], env,
  })
  const page = await desktopApp.firstWindow()
  await page.setViewportSize({ width: 1920, height: 1080 })
  page.setDefaultTimeout(15000)
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.getByRole('button', { name: /开始冒险/ }).click()
  await page.getByLabel('英雄昵称').fill('中文输入测试')
  await page.getByLabel('英雄昵称').press('Enter')
  await page.locator('.textbook-card').first().waitFor()
  const cdp = await page.context().newCDPSession(page)
  async function openLevel(chapter, level) {
    await page.goto(`typehero://app/adventure/${chapter}/${level}`)
    await page.getByRole('button', { name: '立即开始', exact: true }).click()
    await page.locator('.game-text').waitFor()
  }
  const currentIndex = () => page.locator('.game-panel-heading').innerText().then(text => Number(text.match(/(\d+) \/ /)[1]))
  async function compose(preedit, committed) {
    await cdp.send('Input.imeSetComposition', { text: preedit, selectionStart: preedit.length, selectionEnd: preedit.length })
    await cdp.send('Input.insertText', { text: committed })
  }

  await openLevel('chn-3a-ch1', 'chn-3a-ch1-l2')
  const input = page.getByLabel('中文输入区', { exact: true })
  assert.equal(await input.evaluate(el => document.activeElement === el), true)
  const sentences = page.locator('.game-chinese-sentence')
  assert.equal(await sentences.count(), 4)
  assert.deepEqual(await sentences.allTextContents(), ['天门中断楚江开', '碧水东流至此回', '两岸青山相对出', '孤帆一片日边来'])
  const boxes = await sentences.evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { top: r.top, bottom: r.bottom } }))
  assert.ok(boxes[1].top > boxes[0].bottom, 'Chinese sentences must have visible vertical spacing')
  const layout = await page.locator('.game-text-panel').evaluate(el => ({ bottom: el.getBoundingClientRect().bottom, viewport: innerHeight }))
  assert.ok(layout.bottom < layout.viewport, 'Chinese text and input must fit the 1080p viewport')
  await page.screenshot({ path: join(base, 'chinese-sentences.png') })

  await cdp.send('Input.imeSetComposition', { text: 'tianmen', selectionStart: 7, selectionEnd: 7 })
  assert.equal(await currentIndex(), 0, 'Preedit must not count as Latin errors')
  // Candidate confirmation must not trigger the page Enter pause shortcut.
  await input.dispatchEvent('keydown', { key: 'Enter', keyCode: 229, isComposing: true })
  await cdp.send('Input.insertText', { text: '天门' })
  assert.equal(await currentIndex(), 2)
  assert.equal(await input.inputValue(), '')
  await compose('zhongduan', '中断')
  assert.equal(await currentIndex(), 4)
  await input.dispatchEvent('input', { inputType: 'insertFromComposition', data: '中断', isComposing: false })
  assert.equal(await currentIndex(), 4, 'Trailing input event must not double count a composition')
  // Cancel a composition with Escape; no score and no game pause.
  await cdp.send('Input.imeSetComposition', { text: 'wrong', selectionStart: 5, selectionEnd: 5 })
  await input.dispatchEvent('keydown', { key: 'Escape', isComposing: true })
  await cdp.send('Input.imeSetComposition', { text: '', selectionStart: 0, selectionEnd: 0 })
  assert.equal(await currentIndex(), 4)
  assert.equal(await page.locator('.game-text').isVisible(), true)
  await compose('chujiangkai', '楚江开')
  await compose('bishuidongliuzhicihui', '碧水东流至此回')
  await compose('lianganqingshanxiangduichu', '两岸青山相对出')
  await compose('gufanyipianribianlai', '孤帆一片日边来')
  await page.getByText('🎉 关卡完成！').waitFor()
  assert.match(await page.locator('.game-stats').innerText(), /100%/)
  console.log('PASS: native Chromium IME preedit, candidate confirmation, cancellation, multi-character commits, sentence spacing and 100% accurate completion')

  // Older entries without a language tag must also use Chinese input.
  await openLevel('chn-3a-ch2', 'chn-3a-ch2-l1')
  await page.getByLabel('中文输入区', { exact: true }).waitFor()
  await compose('chenrongqiu', '晨绒球')
  assert.equal(await currentIndex(), 3)
  await page.getByLabel('中文输入区', { exact: true }).press('Escape')
  await page.getByRole('button', { name: '▶️ 继续', exact: true }).click()
  await page.getByLabel('中文输入区', { exact: true }).waitFor()
  await compose('hanyanfu', '汉艳服')
  await page.getByText('🎉 关卡完成！').waitFor()

  await openLevel('chn-3a-ch2', 'chn-3a-ch2-l2')
  assert.equal(await page.locator('.game-chinese-word').count(), 6)
  await compose('zaochen', '早晨')
  assert.equal(await currentIndex(), 2)
  await compose('rongcuo', '绒错')
  assert.equal(await currentIndex(), 4)
  assert.match(await page.locator('.game-stats').innerText(), /75%/)
  await openLevel('chn-3a-ch2', 'chn-3a-ch2-l3')
  assert.equal(await page.locator('.game-chinese-paragraph').count(), 3)
  await compose('zaochen', '早晨')
  await cdp.send('Input.insertText', { text: '，' })
  assert.equal(await currentIndex(), 3)
  assert.match(await page.locator('.game-stats').innerText(), /100%/)
  await page.setViewportSize({ width: 1536, height: 864 })
  const scaledLayout = await page.getByLabel('中文输入区', { exact: true }).evaluate(el => ({ bottom: el.getBoundingClientRect().bottom, viewport: innerHeight }))
  assert.ok(scaledLayout.bottom < scaledLayout.viewport, 'Chinese input must fit 1080p at 125% display scaling')
  await page.setViewportSize({ width: 390, height: 844 })
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  await page.screenshot({ path: join(base, 'chinese-mobile.png'), fullPage: true })
  await page.setViewportSize({ width: 1920, height: 1080 })
  // Pinyin remains a Latin keyboard exercise; no Chinese text field.
  await openLevel('chn-3a-ch1', 'chn-3a-ch1-l1')
  assert.equal(await page.getByLabel('中文输入区', { exact: true }).count(), 0)
  await page.keyboard.type('tian men ')
  assert.equal(await currentIndex(), 9)
  assert.match(await page.locator('.game-stats').innerText(), /100%/)
  assert.deepEqual(errors, [])
  console.log('PASS: untagged Chinese levels, wrong-character scoring, native punctuation, pause/resume, 125% scaling, mobile layout and Latin pinyin regression')
  await page.screenshot({ path: join(base, 'chinese-pinyin.png') })
  await desktopApp.close()
  desktopApp = null
}

main().catch(async error => {
  console.error(error)
  if (desktopApp) await desktopApp.close().catch(() => {})
  process.exitCode = 1
})
