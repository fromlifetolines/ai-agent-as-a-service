# Make.com 整合與配置完整指南

**版本**：1.0  
**日期**：2026-04-15  
**作者**：Manus AI  
**狀態**：Phase 4 - 整合指南完成

---

## 目錄

1. [前置準備](#前置準備)
2. [Make.com 帳號設置](#makecom-帳號設置)
3. [LINE 官方帳號配置](#line-官方帳號配置)
4. [OpenAI 整合設置](#openai-整合設置)
5. [Google Calendar 授權](#google-calendar-授權)
6. [工作流程建立](#工作流程建立)
7. [測試與部署](#測試與部署)
8. [監控與維護](#監控與維護)
9. [故障排除](#故障排除)

---

## 前置準備

### 所需帳號

| 服務 | 用途 | 成本 | 註冊連結 |
|------|------|------|---------|
| **Make.com** | 工作流自動化 | 免費 + 付費方案 | https://www.make.com |
| **LINE 官方帳號** | 訊息入口 | 免費 + 付費方案 | https://business.line.biz |
| **OpenAI API** | AI 智能處理 | 按使用量計費 | https://platform.openai.com |
| **Google Cloud** | Calendar API | 免費 | https://console.cloud.google.com |

### 所需資訊

在開始前，請準備以下資訊：

```
[ ] LINE 官方帳號 ID
[ ] LINE Channel Token
[ ] LINE Channel Secret
[ ] OpenAI API Key
[ ] Google Cloud Project ID
[ ] Google Calendar ID
[ ] 知識庫 JSON 檔案
```

---

## Make.com 帳號設置

### 步驟 1：建立 Make.com 帳號

1. 訪問 [Make.com](https://www.make.com)
2. 點擊「Sign Up」
3. 選擇「Sign up with Email」
4. 填入電子郵件與密碼
5. 驗證電子郵件
6. 完成帳號設置

### 步驟 2：建立新的 Scenario（場景）

1. 登入 Make.com 帳號
2. 點擊「Create a new scenario」
3. 命名場景（例如：「AI 客服 - 牙醫診所」）
4. 點擊「Create」

### 步驟 3：了解 Make.com 介面

```
┌─────────────────────────────────────────────┐
│ Make.com 工作流編輯器                        │
├─────────────────────────────────────────────┤
│                                              │
│  [模組1] ──→ [模組2] ──→ [模組3]            │
│   (觸發)      (處理)      (輸出)             │
│                                              │
│  左側：模組庫                                 │
│  中央：工作流畫布                             │
│  右側：模組設定                               │
│                                              │
└─────────────────────────────────────────────┘
```

### 步驟 4：設定 Make.com 連接

1. 在左側模組庫搜尋「HTTP」
2. 選擇「HTTP - Make a request」
3. 點擊「Add」
4. 在右側設定面板配置

---

## LINE 官方帳號配置

### 步驟 1：建立 LINE 官方帳號

1. 訪問 [LINE Business](https://business.line.biz)
2. 點擊「Create Account」
3. 選擇「Official Account」
4. 填入帳號名稱（例如：「笑容牙醫診所」）
5. 選擇業務類型（例如：「Medical」）
6. 完成帳號建立

### 步驟 2：獲取 Channel 認證資訊

#### 2.1 取得 Channel ID 與 Channel Token

1. 登入 [LINE Developers Console](https://developers.line.biz/)
2. 選擇您的 Channel
3. 進入「Settings」→「Basic settings」
4. 複製以下資訊：
   - **Channel ID**：`1234567890`
   - **Channel Secret**：`abcdef1234567890abcdef1234567890`

#### 2.2 建立 Channel Access Token

1. 在「Messaging API」分頁
2. 點擊「Generate Channel Access Token」
3. 複製 **Channel Access Token**：`abcdefghijklmnopqrstuvwxyz...`

> **重要**：妥善保管這些認證資訊，不要在公開場合分享

### 步驟 3：設定 Webhook

#### 3.1 在 Make.com 中建立 Webhook

1. 在 Make.com 工作流中新增模組
2. 搜尋「LINE」
3. 選擇「LINE - Receive messages」
4. 點擊「Add」
5. 複製生成的 **Webhook URL**

#### 3.2 在 LINE Developers Console 中設定 Webhook

1. 登入 LINE Developers Console
2. 進入「Messaging API」分頁
3. 找到「Webhook settings」
4. 貼上 Make.com 的 Webhook URL
5. 點擊「Verify」確認
6. 啟用「Use webhook」

### 步驟 4：設定自動回覆訊息

1. 在 LINE Official Account Manager 中
2. 進入「Auto-reply」設定
3. 啟用「Auto-reply」
4. 設定預設回覆訊息：
   ```
   感謝您的訊息！
   我是 AI 客服助手，正在為您處理。
   請稍候...
   ```

### 步驟 5：設定快速回覆按鈕（Rich Menu）

1. 進入「Rich Menu」設定
2. 建立新的 Rich Menu
3. 設定按鈕（例如：預約、查詢、聯絡）
4. 設定按鈕動作（例如：傳送文字、開啟 URL）
5. 發佈 Rich Menu

---

## OpenAI 整合設置

### 步驟 1：建立 OpenAI API 帳號

1. 訪問 [OpenAI Platform](https://platform.openai.com)
2. 點擊「Sign up」
3. 使用 Google、Microsoft 或 Email 登入
4. 驗證電子郵件
5. 完成帳號設置

### 步驟 2：建立 API Key

1. 登入 OpenAI Platform
2. 進入「API keys」頁面
3. 點擊「Create new secret key」
4. 複製 API Key（例如：`sk-proj-...`）
5. 妥善保管此 API Key

### 步驟 3：設定 API 配額與限制

1. 進入「Billing」頁面
2. 設定 **Usage limits**：
   - 月度限制：NT$1,000（防止意外費用）
   - 硬限制：啟用
3. 設定 **Rate limits**：
   - 每分鐘請求數：100
   - 每日請求數：10,000

### 步驟 4：在 Make.com 中配置 OpenAI

1. 在 Make.com 工作流中新增模組
2. 搜尋「OpenAI」
3. 選擇「OpenAI - Create a completion」或「OpenAI - Create a chat completion」
4. 點擊「Add」
5. 在右側設定面板中：
   - 點擊「Connection」旁的「Add」
   - 選擇「API Key」
   - 貼上您的 OpenAI API Key
   - 點擊「Save」

### 步驟 5：配置 OpenAI 模組

#### 5.1 基本設定

```
模組名稱：OpenAI - 意圖識別
連接：[已連接]
模型：gpt-4 或 gpt-3.5-turbo
溫度：0.7
最大 Token：500
```

#### 5.2 系統 Prompt

```
你是一個客服助手，需要從訊息中提取以下資訊：
- 意圖 (booking/query/complaint)
- 服務項目
- 偏好日期
- 偏好時間

返回 JSON 格式結果
```

#### 5.3 用戶訊息

```
{message}
```

---

## Google Calendar 授權

### 步驟 1：建立 Google Cloud 專案

1. 訪問 [Google Cloud Console](https://console.cloud.google.com)
2. 點擊「Select a Project」
3. 點擊「NEW PROJECT」
4. 輸入專案名稱（例如：「AI 客服 Calendar」）
5. 點擊「CREATE」

### 步驟 2：啟用 Google Calendar API

1. 在 Google Cloud Console 中
2. 進入「APIs & Services」→「Library」
3. 搜尋「Google Calendar API」
4. 點擊「Google Calendar API」
5. 點擊「ENABLE」

### 步驟 3：建立服務帳號

1. 進入「APIs & Services」→「Credentials」
2. 點擊「CREATE CREDENTIALS」
3. 選擇「Service Account」
4. 填入帳號名稱（例如：「ai-chatbot-service」）
5. 點擊「CREATE AND CONTINUE」
6. 跳過可選步驟
7. 點擊「DONE」

### 步驟 4：建立金鑰

1. 在「Service Accounts」列表中找到新建的帳號
2. 點擊帳號名稱
3. 進入「Keys」分頁
4. 點擊「ADD KEY」→「Create new key」
5. 選擇「JSON」
6. 點擊「CREATE」
7. 自動下載 JSON 金鑰檔案

### 步驟 5：在 Make.com 中配置 Google Calendar

1. 在 Make.com 工作流中新增模組
2. 搜尋「Google Calendar」
3. 選擇「Google Calendar - Create an event」
4. 點擊「Add」
5. 在「Connection」中：
   - 點擊「Add」
   - 選擇「Service Account」
   - 上傳下載的 JSON 金鑰檔案
   - 點擊「Save」

### 步驟 6：共享 Google Calendar

1. 在 Google Calendar 中
2. 右鍵點擊您的日曆
3. 選擇「Settings and sharing」
4. 進入「Share with specific people」
5. 新增服務帳號電子郵件（格式：`xxx@xxx.iam.gserviceaccount.com`）
6. 設定權限為「Make changes to events」
7. 點擊「Share」

---

## 工作流程建立

### 工作流架構

```
┌─────────────────────────────────────────────────────────────┐
│ 1. LINE Webhook 觸發                                         │
│    (接收客戶訊息)                                             │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. 意圖路由器                                                 │
│    (決定下一步流程)                                           │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   ┌────────┐    ┌────────┐    ┌────────┐
   │預約流程 │    │查詢流程 │    │轉接流程 │
   └────┬───┘    └────┬───┘    └────┬───┘
        ↓             ↓             ↓
   ┌────────────────────────────────────┐
   │ 3. 發送回覆至 LINE                  │
   │    (確認或選項)                     │
   └────────────────────────────────────┘
```

### 步驟 1：建立觸發模組

#### 1.1 LINE Webhook 觸發

```
模組：LINE - Receive messages
設定：
- 連接：[已連接]
- 事件類型：Message
- 訊息類型：Text
```

### 步驟 2：建立意圖路由器

#### 2.1 新增 Router 模組

1. 在工作流中新增模組
2. 搜尋「Router」
3. 選擇「Flow Control - Router」
4. 點擊「Add」

#### 2.2 設定路由規則

```
規則 1：預約意圖
條件：message 包含 ["預約", "掛號", "訂位"]
→ 連接到「預約流程」模組

規則 2：查詢意圖
條件：message 包含 ["營業", "時間", "價格"]
→ 連接到「查詢流程」模組

規則 3：投訴意圖
條件：message 包含 ["投訴", "問題", "不滿"]
→ 連接到「轉接流程」模組

預設：其他
→ 連接到「通用回應」模組
```

### 步驟 3：建立預約流程

#### 3.1 呼叫 OpenAI 進行意圖分析

```
模組：OpenAI - Create a chat completion
設定：
- 模型：gpt-4
- 系統 Prompt：[見前面的 Prompt]
- 用戶訊息：{message}
```

#### 3.2 檢查 Google Calendar 檔期

```
模組：Google Calendar - List events
設定：
- Calendar：[選擇您的日曆]
- 時間範圍：
  - 開始時間：{preferred_date} 09:00
  - 結束時間：{preferred_date} 18:00
```

#### 3.3 組織確認訊息

```
模組：Text Aggregator
設定：
- 輸入 1：可用時段列表
- 輸入 2：服務詳情
- 輸出：格式化的確認訊息
```

#### 3.4 發送回覆至 LINE

```
模組：LINE - Send a message
設定：
- 連接：[已連接]
- 用戶 ID：{user_id}
- 訊息類型：Text
- 訊息內容：{formatted_message}
```

### 步驟 4：建立查詢流程

#### 4.1 查詢知識庫

```
模組：Data Store - Search
設定：
- 資料存儲：[您的知識庫]
- 查詢：{message}
```

#### 4.2 發送查詢結果

```
模組：LINE - Send a message
設定：
- 用戶 ID：{user_id}
- 訊息內容：{search_result}
```

### 步驟 5：建立轉接流程

#### 5.1 標記為待人工回覆

```
模組：Data Store - Create a record
設定：
- 資料存儲：待處理訊息
- 欄位：
  - user_id：{user_id}
  - message：{message}
  - timestamp：{now}
  - status：pending
```

#### 5.2 發送轉接訊息

```
模組：LINE - Send a message
設定：
- 用戶 ID：{user_id}
- 訊息內容：「感謝您的反饋，我將轉接給專人處理。請稍候...」
```

---

## 測試與部署

### 步驟 1：單元測試

#### 1.1 測試 LINE 連接

1. 在 Make.com 中點擊「Test」
2. 在 LINE 官方帳號傳送測試訊息
3. 確認 Make.com 收到訊息

#### 1.2 測試 OpenAI 模組

1. 在 OpenAI 模組點擊「Test」
2. 輸入測試訊息
3. 確認 OpenAI 返回正確的意圖

#### 1.3 測試 Google Calendar 模組

1. 在 Google Calendar 模組點擊「Test」
2. 確認能夠查詢日曆事件
3. 確認能夠建立新事件

### 步驟 2：整合測試

#### 2.1 測試完整預約流程

1. 在 LINE 傳送：「我想預約明天洗牙」
2. 確認 Make.com 正確識別意圖
3. 確認 Google Calendar 返回可用時段
4. 確認 LINE 收到確認訊息

#### 2.2 測試查詢流程

1. 在 LINE 傳送：「你們的營業時間是？」
2. 確認 Make.com 正確識別查詢意圖
3. 確認 LINE 收到營業時間資訊

#### 2.3 測試轉接流程

1. 在 LINE 傳送：「我想投訴」
2. 確認 Make.com 正確識別投訴意圖
3. 確認訊息被標記為待人工回覆
4. 確認 LINE 收到轉接訊息

### 步驟 3：部署上線

#### 3.1 啟用工作流

1. 在 Make.com 中點擊「Turn on」
2. 確認工作流狀態變為「Running」

#### 3.2 監控初期運行

1. 觀察 Make.com 的執行日誌
2. 檢查是否有錯誤
3. 監控 API 使用量

#### 3.3 收集反饋

1. 邀請測試用戶試用
2. 收集使用反饋
3. 根據反饋進行優化

---

## 監控與維護

### 步驟 1：設定監控告警

#### 1.1 在 Make.com 中設定告警

1. 進入「Notifications」設定
2. 設定以下告警：
   - 工作流執行失敗
   - API 錯誤
   - 配額即將用盡

#### 1.2 設定每日報告

1. 進入「Reports」
2. 建立每日報告，包含：
   - 對話總數
   - 預約成功率
   - 轉接率
   - API 使用量

### 步驟 2：定期維護

#### 2.1 每週檢查

- [ ] 檢查工作流執行日誌
- [ ] 驗證 API 配額使用情況
- [ ] 檢查是否有錯誤訊息

#### 2.2 每月檢查

- [ ] 分析對話數據
- [ ] 優化知識庫內容
- [ ] 更新常見問題
- [ ] 檢查成本

#### 2.3 每季檢查

- [ ] 評估系統效能
- [ ] 收集用戶反饋
- [ ] 規劃功能改進
- [ ] 更新模型版本

### 步驟 3：性能優化

#### 3.1 降低延遲

- 使用更快的 OpenAI 模型（gpt-3.5-turbo）
- 減少不必要的 API 呼叫
- 使用快取機制

#### 3.2 降低成本

- 優化 Prompt 長度
- 使用更便宜的模型
- 批量處理請求

---

## 故障排除

### 常見問題與解決方案

#### 問題 1：LINE 訊息無法接收

**症狀**：Make.com 未收到 LINE 訊息

**原因**：
- Webhook URL 未正確配置
- Webhook 驗證失敗
- LINE Channel Token 過期

**解決方案**：
1. 檢查 Make.com Webhook URL 是否正確
2. 在 LINE Developers Console 中重新驗證 Webhook
3. 重新生成 Channel Access Token

#### 問題 2：OpenAI 返回錯誤

**症狀**：OpenAI 模組執行失敗

**原因**：
- API Key 無效
- 配額已用盡
- 模型不可用

**解決方案**：
1. 驗證 API Key 是否正確
2. 檢查 OpenAI 帳號的配額與使用量
3. 嘗試使用不同的模型

#### 問題 3：Google Calendar 無法建立事件

**症狀**：Google Calendar 模組執行失敗

**原因**：
- 服務帳號權限不足
- 日曆未共享
- 事件資訊不完整

**解決方案**：
1. 確認服務帳號擁有「Make changes to events」權限
2. 檢查日曆是否已共享給服務帳號
3. 驗證事件資訊（日期、時間、標題）是否完整

#### 問題 4：工作流執行緩慢

**症狀**：回覆時間超過 5 秒

**原因**：
- API 響應緩慢
- 工作流邏輯複雜
- 網路延遲

**解決方案**：
1. 優化工作流邏輯，減少不必要的步驟
2. 使用更快的 OpenAI 模型
3. 啟用快取機制

#### 問題 5：預約重複

**症狀**：同一時段出現多個預約

**原因**：
- 缺少重複檢查
- 並發請求未處理
- 檔期更新延遲

**解決方案**：
1. 在建立事件前檢查是否已存在
2. 使用鎖定機制防止並發
3. 增加檔期更新頻率

### 調試技巧

#### 技巧 1：查看執行日誌

1. 在 Make.com 中點擊「Execution history」
2. 選擇失敗的執行
3. 查看每個模組的輸入與輸出
4. 識別失敗的模組

#### 技巧 2：使用測試模式

1. 在工作流中點擊「Test」
2. 手動輸入測試資料
3. 逐步執行工作流
4. 觀察每個模組的結果

#### 技巧 3：啟用詳細日誌

1. 在 Make.com 設定中啟用「Debug mode」
2. 執行工作流
3. 查看詳細的執行日誌
4. 識別問題所在

---

## 最佳實踐

### 工作流設計

- ✅ 使用清晰的模組名稱
- ✅ 添加註解說明每個步驟
- ✅ 使用 Router 進行邏輯分支
- ✅ 實現錯誤處理機制
- ✅ 定期備份工作流配置

### 安全性

- ✅ 妥善保管 API Key 與 Token
- ✅ 使用環境變數存儲敏感資訊
- ✅ 定期輪換 API Key
- ✅ 監控異常活動
- ✅ 限制 API 配額

### 性能

- ✅ 優化 Prompt 長度
- ✅ 使用快取機制
- ✅ 批量處理請求
- ✅ 監控 API 延遲
- ✅ 定期清理舊資料

---

## 快速參考

### 常用 API 端點

| 服務 | 端點 | 用途 |
|------|------|------|
| LINE | `https://api.line.me/v2/bot/message/push` | 推送訊息 |
| OpenAI | `https://api.openai.com/v1/chat/completions` | 聊天完成 |
| Google Calendar | `https://www.googleapis.com/calendar/v3/calendars` | 日曆操作 |

### 常用 Prompt 範本

**系統 Prompt**
```
你是一個客服助手，需要從訊息中提取意圖與實體。
返回 JSON 格式結果。
```

**意圖提取 Prompt**
```
分析訊息並提取：intent, service, date, time, confidence
```

**確認 Prompt**
```
生成友善的預約確認訊息，包含所有重要資訊。
```

---

## 下一步

**Phase 5：商業模式規劃**
- 月租方案設計
- 定價策略
- SaaS 授權架構
- 客戶支援流程

---

## 參考資源

- [Make.com 官方文件](https://www.make.com/en/help)
- [LINE Messaging API](https://developers.line.biz/en/api/messaging-api/)
- [OpenAI API 文件](https://platform.openai.com/docs)
- [Google Calendar API](https://developers.google.com/calendar)

---

**文件結束**
