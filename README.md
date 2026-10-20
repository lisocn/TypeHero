# TypeHero 打字小英雄

面向小学三至六年级的教材打字练习游戏，支持英语、语文、中文释义、拼读提示、语音倒计时和通关鼓励。

## Windows 免安装版

把 `release/TypeHero-1.0.0-Windows-x64.exe` 发给使用者。Windows 10 / 11 的 64 位电脑直接双击打开即可，不需要安装 Node.js、数据库或浏览器插件，也不需要管理员权限。

教材、词义、语音和音效均随程序打包，日常练习不需要联网。第一次使用创建一个英雄，选择教材即可开始。

快捷键：Enter 开始/暂停/继续，结算页 Enter 下一关、R 重玩、Esc 返回地图。Tab 切换按钮，F11 全屏。

## 本地存档

存档位置：`%APPDATA%\TypeHero`，通常对应 `C:\Users\你的用户名\AppData\Roaming\TypeHero`。

- `data.db` 保存角色、教材选择、关卡进度和统计信息。
- 同目录内的浏览器存储保存登录状态、设置及其他本地进度；请一起保留。
- 程序菜单“游戏 → 打开存档文件夹”可直接找到存档。
- 备份/迁移时先退出程序，再复制整个 `TypeHero` 存档文件夹。
- 程序改名、移动或替换新版本 exe 不影响存档。不同 Windows 用户的存档相互独立。
- 分发 exe 不会附带开发者的个人存档。

## 开发和打包

建议使用 Node.js 24.x。

```powershell
npm install
npm run desktop:dev
npm run desktop:pack
```

输出在 `release/`。只需分发其中的单文件 `.exe`，不需要发送 `win-unpacked` 目录。

如 Electron 二进制未自动下载，先执行 `node node_modules/electron/install.js`，再打包。打包工具首次运行需要联网下载 Electron 和 Windows 打包工具，最终用户运行无需这些工具。

网页开发仍支持两个终端分别运行 `npm run dev` 和 `npm run dev:server`。网页生产构建使用 `npm run build`；桌面构建使用 `npm run build:desktop`。

## 验证

```powershell
node --test tests/*.test.mjs
npm run desktop:test
```

桌面测试使用 `.desktop-test/` 中的隔离存档，不读取真实用户存档。设置 `TYPEHERO_TEST_EXECUTABLE` 可测试 `release/win-unpacked/TypeHero.exe`。
