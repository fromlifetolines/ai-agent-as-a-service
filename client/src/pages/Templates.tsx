import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Stethoscope, UtensilsCrossed, Scissors, ArrowRight, Sparkles, Clock, Users, BarChart3 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  presetKnowledge: {
    services: string[];
    faqs: string[];
    businessHours: string;
  };
  color: string;
  gradient: string;
}

const templates: Template[] = [
  {
    id: "dental",
    name: "牙醫診所",
    industry: "醫療服務",
    description: "為牙醫診所量身打造，自動處理預約、提醒、看診流程",
    icon: <Stethoscope className="h-8 w-8" />,
    features: [
      "自動預約確認與提醒",
      "看診時間管理",
      "患者病歷查詢",
      "療程費用說明",
      "緊急聯絡轉接"
    ],
    presetKnowledge: {
      services: [
        "一般檢查與洗牙",
        "根管治療",
        "牙套與矯正",
        "植牙服務",
        "美白與貼片",
        "兒童牙科"
      ],
      faqs: [
        "Q: 首次看診需要準備什麼？\nA: 請帶健保卡和身分證，提前 10 分鐘到達。",
        "Q: 洗牙會很痛嗎？\nA: 現代洗牙技術無痛，如有敏感牙齒可告知醫生。",
        "Q: 根管治療要多久？\nA: 通常需要 2-3 次療程，每次 30-60 分鐘。",
        "Q: 植牙的成功率？\nA: 我們的植牙成功率達 98% 以上。"
      ],
      businessHours: "週一至週五 09:00-18:00，週六 09:00-12:00，週日休診"
    },
    color: "from-blue-500 to-blue-600",
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100/50"
  },
  {
    id: "restaurant",
    name: "餐飲業",
    industry: "餐飲服務",
    description: "為餐廳、咖啡廳設計，自動處理訂位、外帶、菜單查詢",
    icon: <UtensilsCrossed className="h-8 w-8" />,
    features: [
      "線上訂位系統",
      "菜單與價格查詢",
      "外帶訂單管理",
      "特殊飲食需求記錄",
      "會員積分查詢",
      "營業時間與地點"
    ],
    presetKnowledge: {
      services: [
        "內用餐飲",
        "外帶服務",
        "外送服務",
        "團體訂餐",
        "包場服務",
        "線上訂位"
      ],
      faqs: [
        "Q: 訂位需要多久前預訂？\nA: 建議提前 1-2 天預訂，特殊時段請提前一週。",
        "Q: 可以更改訂位時間嗎？\nA: 可以，請在用餐前 24 小時通知我們。",
        "Q: 有素食選項嗎？\nA: 有的，我們提供多種素食套餐。",
        "Q: 停車方便嗎？\nA: 有免費停車位，位置有限請提早到達。"
      ],
      businessHours: "週一至週四 11:00-22:00，週五至週六 11:00-23:00，週日 11:00-21:00"
    },
    color: "from-orange-500 to-orange-600",
    gradient: "bg-gradient-to-br from-orange-50 to-orange-100/50"
  },
  {
    id: "salon",
    name: "美髮沙龍",
    industry: "美容服務",
    description: "為美髮沙龍設計，自動處理預約、髮型諮詢、會員管理",
    icon: <Scissors className="h-8 w-8" />,
    features: [
      "線上預約與排班",
      "髮型師選擇",
      "髮型諮詢建議",
      "會員卡管理",
      "優惠活動推送",
      "產品推薦"
    ],
    presetKnowledge: {
      services: [
        "剪髮服務",
        "燙髮服務",
        "染髮服務",
        "護理療程",
        "造型設計",
        "男性理髮"
      ],
      faqs: [
        "Q: 第一次來需要多久？\nA: 初訪建議預留 90 分鐘進行諮詢與服務。",
        "Q: 燙髮後要怎麼護理？\nA: 建議使用護色洗髮精，一週做一次深層護理。",
        "Q: 可以指定髮型師嗎？\nA: 可以的，熱門髮型師請提前預約。",
        "Q: 有會員優惠嗎？\nA: 有的，會員享 9 折優惠，消費滿額送贈品。"
      ],
      businessHours: "週二至週日 10:00-19:00，週一休息"
    },
    color: "from-pink-500 to-pink-600",
    gradient: "bg-gradient-to-br from-pink-50 to-pink-100/50"
  }
];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsConfirming(true);
  };

  const handleConfirmTemplate = (templateId: string) => {
    // 保存模版選擇到 localStorage
    localStorage.setItem("selectedTemplate", templateId);
    localStorage.setItem("templateSelectedAt", new Date().toISOString());
    
    // 重定向到知識庫配置頁面
    window.location.href = "/dashboard?tab=knowledge";
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100/50 sticky top-0 z-40">
        <div className="container px-4 lg:px-0 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              選擇您的行業模版
            </h1>
          </div>
          <p className="text-gray-600">選擇最適合您業務的模版，我們會預設配置相關知識庫與功能</p>
        </div>
      </header>

      <main className="container px-4 lg:px-0 py-12">
        {!isConfirming ? (
          <>
            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {/* Background Gradient */}
                  <div className={`h-24 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${template.color} text-white`}>
                        {template.icon}
                      </div>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {template.industry}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Features */}
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2">✨ 預設功能</p>
                        <ul className="space-y-1">
                          {template.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {template.features.length > 3 && (
                            <li className="text-xs text-gray-500 italic">
                              + {template.features.length - 3} 項功能
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 group-hover:shadow-lg"
                      >
                        選擇此模版
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Info Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  選擇模版後會發生什麼？
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">預設知識庫</h3>
                      <p className="text-xs text-gray-600">
                        我們會為您的行業預設服務項目、常見問題、營業時間等內容
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">自訂配置</h3>
                      <p className="text-xs text-gray-600">
                        您可以編輯知識庫內容，新增特定的服務項目、FAQ、員工資訊
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">啟動客服</h3>
                      <p className="text-xs text-gray-600">
                        配置完成後，您的 AI 客服即可上線，開始自動處理客戶查詢
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${selectedTemplateData?.color} flex items-center justify-center text-white mx-auto mb-4`}>
                  {selectedTemplateData?.icon}
                </div>
                <CardTitle className="text-2xl">{selectedTemplateData?.name}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {selectedTemplateData?.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Features */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">✨ 預設功能與知識庫</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Services */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        服務項目
                      </h4>
                      <ul className="space-y-2">
                        {selectedTemplateData?.presetKnowledge.services.map((service, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Business Hours */}
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        營業時間
                      </h4>
                      <p className="text-sm text-gray-700">
                        {selectedTemplateData?.presetKnowledge.businessHours}
                      </p>
                      <p className="text-xs text-gray-600 mt-3">
                        ℹ️ 您可以在知識庫中修改營業時間
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Preview */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    常見問題範例
                  </h3>
                  <div className="space-y-3">
                    {selectedTemplateData?.presetKnowledge.faqs.slice(0, 2).map((faq, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm">
                        <p className="font-medium text-gray-900 mb-1">{faq.split("\n")[0]}</p>
                        <p className="text-gray-600">{faq.split("\n")[1]}</p>
                      </div>
                    ))}
                    <p className="text-xs text-gray-600 italic">
                      + {(selectedTemplateData?.presetKnowledge.faqs.length || 0) - 2} 個常見問題
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsConfirming(false);
                      setSelectedTemplate(null);
                    }}
                  >
                    返回選擇
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    onClick={() => handleConfirmTemplate(selectedTemplate!)}
                  >
                    確認選擇並繼續
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info Box */}
            <Card className="mt-6 border-0 shadow-md bg-gradient-to-r from-green-50 to-green-100/50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">💡 提示：</span> 選擇模版後，您可以隨時編輯和修改知識庫內容。所有預設內容都可以自訂，以符合您的具體業務需求。
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
