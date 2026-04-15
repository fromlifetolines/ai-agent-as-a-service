import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Calendar, 
  Zap, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  ExternalLink,
  Settings,
  Key
} from "lucide-react";

interface APIIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected" | "pending";
  color: string;
  setupSteps: string[];
  credentials?: {
    label: string;
    placeholder: string;
    type: "text" | "password";
  }[];
  docsUrl: string;
  testUrl?: string;
}

const integrations: APIIntegration[] = [
  {
    id: "line",
    name: "LINE 官方帳號",
    description: "自動接收客戶訊息，透過 AI 客服自動回覆",
    icon: <MessageCircle className="h-8 w-8" />,
    status: "disconnected",
    color: "from-green-500 to-green-600",
    setupSteps: [
      "1. 前往 LINE Developers 建立 Channel",
      "2. 取得 Channel ID 和 Channel Secret",
      "3. 設定 Webhook URL：https://api.fromlifetolines.com/webhook/line",
      "4. 在下方輸入認證資訊並連接"
    ],
    credentials: [
      { label: "Channel ID", placeholder: "輸入您的 Channel ID", type: "text" },
      { label: "Channel Secret", placeholder: "輸入您的 Channel Secret", type: "password" },
      { label: "Access Token", placeholder: "輸入您的 Access Token", type: "password" }
    ],
    docsUrl: "https://developers.line.biz/zh-hant/",
    testUrl: "/api/test/line"
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "自動同步預約到 Google 日曆，避免時間衝突",
    icon: <Calendar className="h-8 w-8" />,
    status: "disconnected",
    color: "from-blue-500 to-blue-600",
    setupSteps: [
      "1. 前往 Google Cloud Console 建立專案",
      "2. 啟用 Google Calendar API",
      "3. 建立 OAuth 2.0 認證資訊",
      "4. 授權本應用程式存取您的日曆"
    ],
    credentials: [
      { label: "Client ID", placeholder: "輸入 OAuth Client ID", type: "text" },
      { label: "Client Secret", placeholder: "輸入 OAuth Client Secret", type: "password" }
    ],
    docsUrl: "https://developers.google.com/calendar",
    testUrl: "/api/test/google-calendar"
  },
  {
    id: "ai-chatbot",
    name: "AI 客服引擎",
    description: "啟動智能對話系統，自動處理客戶查詢",
    icon: <Zap className="h-8 w-8" />,
    status: "pending",
    color: "from-purple-500 to-purple-600",
    setupSteps: [
      "1. 系統會自動使用您的知識庫進行訓練",
      "2. 選擇 AI 模型版本（標準版 / 進階版）",
      "3. 配置回應風格和語言偏好",
      "4. 點擊「啟動客服」開始服務"
    ],
    docsUrl: "https://docs.fromlifetolines.com/ai-chatbot",
    testUrl: "/api/test/chatbot"
  },
  {
    id: "knowledge-base",
    name: "知識庫管理",
    description: "動態更新 AI 客服的知識內容",
    icon: <Database className="h-8 w-8" />,
    status: "connected",
    color: "from-orange-500 to-orange-600",
    setupSteps: [
      "1. 知識庫已自動建立",
      "2. 您可以隨時新增或編輯內容",
      "3. 變更會即時同步到 AI 客服",
      "4. 支援文字、圖片、影片等多媒體內容"
    ],
    docsUrl: "https://docs.fromlifetolines.com/knowledge-base",
    testUrl: "/api/test/knowledge-base"
  }
];

export default function APIIntegration() {
  const [integrationStates, setIntegrationStates] = useState<Record<string, any>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleConnect = (integrationId: string) => {
    setIntegrationStates(prev => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        status: "pending"
      }
    }));

    // 模擬連接延遲
    setTimeout(() => {
      setIntegrationStates(prev => ({
        ...prev,
        [integrationId]: {
          ...prev[integrationId],
          status: "connected",
          connectedAt: new Date().toLocaleString()
        }
      }));
    }, 2000);
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrationStates(prev => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        status: "disconnected"
      }
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          已連接
        </Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">連接中...</Badge>;
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-800">未連接</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100/50 sticky top-0 z-40">
        <div className="container px-4 lg:px-0 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              API 整合設定
            </h1>
          </div>
          <p className="text-gray-600">連接第三方服務，讓您的 AI 客服功能更強大</p>
        </div>
      </header>

      <main className="container px-4 lg:px-0 py-12">
        {/* Info Banner */}
        <Card className="mb-8 border-0 shadow-md bg-gradient-to-r from-blue-50 to-blue-100/50 border-l-4 border-blue-500">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-blue-900 mb-1">💡 提示</p>
                <p className="text-sm text-blue-800">
                  您可以一次連接多個服務。所有連接都是安全加密的，您的認證資訊不會被儲存在本地。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => {
            const currentStatus = integrationStates[integration.id]?.status || integration.status;
            const isExpanded = expandedId === integration.id;

            return (
              <Card
                key={integration.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className={`h-20 bg-gradient-to-br ${integration.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${integration.color} text-white`}>
                      {integration.icon}
                    </div>
                    {getStatusBadge(currentStatus)}
                  </div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Setup Steps (Collapsed) */}
                  {!isExpanded && (
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold mb-2">設定步驟：</p>
                      <ol className="space-y-1 list-decimal list-inside">
                        {integration.setupSteps.slice(0, 2).map((step, idx) => (
                          <li key={idx} className="text-xs">{step}</li>
                        ))}
                        {integration.setupSteps.length > 2 && (
                          <li className="text-xs italic">+ {integration.setupSteps.length - 2} 個步驟</li>
                        )}
                      </ol>
                    </div>
                  )}

                  {/* Setup Steps (Expanded) */}
                  {isExpanded && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p className="font-semibold text-sm mb-3">📋 設定步驟：</p>
                        {integration.setupSteps.map((step, idx) => (
                          <div key={idx} className="text-sm text-gray-700 flex gap-3">
                            <span className="font-semibold text-purple-600 flex-shrink-0 w-6">{idx + 1}</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      {/* Credentials Input */}
                      {integration.credentials && currentStatus !== "connected" && (
                        <div className="space-y-3">
                          <p className="font-semibold text-sm">🔐 認證資訊</p>
                          {integration.credentials.map((cred, idx) => (
                            <div key={idx}>
                              <label className="text-xs font-semibold text-gray-700 block mb-1">
                                {cred.label}
                              </label>
                              <Input
                                type={cred.type}
                                placeholder={cred.placeholder}
                                className="text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Connected Info */}
                      {currentStatus === "connected" && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                          <p className="text-xs text-green-800">
                            <span className="font-semibold">✓ 已連接</span>
                            {integrationStates[integration.id]?.connectedAt && (
                              <span className="block text-xs mt-1">
                                連接時間：{integrationStates[integration.id].connectedAt}
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setExpandedId(isExpanded ? null : integration.id)}
                    >
                      {isExpanded ? "收起" : "展開"}
                    </Button>

                    {currentStatus !== "connected" ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                        onClick={() => handleConnect(integration.id)}
                        disabled={currentStatus === "pending"}
                      >
                        {currentStatus === "pending" ? "連接中..." : "連接"}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDisconnect(integration.id)}
                      >
                        斷開連接
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2"
                      onClick={() => window.open(integration.docsUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Launch Button */}
        <Card className="mt-12 border-0 shadow-xl bg-gradient-to-r from-orange-50 to-orange-100/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              準備好啟動 AI 客服了嗎？
            </CardTitle>
            <CardDescription>
              所有必要的整合已完成，您現在可以啟動 AI 客服開始自動處理客戶查詢
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Status Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {integrations.map((integration) => {
                  const status = integrationStates[integration.id]?.status || integration.status;
                  return (
                    <div key={integration.id} className="text-center">
                      <p className="text-xs font-semibold text-gray-700 mb-2">{integration.name}</p>
                      <div className={`h-2 rounded-full ${
                        status === "connected" ? "bg-green-500" :
                        status === "pending" ? "bg-yellow-500" :
                        "bg-gray-300"
                      }`}></div>
                    </div>
                  );
                })}
              </div>

              {/* Launch Button */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white mt-6"
              >
                🚀 啟動 AI 客服
              </Button>

              <p className="text-xs text-gray-600 text-center">
                點擊上方按鈕後，您的 AI 客服將立即上線，開始自動處理客戶訊息
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
