# Drawnix Mac APP

將 Drawnix 打包成 Mac 應用程式。

## 使用方式

### 打包 APP

```bash
cd electron-app
npm run build:all
```

### 執行 APP

```bash
open electron-app/release/mac-arm64/Drawnix.app
```

或安裝 DMG：`electron-app/release/Drawnix-0.0.2-arm64.dmg`

## 開發模式

**終端 1 - 啟動 web 開發伺服器：**
```bash
npm run start
```

**終端 2 - 啟動 Electron：**
```bash
cd electron-app && npm start
```

## 技術細節

`build-electron.js` 會自動：
1. Build web app (`npm run build:web`)
2. 修正 HTML 路徑為 Electron 相容格式（移除 `<base>` 標籤，改為相對路徑）
3. 使用 electron-builder 打包成 Mac APP

所有修改都只在 `electron-app/` 目錄內，不影響主專案檔案。
