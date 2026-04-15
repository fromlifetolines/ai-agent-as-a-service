import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface Template {
  id: string;
  name: string;
  industry: string;
  icon: string;
  color: string;
  initialMessage: string;
  conversations: {
    userMessage: string;
    botResponse: string;
    delay: number;
  }[];
}

const templates: Template[] = [
  {
    id: "dental",
    name: "笑容牙醫診所",
    industry: "牙醫診所",
    icon: "🦷",
    color: "from-blue-500 to-blue-600",
    initialMessage: "您好！歡迎來到笑容牙醫診所。請問今天有什麼我可以幫助您的嗎？",
    conversations: [
      {
        userMessage: "我想預約洗牙",
        botResponse: "好的！我們提供專業的牙齒清潔服務。請問您想要預約哪一天？我們的營業時間是週一至週五 09:00-18:00，週六 09:00-12:00。",
        delay: 1000,
      },
      {
        userMessage: "明天下午2點可以嗎？",
        botResponse: "讓我為您查詢明天下午 14:00 的檔期... 很遺憾，該時段已滿。我們有以下時段可供選擇：\n• 明天 15:00\n• 明天 16:30\n• 後天 14:00",
        delay: 1500,
      },
      {
        userMessage: "那我選明天 15:00",
        botResponse: "完美！我已為您預約：\n📅 時間：明天 15:00\n👨‍⚕️ 醫生：王醫生\n🏥 服務：牙齒清潔\n\n我們會在預約前 24 小時發送提醒簡訊。如有任何問題，請撥打 (02)XXXX-XXXX。感謝您的選擇！",
        delay: 1200,
      },
    ],
  },
  {
    id: "restaurant",
    name: "Bistro Uno 餐廳",
    industry: "餐飲業",
    icon: "🍽️",
    color: "from-orange-500 to-orange-600",
    initialMessage: "歡迎光臨 Bistro Uno！請問今天有什麼我可以幫助您的呢？",
    conversations: [
      {
        userMessage: "我想訂位",
        botResponse: "太好了！請告訴我您的需求：\n• 幾位用餐？\n• 希望什麼時間？\n• 有特殊需求嗎？（例如靠窗、生日慶祝）",
        delay: 1000,
      },
      {
        userMessage: "4 個人，今晚 7 點",
        botResponse: "讓我查詢今晚 19:00 的檔期... 我們有以下位置可供選擇：\n• 標準座位（靠內側）\n• 靠窗位置（加收 $200）\n• VIP 包廂（加收 $500）\n\n您偏好哪一種？",
        delay: 1500,
      },
      {
        userMessage: "靠窗位置",
        botResponse: "完美！我已為您預約：\n👥 人數：4 位\n🕖 時間：今晚 19:00\n🪟 位置：靠窗座位\n💳 預付：$200（可於現場支付）\n\n預約名字是？",
        delay: 1200,
      },
      {
        userMessage: "王先生",
        botResponse: "訂位完成！\n📋 訂位編號：#BU20260415001\n👤 名字：王先生\n\n我們會在您預約前 30 分鐘發送提醒。期待您的光臨！🍷",
        delay: 1000,
      },
    ],
  },
  {
    id: "salon",
    name: "Luxe Hair Studio",
    industry: "美髮沙龍",
    icon: "💇",
    color: "from-purple-500 to-purple-600",
    initialMessage: "Hi! 歡迎來到 Luxe Hair Studio。今天想要做什麼髮型呢？",
    conversations: [
      {
        userMessage: "我想預約剪髮",
        botResponse: "太棒了！我們有以下設計師可供選擇：\n• Sarah（專長：剪裁、燙染）- 評分 ⭐⭐⭐⭐⭐\n• Jessica（專長：護理、造型）- 評分 ⭐⭐⭐⭐⭐\n• Alex（專長：男性剪裁）- 評分 ⭐⭐⭐⭐\n\n您有偏好的設計師嗎？",
        delay: 1000,
      },
      {
        userMessage: "Sarah 可以嗎？",
        botResponse: "很好的選擇！Sarah 是我們最受歡迎的設計師。請問您想要什麼時間？\n\n📅 本週可用時段：\n• 週三 14:00-16:00\n• 週四 10:00-12:00\n• 週五 15:00-17:00\n• 週六 10:00-18:00",
        delay: 1200,
      },
      {
        userMessage: "週六 11:00",
        botResponse: "完美！我已為您預約：\n✂️ 服務：剪髮\n👩‍🦰 設計師：Sarah\n📅 時間：本週六 11:00\n⏱️ 預計時長：45 分鐘\n💰 價格：$800\n\n有其他需求嗎？（例如護理、燙染）",
        delay: 1200,
      },
      {
        userMessage: "再加個護理",
        botResponse: "很好！已更新您的預約：\n✂️ 剪髮 + 護理\n👩‍🦰 Sarah\n📅 本週六 11:00\n⏱️ 預計時長：60 分鐘\n💰 總價：$1,200\n\n預約名字是？",
        delay: 1000,
      },
      {
        userMessage: "李小姐",
        botResponse: "預約完成！\n📋 預約編號：#LHS20260415042\n👤 名字：李小姐\n\n我們會在預約前 24 小時提醒您。期待見到您！💅",
        delay: 1000,
      },
    ],
  },
];

export default function TemplatePreview() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("dental");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [conversationStep, setConversationStep] = useState<number>(0);

  const template = templates.find((t) => t.id === selectedTemplate)!;

  // 初始化訊息
  useEffect(() => {
    setMessages([
      {
        id: "initial",
        type: "bot",
        text: template.initialMessage,
        timestamp: new Date(),
      },
    ]);
    setConversationStep(0);
    setIsPlaying(false);
  }, [selectedTemplate, template.initialMessage]);

  // 自動播放對話
  const playConversation = async () => {
    setIsPlaying(true);
    setConversationStep(0);
    setMessages([
      {
        id: "initial",
        type: "bot",
        text: template.initialMessage,
        timestamp: new Date(),
      },
    ]);

    for (let i = 0; i < template.conversations.length; i++) {
      const conversation = template.conversations[i];

      // 添加用戶訊息
      await new Promise((resolve) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `user-${i}`,
              type: "user",
              text: conversation.userMessage,
              timestamp: new Date(),
            },
          ]);
          resolve(null);
        }, 800);
      });

      // 添加 Bot 訊息
      await new Promise((resolve) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${i}`,
              type: "bot",
              text: conversation.botResponse,
              timestamp: new Date(),
            },
          ]);
          setConversationStep(i + 1);
          resolve(null);
        }, conversation.delay);
      });
    }

    setIsPlaying(false);
  };

  const resetConversation = () => {
    setMessages([
      {
        id: "initial",
        type: "bot",
        text: template.initialMessage,
        timestamp: new Date(),
      },
    ]);
    setConversationStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 模板選擇器 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => {
              setSelectedTemplate(tmpl.id);
              resetConversation();
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTemplate === tmpl.id
                ? `border-${tmpl.color.split("-")[1]}-500 bg-${tmpl.color.split("-")[1]}-50`
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="text-3xl mb-2">{tmpl.icon}</div>
            <h3 className="font-semibold text-sm">{tmpl.name}</h3>
            <p className="text-xs text-gray-600">{tmpl.industry}</p>
          </button>
        ))}
      </div>

      {/* 聊天介面 */}
      <Card className="overflow-hidden shadow-lg">
        {/* 聊天頭部 */}
        <div
          className={`bg-gradient-to-r ${template.color} text-white p-4 flex items-center justify-between`}
        >
          <div>
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-xs text-white/80">AI 客服助手</p>
          </div>
          <div className="text-2xl">{template.icon}</div>
        </div>

        {/* 聊天訊息區域 */}
        <div className="h-96 overflow-y-auto bg-gray-50 p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg whitespace-pre-wrap text-sm ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* 加載指示器 */}
          {isPlaying && conversationStep < template.conversations.length && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 rounded-lg rounded-bl-none px-4 py-3 flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* 控制按鈕 */}
        <div className="bg-white border-t border-gray-200 p-4 flex gap-2">
          <Button
            onClick={playConversation}
            disabled={isPlaying}
            className="flex-1 bg-blue-500 hover:bg-blue-600"
          >
            {isPlaying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                播放中...
              </>
            ) : (
              "▶ 播放演示"
            )}
          </Button>
          <Button
            onClick={resetConversation}
            variant="outline"
            className="flex-1"
          >
            重置
          </Button>
        </div>
      </Card>

      {/* 功能說明 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h4 className="font-semibold text-sm mb-1">即時回應</h4>
          <p className="text-xs text-gray-600">AI 客服秒速回覆，無需等待</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">📅</div>
          <h4 className="font-semibold text-sm mb-1">自動預約</h4>
          <p className="text-xs text-gray-600">一鍵確認，自動寫入日曆</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h4 className="font-semibold text-sm mb-1">行業特定</h4>
          <p className="text-xs text-gray-600">牙醫、餐廳、沙龍完整模板</p>
        </div>
      </div>
    </div>
  );
}
