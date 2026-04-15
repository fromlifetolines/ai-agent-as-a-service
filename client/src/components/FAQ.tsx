import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "系統支援哪些訊息渠道？",
    answer:
      "目前支援 LINE 官方帳號、Facebook Messenger 與 WhatsApp Business。我們持續開發新渠道整合，包括 Instagram Direct Message 與 Telegram。您可根據客戶使用習慣選擇合適的渠道。",
  },
  {
    id: 2,
    question: "可以自訂 AI 客服的對話流程嗎？",
    answer:
      "完全可以。我們提供視覺化工作流編輯器（無需程式碼），您可自訂問候語、回應邏輯、預約確認流程等。專業版與企業版用戶可使用進階工作流功能，包括條件分支與自動化規則。",
  },
  {
    id: 3,
    question: "如何與 Google Calendar 連接？",
    answer:
      "整合過程只需 3 步：1) 在設定頁面授權 Google 帳號；2) 選擇要同步的日曆；3) 設定預約時間間隔。系統會自動檢查檔期、防止雙重預約，並發送確認與提醒訊息。",
  },
  {
    id: 4,
    question: "支援多少個員工或設計師的排班管理？",
    answer:
      "基礎版支援最多 3 位員工，專業版 10 位，企業版無限制。系統支援複雜的排班規則，包括固定班表、輪班、休假日設定，以及員工專長標籤（如牙醫的「矯正專家」或沙龍的「燙染師」）。",
  },
  {
    id: 5,
    question: "AI 客服的準確率如何？常見錯誤是什麼？",
    answer:
      "我們使用 OpenAI 最新的語言模型，準確率達 95%+ 用於常見問題回答。對於複雜或超出知識庫的問題，系統會自動轉接人工客服。建議定期更新知識庫內容，以保持最佳效果。",
  },
  {
    id: 6,
    question: "數據安全與隱私如何保障？",
    answer:
      "我們採用企業級加密（SSL/TLS）、定期安全審計與 GDPR 合規。所有客戶數據存儲在台灣資料中心，不與第三方共享。您可隨時導出或刪除數據。詳見隱私政策。",
  },
  {
    id: 7,
    question: "如何查看 AI 客服的效果數據？",
    answer:
      "每個方案都包含實時分析儀表板，展示對話量、預約轉化率、客戶滿意度、常見問題統計等。專業版與企業版提供進階分析，包括流量來源、客戶分段、ROI 計算。",
  },
  {
    id: 8,
    question: "可以試用多久？試用後如何升級？",
    answer:
      "免費試用 30 天，完整功能無限制。試用期間無需綁定信用卡。升級時只需選擇方案並確認，按月計費，隨時可升級、降級或取消。",
  },
  {
    id: 9,
    question: "如果對系統不滿意，可以退款嗎？",
    answer:
      "我們提供 14 天無條件退款保證。如在試用期或付款後 14 天內對服務不滿意，聯絡我們即可全額退款。我們的目標是確保您獲得最大價值。",
  },
  {
    id: 10,
    question: "企業版有專屬帳戶經理嗎？",
    answer:
      "是的。企業版用戶享有專屬帳戶經理、優先技術支援（24/7 電話）、自訂功能開發、定期業績檢討會議。我們會根據您的業務需求提供最佳化建議。",
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">常見問題</h2>
            <p className="text-gray-600 text-lg">
              解答您對 AI 客服系統的所有疑問
            </p>
          </div>

          {/* FAQ 列表 */}
          <div className="space-y-3">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:border-blue-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-left font-semibold text-gray-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 ml-4 transition-transform ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 展開內容 */}
                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 底部 CTA */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <p className="text-gray-700 mb-4">
              還有其他問題？我們很樂意幫助您
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:support@fromlifetolines.com"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                📧 發送郵件
              </a>
              <a
                href="https://line.me/R/ti/p/@242lqfuy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                💬 LINE 客服
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
