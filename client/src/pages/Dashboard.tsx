import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  Users, 
  Calendar,
  Edit2,
  Eye,
  Download,
  Plus
} from "lucide-react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 檢查登入狀態
    const loggedIn = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");

    if (!loggedIn) {
      window.location.href = "/login";
      return;
    }

    setIsLoggedIn(true);
    setUserEmail(email || "");
    setUserName(name || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">⏳</div>
          <p>正在載入...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container px-4 lg:px-0 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl lg:text-2xl font-bold text-primary">From Life To Lines</div>
            <div className="hidden sm:block text-sm text-gray-600">管理後台</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:text-right">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">{userEmail}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">登出</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 lg:px-0 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            歡迎回來，{userName}！
          </h1>
          <p className="text-gray-600">管理您的 AI 客服服務、查看分析報告、編輯知識庫</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">本月對話數</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-primary">2,847</div>
              <p className="text-xs text-gray-600 mt-1">↑ 12% vs 上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">預約轉化率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-green-600">34.2%</div>
              <p className="text-xs text-gray-600 mt-1">↑ 5.3% vs 上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">客戶滿意度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-blue-600">4.8/5.0</div>
              <p className="text-xs text-gray-600 mt-1">基於 156 則評價</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">系統狀態</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl lg:text-3xl font-bold text-green-600">✓ 正常</div>
              <p className="text-xs text-gray-600 mt-1">99.9% 可用性</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">概覽</TabsTrigger>
            <TabsTrigger value="knowledge" className="text-xs lg:text-sm">知識庫</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs lg:text-sm">分析</TabsTrigger>
            <TabsTrigger value="settings" className="text-xs lg:text-sm">設定</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">快速操作</CardTitle>
                <CardDescription>常用的管理功能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="justify-start h-auto py-4 px-4" variant="outline">
                    <Edit2 className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">編輯知識庫</p>
                      <p className="text-xs text-gray-600">修改服務項目、FAQ、員工資訊</p>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto py-4 px-4" variant="outline">
                    <Eye className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">預覽客服</p>
                      <p className="text-xs text-gray-600">測試 AI 客服的回應效果</p>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto py-4 px-4" variant="outline">
                    <Download className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">下載報告</p>
                      <p className="text-xs text-gray-600">匯出本月的分析數據</p>
                    </div>
                  </Button>
                  <Button className="justify-start h-auto py-4 px-4" variant="outline">
                    <Settings className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold text-sm">帳戶設定</p>
                      <p className="text-xs text-gray-600">修改密碼、計費方式</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">最近活動</CardTitle>
                <CardDescription>過去 7 天的系統活動</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "今天 14:32", action: "更新知識庫", status: "成功" },
                    { time: "昨天 10:15", action: "新增 5 個 FAQ", status: "成功" },
                    { time: "4 月 13 日", action: "修改員工排班", status: "成功" },
                    { time: "4 月 12 日", action: "系統自動備份", status: "成功" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                      <div>
                        <p className="font-semibold text-sm">{item.action}</p>
                        <p className="text-xs text-gray-600">{item.time}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg lg:text-xl">知識庫管理</CardTitle>
                  <CardDescription>編輯 AI 客服的知識內容</CardDescription>
                </div>
                <Button size="sm" className="ml-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">新增項目</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "服務項目", count: "7 個", lastUpdate: "今天" },
                    { title: "常見問題", count: "12 個", lastUpdate: "2 天前" },
                    { title: "員工資訊", count: "3 位", lastUpdate: "1 週前" },
                    { title: "營業時間", count: "已設定", lastUpdate: "1 個月前" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600">最後更新：{item.lastUpdate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">{item.count}</span>
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">分析報告</CardTitle>
                <CardDescription>查看 AI 客服的效能數據</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">📊 本月概覽</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">總對話數</p>
                        <p className="text-xl font-bold text-primary">2,847</p>
                      </div>
                      <div>
                        <p className="text-gray-600">平均回應時間</p>
                        <p className="text-xl font-bold text-primary">0.8s</p>
                      </div>
                      <div>
                        <p className="text-gray-600">預約成功率</p>
                        <p className="text-xl font-bold text-green-600">94.2%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">用戶滿意度</p>
                        <p className="text-xl font-bold text-blue-600">4.8/5</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">🔝 熱門問題</p>
                    <div className="space-y-2">
                      {[
                        "營業時間是幾點？",
                        "如何預約服務？",
                        "有停車位嗎？",
                        "支援線上支付嗎？",
                      ].map((q, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{q}</span>
                          <span className="font-semibold text-gray-900">{Math.floor(Math.random() * 200) + 50} 次</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">帳戶設定</CardTitle>
                <CardDescription>管理您的帳戶和訂閱</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-sm mb-2">訂閱方案</h3>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="font-semibold text-gray-900">專業版</p>
                    <p className="text-sm text-gray-600">NT$5,990/月</p>
                    <p className="text-xs text-gray-600 mt-2">✓ 10,000 次對話/月 • ✓ 3 個知識庫 • ✓ 進階分析</p>
                    <Button size="sm" variant="outline" className="mt-3">升級至企業版</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2">計費方式</h3>
                  <div className="p-4 border border-border rounded-lg">
                    <p className="text-sm text-gray-700">信用卡 •••• 1234</p>
                    <p className="text-xs text-gray-600">下次計費：2026 年 5 月 15 日</p>
                    <Button size="sm" variant="outline" className="mt-3">修改計費方式</Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2">安全設定</h3>
                  <div className="space-y-3">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      修改密碼
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      啟用雙因素認證
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12 bg-white">
        <div className="container px-4 lg:px-0 text-center text-xs lg:text-sm text-gray-600">
          <p>需要幫助？<Button variant="link" className="p-0 h-auto">聯絡客服</Button> • <Button variant="link" className="p-0 h-auto">查看文件</Button></p>
        </div>
      </footer>
    </div>
  );
}
