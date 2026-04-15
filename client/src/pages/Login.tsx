import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 模擬登入流程 - 實際應用中應連接後端 API
    try {
      // 驗證輸入
      if (!email || !password) {
        setError("請填入所有欄位");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("請輸入有效的電子郵件");
        setIsLoading(false);
        return;
      }

      // 模擬 API 呼叫延遲
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 儲存登入狀態到 localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", email.split("@")[0]);

      // 導向儀表板
      window.location.href = "/dashboard";
    } catch (err) {
      setError("登入失敗，請稍後重試");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", "demo@fromlifetolines.com");
    localStorage.setItem("userName", "Demo User");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-border py-4 lg:py-6">
        <div className="container px-4 lg:px-0">
          <div className="flex items-center justify-between">
            <div className="text-xl lg:text-2xl font-bold text-primary">From Life To Lines</div>
            <Button variant="ghost" onClick={() => window.location.href = "/"} className="text-sm">
              返回首頁
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-8 lg:py-12">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">歡迎回來</h1>
            <p className="text-gray-600 text-sm lg:text-base">登入您的帳戶以管理 AI 客服</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl lg:text-2xl">客戶登入</CardTitle>
              <CardDescription className="text-xs lg:text-sm">
                輸入您的登入憑證以存取儀表板
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm lg:text-base">
                    電子郵件
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 text-sm lg:text-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm lg:text-base">
                    密碼
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 text-sm lg:text-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs lg:text-sm">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white text-sm lg:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      登入中...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      登入
                    </>
                  )}
                </Button>

                {/* Demo Login */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-sm lg:text-base"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  <span className="mr-2">👁️</span>
                  試用演示帳號
                </Button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-center text-xs lg:text-sm">
                <p className="text-gray-600">
                  還沒有帳戶？{" "}
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                    onClick={() => window.location.href = "/"}
                  >
                    免費試用
                  </Button>
                </p>
                <p className="text-gray-600">
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80 p-0 h-auto"
                  >
                    忘記密碼？
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-xs lg:text-sm text-gray-700">
            <p className="font-semibold mb-2">🔐 演示帳號</p>
            <p>點擊「試用演示帳號」以查看完整的管理後台功能</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 lg:py-6 bg-gray-50">
        <div className="container px-4 lg:px-0 text-center text-xs lg:text-sm text-gray-600">
          <p>© 2026 From Life To Lines. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
