const { app, BrowserWindow, Menu, dialog, protocol, shell, session } = require('electron')
const { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } = require('node:fs')
const { join, resolve, extname, sep } = require('node:path')
const { pathToFileURL } = require('node:url')

app.setName('TypeHero')
const userDataPath = process.env.TYPEHERO_USER_DATA || join(app.getPath('appData'), 'TypeHero')
mkdirSync(userDataPath, { recursive: true })
app.setPath('userData', userDataPath)
protocol.registerSchemesAsPrivileged([{ scheme: 'typehero', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } }])

let mainWindow
let localServer
let quitting = false
const root = join(__dirname, '..')
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2', '.json': 'application/json' }
const contentSecurityPolicy = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; frame-src 'none'"

function logFailure(error) {
  const message = error?.stack || String(error)
  writeFileSync(join(userDataPath, 'startup-error.log'), `${new Date().toISOString()}\n${message}\n`)
  dialog.showErrorBox('TypeHero 启动失败', `请重新打开程序。若仍无法启动，请将存档目录中的 startup-error.log 发给开发者。\n\n${String(error.message || error)}`)
}

async function serveApp(request) {
  const url = new URL(request.url)
  if (url.host !== 'app') return new Response('Not found', { status: 404 })
  if (url.pathname.startsWith('/api/')) {
    const headers = new Headers(request.headers)
    headers.delete('host')
    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : Buffer.from(await request.arrayBuffer())
    return fetch(`${localServer.url}${url.pathname}${url.search}`, { method: request.method, headers, body })
  }
  const directory = resolve(root, 'dist')
  let file = resolve(directory, `.${decodeURIComponent(url.pathname)}`)
  if (file !== directory && !file.startsWith(`${directory}${sep}`)) return new Response('Forbidden', { status: 403 })
  if (!existsSync(file) || !statSync(file).isFile()) {
    if (extname(url.pathname)) return new Response('Not found', { status: 404 })
    file = join(directory, 'index.html')
  }
  return new Response(readFileSync(file), { headers: {
    'Content-Type': mimeTypes[extname(file)] || 'application/octet-stream',
    'Content-Security-Policy': contentSecurityPolicy,
  } })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'TypeHero 打字小英雄', width: 1600, height: 1000, minWidth: 900, minHeight: 650,
    backgroundColor: '#0f172a', show: false, icon: join(__dirname, 'icon.ico'),
    webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true, autoplayPolicy: 'no-user-gesture-required' },
  })
  mainWindow.once('ready-to-show', () => {
    if (process.env.TYPEHERO_SMOKE_TEST !== '1') { mainWindow.maximize(); mainWindow.show() }
  })
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('typehero://app/')) event.preventDefault()
  })
  mainWindow.loadURL('typehero://app/').catch(logFailure)
}

if (!app.requestSingleInstanceLock()) app.quit()
else {
  app.on('second-instance', () => {
    if (!mainWindow) return
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.show()
    mainWindow.focus()
  })
  app.whenReady().then(async () => {
    const { startServer } = await import(pathToFileURL(join(root, 'server/src/index.js')).href)
    localServer = await startServer({ port: 0, host: '127.0.0.1', dbPath: join(userDataPath, 'data.db') })
    await protocol.handle('typehero', serveApp)
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { label: '游戏', submenu: [
        { label: '打开存档文件夹', click: () => { void shell.openPath(userDataPath) } },
        { type: 'separator' }, { role: 'quit', label: '退出' },
      ] },
      { label: '显示', submenu: [
        { role: 'resetZoom', label: '恢复默认大小' },
        { role: 'zoomIn', label: '放大' }, { role: 'zoomOut', label: '缩小' },
        { role: 'togglefullscreen', label: '全屏' },
      ] },
    ]))
    createWindow()
  }).catch(error => { logFailure(error); app.quit() })
  app.on('window-all-closed', () => app.quit())
  app.on('before-quit', event => {
    if (quitting || !localServer) return
    event.preventDefault()
    quitting = true
    session.defaultSession.flushStorageData()
    void localServer.close().catch(logFailure).finally(() => app.quit())
  })
}
