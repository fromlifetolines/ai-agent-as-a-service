# AI 智能客服 / Agent 模版租賃 (AaaS) - 第一階段研究發現

## 1. 市場痛點分析

### 目標客群
- **牙醫診所**：需要 24/7 預約機制、患者諮詢回應
- **在地餐廳**：需要訂位管理、菜單查詢、營業時間回應
- **美髮沙龍**：需要預約系統、服務項目查詢、設計師檔期管理

### 核心痛點
1. **人力成本高**：無法負擔 24 小時客服人員
2. **預約管理複雜**：手動記錄易出錯、難以追蹤
3. **客戶體驗差**：營業時間外無法回應客戶
4. **數據孤立**：預約資訊散落在多個平台

---

## 2. 技術架構方案

### 2.1 核心技術棧

| 元件 | 技術選擇 | 功能 | 優勢 |
|------|---------|------|------|
| **訊息入口** | LINE 官方帳號 API | 接收客戶訊息 | 台灣用戶滲透率高、易於整合 |
| **AI 引擎** | OpenAI Agent Builder | 自然語言理解、對話邏輯 | 視覺化工作流、無需編碼、可部署 |
| **自動化平台** | Make.com | 連接各服務、工作流編排 | 3000+ 應用整合、無代碼 |
| **日曆系統** | Google Calendar API | 預約寫入、檔期管理 | 業界標準、易於同步 |
| **知識庫** | 結構化 JSON | 行業特定知識 | 易於定製、快速更新 |

### 2.2 Make.com 整合流程

**5 步驟設定流程**（根據官方文件）：
1. 在 Make 場景中添加 Google Calendar 模組
2. 建立連接（Create Connection）
3. 使用 Google 帳號登入並授權
4. 授予 Make 日曆讀寫權限
5. 配置自動化規則

**可用的 Google Calendar 操作**：
- Create an Event（建立事件）
- Update an Event（更新事件）
- Search Events（搜尋事件）
- Get Free/Busy Information（檢查檔期）
- Delete an Event（刪除事件）

### 2.3 OpenAI Agent Builder 工作流

**三大步驟**：
1. **設計工作流**：在 Agent Builder 視覺化畫布上拖拽節點
2. **發佈工作流**：生成帶版本控制的工作流 ID
3. **部署**：透過 ChatKit 嵌入或下載 SDK 自行部署

**工作流節點類型**：
- Agent 節點：處理對話邏輯
- Tool 節點：調用外部 API（Google Calendar、CRM 等）
- Router 節點：條件分支（預約 vs 查詢 vs 投訴）
- Output 節點：返回結構化結果

---

## 3. 業務模式架構

### 3.1 租賃方案設計

#### 方案 A：基礎版（月租 NT$2,990）
- 單一 LINE 官方帳號連接
- 基礎知識庫（常見問題 + 營業時間）
- 預約寫入 Google Calendar
- 每月 1,000 次對話額度

#### 方案 B：專業版（月租 NT$5,990）
- 多渠道支援（LINE + Facebook Messenger）
- 進階知識庫（產品/服務詳細資訊）
- 預約 + 客戶管理（CRM 整合）
- 每月 10,000 次對話額度
- 基礎分析報表

#### 方案 C：企業版（月租 NT$12,990）
- 全渠道支援（LINE + Facebook + WhatsApp + 官網聊天）
- 自訂知識庫 + AI 訓練
- 完整 CRM + 預約 + 行銷自動化
- 無限對話額度
- 進階分析 + 專屬客服

### 3.2 交付流程

```
客戶簽約
  ↓
提供模版配置表（行業 + 知識庫）
  ↓
在 Make.com 部署預設工作流
  ↓
連接客戶 LINE 官方帳號 + Google Calendar
  ↓
測試 & 上線
  ↓
每月監控 & 優化
```

---

## 4. 技術實現細節

### 4.1 LINE → Make → OpenAI → Google Calendar 流程

```
客戶在 LINE 傳訊
  ↓
Make Webhook 接收訊息
  ↓
OpenAI Agent 解析意圖
  ├─ 預約意圖 → 提取日期、時間、服務項目
  ├─ 查詢意圖 → 回傳知識庫資訊
  └─ 其他意圖 → 轉接人工客服
  ↓
若為預約：檢查 Google Calendar 檔期
  ↓
若檔期可用：寫入事件 + 回覆確認訊息
  ↓
若檔期滿：建議替代時間 + 回覆客戶
```

### 4.2 知識庫結構（JSON 格式）

```json
{
  "business_type": "dental_clinic",
  "business_name": "笑容牙醫診所",
  "operating_hours": {
    "monday_to_friday": "09:00-18:00",
    "saturday": "09:00-14:00",
    "sunday": "closed"
  },
  "services": [
    {
      "id": "cleaning",
      "name": "洗牙",
      "duration_minutes": 30,
      "price": 500
    },
    {
      "id": "filling",
      "name": "補牙",
      "duration_minutes": 45,
      "price": 1500
    }
  ],
  "faq": [
    {
      "question": "首次就診需要帶什麼?",
      "answer": "請帶健保卡與身分證..."
    }
  ],
  "staff": [
    {
      "name": "王醫生",
      "specialties": ["implant", "cosmetic"],
      "available_slots": ["09:00-12:00", "14:00-18:00"]
    }
  ]
}
```

---

## 5. 競爭分析

### 現有解決方案
| 產品 | 優勢 | 劣勢 | 定位 |
|------|------|------|------|
| **Jotform AI Agents** | 表單 + AI 整合 | 預約功能有限 | 表單自動化 |
| **Kaily AI** | 牙醫專用 | 價格高、客製化差 | 垂直解決方案 |
| **My AI Front Desk** | 語音 + 預約 | 成本高、需要電話線 | 高端市場 |
| **我們的方案** | **通用 + 低成本 + LINE 優先** | **需要持續優化** | **SME 友善** |

---

## 6. 技術可行性評估

### 可行性：✅ 高度可行

**已驗證的整合**：
- ✅ Make.com 官方支援 OpenAI + Google Calendar 整合
- ✅ LINE Messaging API 成熟穩定
- ✅ OpenAI Agent Builder 提供視覺化工作流
- ✅ 無需複雜編碼，可通過 Make 無代碼實現

**風險因素**：
- ⚠️ Make.com 免費額度限制（需評估成本）
- ⚠️ OpenAI API 成本隨對話量增加
- ⚠️ LINE 官方帳號需要客戶自行申請

---

## 7. 後續開發步驟

### Phase 2：系統架構圖設計
- 繪製完整的系統架構圖（Make 工作流、API 流向）
- 設計自動化工作流藍圖（預約、查詢、轉接流程）

### Phase 3：AI Agent 核心模版開發
- 建立通用知識庫結構
- 設計對話流程（預約、常見問題、客服轉接）
- 開發行業特定模版（牙醫、餐廳、沙龍）

### Phase 4：Make.com 整合文件
- 撰寫完整的設定指南
- 提供預設工作流模版
- 建立故障排除手冊

### Phase 5：商業模式文件
- 定價策略與成本分析
- SaaS 授權架構
- 客戶上線流程

---

## 8. 參考資源

- **Make.com 官方**：https://www.make.com/en/integrations/openai-gpt-3/google-calendar
- **OpenAI Agent Builder**：https://developers.openai.com/api/docs/guides/agent-builder
- **LINE Developers**：https://developers.line.biz/
- **Google Calendar API**：https://developers.google.com/calendar

---

**研究完成日期**：2026-04-15  
**下一步**：進行 Phase 2 系統架構設計
