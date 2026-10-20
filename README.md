# TypeHero 打字小英雄

面向小学三至六年级的教材打字练习游戏，支持英语、语文、中文释义、拼读提示、语音倒计时和通关鼓励。

## 普通用户：下载后直接运行

适用系统：Windows 10 / 11，64 位。

把打包生成的 `release/TypeHero-1.0.0-Windows-x64.exe` 发给使用者，双击即可运行，不需要安装开发环境、数据库或浏览器插件，也不需要管理员权限。

教材、词义、语音和音效均随程序打包，日常练习不需要联网。第一次使用创建一个英雄，选择教材即可开始。

### 键盘操作

| 按键 | 功能 |
| --- | --- |
| 回车键（Enter） | 开始练习、暂停或继续；结算时进入下一关 |
| R | 结算或暂停时重玩当前关卡 |
| Esc | 桌面全屏时优先退出全屏；窗口模式下练习时暂停、结算时返回冒险地图 |
| Tab | 切换当前选中的按钮 |
| F11 | 切换全屏显示 |

## 本地存档

存档位置：`%APPDATA%\TypeHero`，通常对应 `C:\Users\你的用户名\AppData\Roaming\TypeHero`。

- `data.db` 保存角色、教材选择、关卡进度和统计信息。
- 同目录内的浏览器存储保存登录状态、设置及其他本地进度；请一起保留。
- 程序菜单“游戏 → 打开存档文件夹”可直接找到存档。
- 备份/迁移时先退出程序，再复制整个 `TypeHero` 存档文件夹。
- 程序改名、移动或替换新版本 `.exe` 不影响存档。不同 Windows 用户的存档相互独立。
- 分发 `.exe` 不会附带开发者的个人存档。

## 开发者：运行和打包

开发环境建议使用 Node.js 24.x，自带的 npm 用于安装依赖和执行命令。以下命令均在项目根目录执行。

### 启动桌面版

```powershell
npm install
npm run desktop:dev
```

### 打包 Windows 免安装版

```powershell
npm run desktop:pack
```

输出在 `release/`。只需分发其中的单文件 `.exe`，不需要发送 `win-unpacked` 目录。

如 Electron 二进制未自动下载，先执行 `node node_modules/electron/install.js`，再打包。打包工具首次运行需要联网下载 Electron 和 Windows 打包工具，最终用户运行无需这些工具。

### 启动网页版

打开两个终端，分别执行：

```powershell
# 终端一：启动网页界面
npm run dev

# 终端二：启动本地服务
npm run dev:server
```

网页生产构建使用 `npm run build`；桌面构建使用 `npm run build:desktop`。

### macOS 说明

Windows 的 `.exe` 无法在 macOS 上直接运行。目前仓库提供 Windows 便携版打包配置，macOS 的应用打包配置及实际运行验证尚未完成。

## 开发验证

```powershell
# 运行单元测试
node --test tests/*.test.mjs

# 构建桌面版并验证主要操作流程
npm run desktop:test
```

桌面测试使用 `.desktop-test/` 中的隔离存档，不读取真实用户存档。设置 `TYPEHERO_TEST_EXECUTABLE` 可测试 `release/win-unpacked/TypeHero.exe`。
