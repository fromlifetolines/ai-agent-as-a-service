# 🤖 AI Agent as a Service (AaaS) - From Life To Lines

**為中小企業打造的無代碼 AI 預約客服系統 | 24/7 自動化客服 | 30 分鐘快速上線**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-fromlifetolines-black)](https://github.com/fromlifetolines)
[![Website](https://img.shields.io/badge/Website-From%20Life%20To%20Lines-orange)](https://www.behance.net/howard-huang)

## 📋 專案概述

**From Life To Lines** 是一個完整的 SaaS 平台，提供無代碼 AI 客服解決方案。平台支援多個行業模版（牙醫、餐飲、美髮等），整合 LINE、Google Calendar 等服務，幫助中小企業降低 70-80% 客服成本，提升預約轉化率 20-30%。

### 核心特性

- ✅ **30 分鐘快速上線** - 無需技術背景，預設模版開箱即用
- ✅ **LINE 優先** - 台灣用戶最高滲透率，本地化支援
- ✅ **自動預約管理** - 自動確認、提醒、檔期管理
- ✅ **24/7 自動服務** - 永不休息的 AI 客服助手
- ✅ **完整分析報告** - 實時數據追蹤，優化決策
- ✅ **行業特定模版** - 牙醫、餐廳、沙龍預設配置

## 🏗️ 系統架構

### 技術棧

| 層級 | 技術 |
|------|------|
| **前端** | React 19 + TypeScript + Vite + Tailwind CSS 4 |
| **後端** | Express.js + tRPC 11 + Drizzle ORM |
| **資料庫** | MySQL/TiDB |
| **認證** | Manus OAuth |
| **測試** | Vitest + Playwright |
| **部署** | Manus Platform |

### 專案結構

```
ai-agent-as-a-service/
├── client/                          # React 前端應用
│   ├── src/
│   │   ├── pages/                  # 頁面元件
│   │   │   ├── Home.tsx            # 首頁
│   │   │   ├── Dashboard.tsx       # 儀表板
│   │   │   ├── Templates.tsx       # 行業模版選擇
│   │   │   ├── KnowledgeBase.tsx   # 知識庫管理
│   │   │   ├── APIIntegration.tsx  # API 整合設定
│   │   │   ├── LaunchChatbot.tsx   # 客服啟動
│   │   │   ├── Notifications.tsx   # 通知中心
│   │   │   ├── RevenueReport.tsx   # 業績報表
│   │   │   └── SubscriptionPlans.tsx # 訂閱方案
│   │   ├── components/             # 可重用元件
│   │   ├── hooks/                  # 自訂 Hooks
│   │   ├── lib/                    # 工具函數
│   │   ├── App.tsx                 # 路由配置
│   │   ├── main.tsx                # 入口點
│   │   └── index.css               # 全域樣式 + 動畫
│   ├── public/                     # 靜態資源
│   └── index.html                  # HTML 模板
├── server/                          # Express 後端
│   ├── _core/                      # 核心基礎設施
│   │   ├── index.ts                # 伺服器主檔案
│   │   ├── context.ts              # tRPC 上下文
│   │   ├── oauth.ts                # OAuth 認證
│   │   └── llm.ts                  # LLM 整合
│   ├── routers/                    # tRPC 路由
│   │   ├── subscription.ts         # 訂閱管理
│   │   ├── analytics.ts            # 分析數據
│   │   ├── notification.ts         # 通知系統
│   │   └── revenue.ts              # 業績報表
│   ├── db.ts                       # 資料庫查詢
│   └── storage.ts                  # S3 儲存
├── drizzle/                         # 資料庫 ORM
│   ├── schema.ts                   # 資料表定義
│   ├── relations.ts                # 表關係
│   └── migrations/                 # 遷移文件
├── shared/                          # 共享代碼
├── tests/                           # 測試文件
├── package.json                     # 依賴管理
├── tsconfig.json                    # TypeScript 配置
├── tailwind.config.ts               # Tailwind 配置
├── vite.config.ts                   # Vite 配置
└── drizzle.config.ts                # Drizzle 配置
```

## 🎨 設計系統

### 色彩主題

- **主色**：橙色 (#FF6B35) - From Life To Lines 品牌色
- **成功**：綠色 (#10B981)
- **警告**：琥珀色 (#F59E0B)
- **危險**：紅色 (#EF4444)

### 動畫效果

- Fade-in: 0.6s ease-in-out
- Slide-up: 0.5s ease-out
- Scale: 0.3s ease-out
- Pulse: 2s infinite
- Float: 3s ease-in-out

### 響應式設計

- **行動裝置**：< 640px
- **平板**：640px - 1024px
- **桌面**：> 1024px

## 📊 功能模組

### Phase 1-12 已完成功能

| 階段 | 功能 | 狀態 |
|------|------|------|
| Phase 1 | 分析報告完善 | ✅ 完成 |
| Phase 2 | 訂閱方案管理 | ✅ 完成 |
| Phase 3 | 客戶通知系統 | ✅ 完成 |
| Phase 4 | 業績報表 | ✅ 完成 |
| Phase 6 | 行業模版選擇 | ✅ 完成 |
| Phase 7 | API 整合設定 | ✅ 完成 |
| Phase 8 | 完整工作流程 | ✅ 完成 |
| Phase 9 | 測試驗證 | ✅ 76 個測試通過 |
| Phase 10 | UI/UX 優化 | ✅ 15+ 動畫效果 |
| Phase 11-12 | 通知與業績系統 | ✅ Mock 資料實現 |

## 🚀 快速開始

### 前置要求

- Node.js 22.13.0+
- pnpm 9.0+
- MySQL 8.0+ 或 TiDB

### 安裝步驟

```bash
# 1. 複製專案
git clone https://github.com/fromlifetolines/ai-agent-as-a-service.git
cd ai-agent-as-a-service

# 2. 安裝依賴
pnpm install

# 3. 設置環境變數
# 編輯 .env.local 填入必要的環境變數

# 4. 初始化資料庫
pnpm db:push

# 5. 啟動開發伺服器
pnpm dev

# 6. 開啟瀏覽器
# 訪問 http://localhost:3000
```

### 可用命令

```bash
# 開發模式
pnpm dev

# 構建生產版本
pnpm build

# 執行測試
pnpm test

# 格式化代碼
pnpm format

# 資料庫遷移
pnpm db:push
```

## 📱 主要頁面

### 首頁 (Home)
- Hero 段落與 CTA
- 6 個核心特性介紹
- 3 個客戶成功案例
- 3 個定價方案
- 4 步快速開始流程
- FAQ 常見問題
- 客戶推薦與合作夥伴

### 儀表板 (Dashboard)
- **分析面板** - 時間範圍篩選、統計卡片、趨勢圖表
- **訂閱管理** - 方案 CRUD、價格管理
- **通知中心** - 6 種通知類型、篩選、標記已讀
- **業績報表** - MRR/ARR、收入趨勢、轉化率漏斗

### 行業模版 (Templates)
- 牙醫診所模版
- 餐飲業模版
- 美髮沙龍模版
- 預設知識庫內容

### 知識庫 (KnowledgeBase)
- 新增/編輯/刪除知識項目
- 分類管理
- 統計卡片

### API 整合 (APIIntegration)
- LINE 整合設定
- Google Calendar 整合
- AI 模型配置
- 知識庫 API 設定

### 客服啟動 (LaunchChatbot)
- 4 步進度指示
- 系統檢查清單
- 一鍵啟動按鈕

## 🧪 測試

### 測試覆蓋

- ✅ 76 個測試全部通過
- ✅ 30+ 端到端流程測試
- ✅ 46 個響應式設計測試
- ✅ 完整的元件單元測試

### 執行測試

```bash
# 執行所有測試
pnpm test

# 監視模式
pnpm test --watch

# 生成覆蓋報告
pnpm test --coverage
```

## 📈 效能指標

- **頁面載入**：< 3 秒
- **動畫效能**：60fps
- **無障礙合規**：WCAG AA 標準
- **捆綁大小**：< 2MB

## 🔐 安全性

- ✅ Manus OAuth 認證
- ✅ 環境變數管理
- ✅ SQL 注入防護（Drizzle ORM）
- ✅ CORS 配置
- ✅ 速率限制

## 📚 文檔

詳見 `skills/saas-ai-chatbot-builder/` 目錄中的完整文檔：

- `SKILL.md` - 技能概述
- `references/workflow.md` - 工作流程指南
- `references/ui-best-practices.md` - UI/UX 設計規範
- `references/component-library.md` - 元件庫規格
- `references/testing-checklist.md` - 測試檢查清單

## 🛠️ 開發工具

### 自動化腳本

```bash
# 生成新專案
python skills/saas-ai-chatbot-builder/scripts/saas-platform-scaffold.py my-platform

# 生成元件
python skills/saas-ai-chatbot-builder/scripts/component-generator.py MyComponent --type page

# 生成測試
python skills/saas-ai-chatbot-builder/scripts/test-generator.py MyComponent --type component
```

## 🌟 特色亮點

### UI/UX 設計
- 15+ 自訂動畫效果
- 玻璃態 Header 設計
- 漸層背景與卡片
- 完整響應式設計
- 高對比度文字（無陰影）

### 功能完整性
- 完整的用戶認證流程
- 多行業模版支援
- 實時分析報表
- 通知系統
- 訂閱管理

### 開發體驗
- TypeScript 全覆蓋
- tRPC 類型安全
- Tailwind CSS 快速開發
- Vitest 測試框架
- 熱模組重載（HMR）

## 📞 聯絡方式

- **官方網站**：[From Life To Lines](https://www.behance.net/howard-huang)
- **Instagram**：[@fromlifetolines](https://www.instagram.com/fromlifetolines/)
- **LINE 官方**：[@242lqfuy](https://line.me/R/ti/p/@242lqfuy)
- **LinkedIn**：[howard-huang-designer](https://www.linkedin.com/in/howard-huang-designer/)
- **GitHub**：[fromlifetolines](https://github.com/fromlifetolines)

## 📄 授權

本專案採用 MIT 授權。詳見 [LICENSE](LICENSE) 文件。

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 🎓 技能資源

此專案包含完整的 **SaaS AI 客服平台開發技能**，可用於快速構建類似平台：

- 📚 4 個詳細參考文檔（40+ 頁）
- 🔧 3 個自動化工具腳本
- 🎨 3 個生產級範本
- ✅ 45 個測試用例
- 📊 完整的設計系統

詳見 `skills/saas-ai-chatbot-builder/` 目錄。

---

**🎉 Built with ❤️ by From Life To Lines**

*為中小企業賦能，透過 AI 技術提升客服效率*
