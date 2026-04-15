# AI Agent 核心模版開發文件

**版本**：1.0  
**日期**：2026-04-15  
**作者**：Manus AI  
**狀態**：Phase 3 - 核心模版完成

---

## 目錄

1. [模版概述](#模版概述)
2. [通用知識庫模版](#通用知識庫模版)
3. [行業特定模版](#行業特定模版)
4. [對話流程設計](#對話流程設計)
5. [AI Prompt 工程](#ai-prompt-工程)
6. [模版使用指南](#模版使用指南)
7. [客製化流程](#客製化流程)

---

## 模版概述

本文件提供三個完整的 AI Agent 知識庫模版，涵蓋牙醫診所、餐廳與美髮沙龍等常見中小企業場景。每個模版都包含：

- **業務資訊**：營業時間、聯絡方式、地址
- **服務清單**：服務項目、時長、價格、員工要求
- **員工資訊**：設計師/醫師/經理的檔期與專長
- **常見問題**：預先設定的 FAQ 與回答
- **業務規則**：預約政策、取消政策、定價規則
- **對話流程**：不同意圖的自動回應
- **AI Prompt**：用於 OpenAI 的系統提示與指令

---

## 通用知識庫模版

### 檔案位置
```
templates/knowledge_base_template.json
```

### 核心結構

```json
{
  "_metadata": {
    "version": "1.0",
    "template_type": "knowledge_base",
    "description": "通用 AI 客服知識庫模版"
  },
  "business_info": { ... },
  "services": [ ... ],
  "staff": [ ... ],
  "faq": [ ... ],
  "business_rules": { ... },
  "conversation_flows": { ... },
  "ai_prompts": { ... },
  "templates": { ... },
  "analytics": { ... }
}
```

### 使用步驟

#### 步驟 1：複製模版
```bash
cp templates/knowledge_base_template.json my_business_kb.json
```

#### 步驟 2：填入業務資訊
```json
{
  "business_info": {
    "name": "[您的業務名稱]",
    "type": "[dental_clinic|restaurant|salon|other]",
    "phone": "[電話號碼]",
    "address": "[完整地址]",
    "operating_hours": {
      "monday": { "open": "09:00", "close": "18:00" },
      ...
    }
  }
}
```

#### 步驟 3：新增服務項目
```json
{
  "services": [
    {
      "id": "service_001",
      "name": "[服務名稱]",
      "duration_minutes": 30,
      "price": 500,
      "description": "[詳細說明]",
      "required_staff_roles": ["role_1"]
    }
  ]
}
```

#### 步驟 4：配置員工資訊
```json
{
  "staff": [
    {
      "id": "staff_001",
      "name": "[員工名稱]",
      "title": "[職位]",
      "specialties": ["specialty_1"],
      "available_hours": { ... }
    }
  ]
}
```

#### 步驟 5：新增常見問題
```json
{
  "faq": [
    {
      "id": "faq_001",
      "question": "[常見問題]",
      "answer": "[詳細回答]",
      "category": "[booking|payment|service]"
    }
  ]
}
```

---

## 行業特定模版

### 1. 牙醫診所模版

**檔案位置**：`templates/dental_clinic_example.json`

**特色**：
- 預防、治療、美容牙科服務
- 醫療歷史追蹤
- 治療進度管理
- 複雜的療程時間規劃

**關鍵服務**：
- 洗牙（30 分鐘，NT$500）
- 補牙（45 分鐘，NT$1,500）
- 根管治療（90 分鐘，NT$5,000）
- 植牙（120 分鐘，NT$25,000）

**特殊規則**：
- 首次就診需要醫療歷史
- 複雜治療需要提前 24-48 小時預約
- 取消政策：24 小時內取消收取 50% 服務費

**AI 對話特色**：
- 醫療相關術語解釋
- 治療流程說明
- 患者教育內容

### 2. 餐廳模版

**檔案位置**：`templates/restaurant_example.json`

**特色**：
- 午餐/晚餐時段管理
- 菜單查詢與推薦
- 外帶/內用選項
- 包廂與外燴服務

**關鍵服務**：
- 內用（90 分鐘，最低消費 NT$300）
- 外帶（15 分鐘，享 10% 折扣）
- 包廂預約（120 分鐘，最低消費 NT$5,000）
- 外燴服務（180 分鐘，NT$15,000）

**特殊規則**：
- 營業時間：週一至週五 11:30-14:00，週六 17:00-23:00
- 最低消費限制
- 無故缺席收取全額訂金

**AI 對話特色**：
- 菜單推薦
- 飲食限制處理（素食、過敏）
- 團體預約協商

### 3. 美髮沙龍模版

**檔案位置**：`templates/salon_example.json`

**特色**：
- 設計師檔期管理
- 髮型諮詢流程
- 顏色試色服務
- 頭髮護理建議

**關鍵服務**：
- 剪髮（45 分鐘，NT$600）
- 染髮（120 分鐘，NT$2,000）
- 燙髮（150 分鐘，NT$2,500）
- 護理療程（60 分鐘，NT$1,500）
- 新娘造型（120 分鐘，NT$5,000）

**特殊規則**：
- 首次客人享 8 折優惠
- 可指定特定設計師
- 燙染同時進行需要特別護理

**AI 對話特色**：
- 設計師推薦
- 髮型建議
- 護理方案建議

---

## 對話流程設計

### 預約流程

```
客戶訊息
  ↓
意圖識別
  ├─ 預約意圖 → 預約流程
  ├─ 查詢意圖 → 查詢流程
  ├─ 投訴意圖 → 轉接流程
  └─ 其他意圖 → 通用回應
  ↓
預約流程
  ├─ 詢問服務類型
  ├─ 詢問日期與時間
  ├─ 檢查可用性
  ├─ 確認預約詳情
  └─ 發送確認訊息
```

### 查詢流程

```
客戶訊息（查詢營業時間/價格/服務）
  ↓
識別查詢類型
  ├─ 營業時間查詢 → 返回營業時間
  ├─ 價格查詢 → 返回服務價格
  ├─ 服務查詢 → 返回服務說明
  └─ FAQ 查詢 → 返回 FAQ 回答
  ↓
發送回應
```

### 轉接流程

```
客戶訊息（投訴/複雜問題）
  ↓
識別轉接需求
  ↓
發送轉接訊息
  ↓
標記為「待人工回覆」
  ↓
通知店家客服人員
```

---

## AI Prompt 工程

### 系統 Prompt 範例

```
你是 [業務名稱] 的 AI 客服助手。你的職責是：
1. 理解客戶的需求
2. 提供準確的業務資訊
3. 協助客戶預約
4. 在必要時轉接人工客服

重要指示：
- 始終保持禮貌與專業
- 如果不確定，請誠實說明並轉接人工
- 遵守業務規則與客戶隱私政策
- 使用繁體中文與友善的語氣
```

### 意圖提取 Prompt 範例

```
分析以下客戶訊息，並提取以下資訊（以 JSON 格式返回）：
- intent: 意圖類型 (booking|query|complaint|greeting|other)
- service: 服務類型（如果有）
- preferred_date: 偏好日期（如果有）
- preferred_time: 偏好時間（如果有）
- customer_name: 客戶名稱（如果有）
- customer_phone: 客戶電話（如果有）
- confidence: 信心度 (0-1)

客戶訊息：{message}

返回格式：
{
  "intent": "...",
  "service": "...",
  ...
}
```

### 檔期檢查 Prompt 範例

```
根據以下資訊，檢查可用的預約時段：
- 服務: {service_name}
- 服務時長: {duration} 分鐘
- 偏好日期: {preferred_date}
- 偏好時間: {preferred_time}
- 營業時間: {operating_hours}
- 已預約時段: {booked_slots}

請返回 3-5 個可用時段的建議。
```

---

## 模版使用指南

### 快速開始（5 分鐘）

#### 1. 選擇適合的模版
```bash
# 牙醫診所
cp templates/dental_clinic_example.json my_clinic.json

# 餐廳
cp templates/restaurant_example.json my_restaurant.json

# 美髮沙龍
cp templates/salon_example.json my_salon.json
```

#### 2. 編輯業務資訊
使用文本編輯器或 JSON 編輯工具，更新以下欄位：
- `business_info.name`
- `business_info.phone`
- `business_info.address`
- `business_info.operating_hours`

#### 3. 新增服務與員工
根據您的實際情況，新增或修改：
- `services` 陣列
- `staff` 陣列

#### 4. 自訂 FAQ
更新或新增常見問題：
- `faq` 陣列

#### 5. 上傳至 Make.com
將 JSON 檔案上傳至 Make.com 的資料存儲

### 進階客製化

#### 新增自訂服務
```json
{
  "id": "custom_service",
  "name": "自訂服務名稱",
  "category": "custom_category",
  "duration_minutes": 60,
  "price": 2000,
  "description": "詳細說明",
  "required_staff_roles": ["role_1", "role_2"],
  "tags": ["custom"]
}
```

#### 新增自訂對話流程
```json
{
  "conversation_flows": {
    "custom_flow": {
      "trigger_keywords": ["關鍵字1", "關鍵字2"],
      "response": "自訂回應"
    }
  }
}
```

#### 新增自訂 Prompt
```json
{
  "ai_prompts": {
    "custom_prompt": "自訂 AI 指令"
  }
}
```

---

## 客製化流程

### 步驟 1：分析業務需求

| 項目 | 說明 | 範例 |
|------|------|------|
| 主要服務 | 核心業務項目 | 洗牙、補牙、植牙 |
| 服務時長 | 每項服務的預計時間 | 30-120 分鐘 |
| 定價 | 各項服務的價格 | NT$500-25,000 |
| 員工 | 提供服務的人員 | 醫師、衛生員 |
| 營業時間 | 每日營業時段 | 09:00-18:00 |
| 特殊規則 | 業務特定的規則 | 首次就診需要病歷 |

### 步驟 2：選擇基礎模版

根據業務類型選擇最接近的模版：
- 牙醫、診所 → `dental_clinic_example.json`
- 餐廳、咖啡廳 → `restaurant_example.json`
- 美髮、美容 → `salon_example.json`
- 其他 → `knowledge_base_template.json`

### 步驟 3：修改核心資訊

編輯以下欄位：
```json
{
  "business_info": {
    "name": "您的業務名稱",
    "type": "業務類型",
    "phone": "您的電話",
    "address": "您的地址",
    "operating_hours": { ... }
  }
}
```

### 步驟 4：新增服務與員工

```json
{
  "services": [
    {
      "id": "service_001",
      "name": "服務名稱",
      "duration_minutes": 30,
      "price": 500,
      ...
    }
  ],
  "staff": [
    {
      "id": "staff_001",
      "name": "員工名稱",
      "available_hours": { ... }
    }
  ]
}
```

### 步驟 5：自訂 FAQ 與對話流程

根據您的業務特色，新增或修改：
- 常見問題與回答
- 自動回應訊息
- 對話流程

### 步驟 6：測試與驗證

1. 檢查 JSON 格式是否正確
2. 驗證所有必填欄位已完成
3. 測試對話流程
4. 確認預約邏輯正確

### 步驟 7：部署至 Make.com

1. 登入 Make.com 帳號
2. 建立新的自動化場景
3. 上傳知識庫 JSON
4. 配置 LINE、OpenAI、Google Calendar 模組
5. 測試整個流程

---

## 範例：牙醫診所客製化

### 原始模版
```json
{
  "business_info": {
    "name": "笑容牙醫診所",
    ...
  }
}
```

### 客製化後
```json
{
  "business_info": {
    "name": "王牙醫診所",
    "phone": "02-9876-5432",
    "address": "台北市中山區中山路 50 號",
    "operating_hours": {
      "monday": { "open": "10:00", "close": "19:00" },
      ...
    }
  },
  "services": [
    {
      "id": "cleaning",
      "name": "洗牙",
      "price": 600,
      ...
    },
    {
      "id": "whitening",
      "name": "美白",
      "price": 3500,
      ...
    }
  ],
  "staff": [
    {
      "id": "dr_wang",
      "name": "王醫生",
      "available_hours": {
        "monday": ["10:00-13:00", "15:00-19:00"],
        ...
      }
    }
  ]
}
```

---

## 驗證清單

部署前，請確認以下項目：

- [ ] 業務名稱已更新
- [ ] 電話號碼正確
- [ ] 地址完整
- [ ] 營業時間準確
- [ ] 所有服務已列出
- [ ] 服務時長合理
- [ ] 服務價格正確
- [ ] 員工資訊完整
- [ ] 員工檔期合理
- [ ] FAQ 涵蓋常見問題
- [ ] 業務規則已設定
- [ ] 對話流程測試通過
- [ ] JSON 格式正確
- [ ] 所有必填欄位已完成

---

## 常見問題

### Q1：如何新增多個員工？
在 `staff` 陣列中新增多個物件：
```json
{
  "staff": [
    { "id": "staff_001", "name": "員工 1", ... },
    { "id": "staff_002", "name": "員工 2", ... }
  ]
}
```

### Q2：如何設定不同的營業時間？
在 `operating_hours` 中為每一天設定不同的時間：
```json
{
  "operating_hours": {
    "monday": { "open": "09:00", "close": "18:00" },
    "saturday": { "open": "09:00", "close": "14:00" },
    "sunday": { "closed": true }
  }
}
```

### Q3：如何新增季節性優惠？
在 `business_rules.pricing.seasonal_promotions` 中新增：
```json
{
  "seasonal_promotions": [
    {
      "name": "春季優惠",
      "discount_percent": 20,
      "start_date": "2026-03-01",
      "end_date": "2026-05-31"
    }
  ]
}
```

### Q4：如何處理複雜的預約邏輯？
使用 `business_rules` 中的各種規則設定：
```json
{
  "business_rules": {
    "booking": {
      "min_advance_notice_hours": 24,
      "max_advance_booking_days": 60,
      "cancellation_policy": "..."
    }
  }
}
```

---

## 下一步

**Phase 4：Make.com 整合文件**
- 撰寫完整的 Make.com 設定指南
- 提供預設工作流模版
- 建立故障排除手冊

---

## 附錄：檔案清單

| 檔案 | 說明 |
|------|------|
| `templates/knowledge_base_template.json` | 通用知識庫模版 |
| `templates/dental_clinic_example.json` | 牙醫診所範例 |
| `templates/restaurant_example.json` | 餐廳範例 |
| `templates/salon_example.json` | 美髮沙龍範例 |

---

**文件結束**
