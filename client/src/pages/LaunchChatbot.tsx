import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  BarChart3,
  Users,
  MessageSquare,
  Clock,
  Loader2
} from "lucide-react";

interface LaunchStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  icon: React.ReactNode;
}

const launchSteps: LaunchStep[] = [
  {
    id: 1,
    title: "選擇行業模版",
    description: "已選擇：牙醫診所模版",
    status: "completed",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />
  },
  {
    id: 2,
    title: "配置知識庫",
    description: "已新增 4 個知識項目",
    status: "completed",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />
  },
  {
    id: 3,
    title: "整合 API 服務",
    description: "LINE、Google Calendar 已連接",
    status: "completed",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />
  },
  {
    id: 4,
    title: "啟動 AI 客服",
    description: "準備上線",
    status: "current",
    icon: <Zap className="h-5 w-5 text-yellow-600" />
  }
];

export default function LaunchChatbot() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    // 模擬啟動延遲
    setTimeout(() => {
      setIsLaunching(false);
      setIsLaunched(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100/50 sticky top-0 z-40">
        <div className="container px-4 lg:px-0 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-6 w-6 text-orange-600" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              啟動 AI 客服
            </h1>
          </div>
          <p className="text-gray-600">您的系統已準備就緒，點擊下方按鈕即可上線</p>
        </div>
      </header>

      <main className="container px-4 lg:px-0 py-12">
        {/* Launch Steps */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-gray-800 mb-6">啟動進度</h2>
          <div className="space-y-4">
            {launchSteps.map((step, idx) => (
              <div key={step.id}>
                <Card className={`border-0 shadow-md ${
                  step.status === "completed" ? "bg-green-50" :
                  step.status === "current" ? "bg-yellow-50 border-l-4 border-yellow-500" :
                  "bg-gray-50"
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      </div>
                      <Badge className={
                        step.status === "completed" ? "bg-green-100 text-green-800" :
                        step.status === "current" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }>
                        {step.status === "completed" ? "✓ 完成" :
                         step.status === "current" ? "進行中" :
                         "等待中"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                {idx < launchSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-4 w-4 text-gray-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Launch Button */}
        {!isLaunched ? (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-orange-100/50 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                準備好啟動了嗎？
              </CardTitle>
              <CardDescription>
                點擊下方按鈕，您的 AI 客服將立即上線，開始自動處理客戶訊息
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <p className="text-sm text-gray-700 mb-3">✓ 系統檢查：</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    知識庫已配置（4 個項目）
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    LINE 官方帳號已連接
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Google Calendar 已同步
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    AI 模型已訓練
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg h-14"
                onClick={handleLaunch}
                disabled={isLaunching}
              >
                {isLaunching ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    啟動中...
                  </>
                ) : (
                  <>
                    🚀 立即啟動 AI 客服
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-600 text-center">
                啟動後，您的客戶可透過 LINE 與 AI 客服互動
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-green-100/50 mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-6 w-6" />
                🎉 AI 客服已成功上線！
              </CardTitle>
              <CardDescription>
                您的智能客服系統現已運行，開始自動處理客戶查詢
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <MessageSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-600">今日對話</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-600">活躍用戶</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">0s</p>
                  <p className="text-xs text-gray-600">平均回應</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">0%</p>
                  <p className="text-xs text-gray-600">滿意度</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a href="/dashboard" className="flex-1">
                  <Button size="lg" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                    前往儀表板
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="flex-1">
                  測試客服
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">自動回覆客戶</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                AI 客服 24/7 自動回答常見問題，減少客服工作負擔
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">提升轉化率</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                快速回應客戶查詢，提升預約轉化率 20-30%
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">實時數據分析</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                追蹤對話數、轉化率等關鍵指標，優化業務策略
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
