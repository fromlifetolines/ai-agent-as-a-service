import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, Percent, Target, Download, Calendar } from "lucide-react";

interface RevenueData {
  month: string;
  revenue: number;
  growth: number;
  customers: number;
  conversionRate: number;
}

interface PlanMetrics {
  name: string;
  revenue: number;
  customers: number;
  percentage: number;
}

// Mock 業績資料
const mockMonthlyData: RevenueData[] = [
  { month: "1月", revenue: 45000, growth: 0, customers: 15, conversionRate: 12.5 },
  { month: "2月", revenue: 52000, growth: 15.6, customers: 18, conversionRate: 14.2 },
  { month: "3月", revenue: 58000, growth: 11.5, customers: 21, conversionRate: 15.8 },
  { month: "4月", revenue: 72000, growth: 24.1, customers: 28, conversionRate: 18.5 },
  { month: "5月", revenue: 85000, growth: 18.1, customers: 35, conversionRate: 20.1 },
  { month: "6月", revenue: 98000, growth: 15.3, customers: 42, conversionRate: 21.5 },
];

const mockPlanMetrics: PlanMetrics[] = [
  { name: "基礎版", revenue: 29400, customers: 14, percentage: 30 },
  { name: "專業版", revenue: 58800, customers: 20, percentage: 60 },
  { name: "企業版", revenue: 9800, customers: 1, percentage: 10 },
];

const mockTopFeatures = [
  { name: "LINE 整合", usage: 95, trend: "up" },
  { name: "自動預約", usage: 88, trend: "up" },
  { name: "知識庫", usage: 82, trend: "stable" },
  { name: "分析報表", usage: 75, trend: "down" },
  { name: "Google Calendar", usage: 68, trend: "up" },
];

export default function RevenueReport() {
  const [selectedMonth, setSelectedMonth] = useState("6月");
  const currentMonth = mockMonthlyData[mockMonthlyData.length - 1];
  const previousMonth = mockMonthlyData[mockMonthlyData.length - 2];

  const mrr = currentMonth.revenue;
  const arr = mrr * 12;
  const mrrGrowth = currentMonth.growth;
  const customerChurn = 2.5;
  const ltv = 45000;
  const cac = 5000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">業績報表</h2>
          <p className="text-sm text-gray-600 mt-1">實時監控您的收入和客戶指標</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
          <Download className="h-4 w-4 mr-2" />
          下載報表
        </Button>
      </div>

      {/* 月份選擇 */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-sm">選擇月份</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockMonthlyData.map((data) => (
              <Button
                key={data.month}
                variant={selectedMonth === data.month ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMonth(data.month)}
                className={selectedMonth === data.month ? "bg-gradient-to-r from-orange-500 to-orange-600" : ""}
              >
                {data.month}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 關鍵指標 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              月度收入 (MRR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">NT${(mrr / 1000).toFixed(1)}K</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+{mrrGrowth.toFixed(1)}%</span>
              <span className="text-xs text-gray-500">vs 上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              年度收入 (ARR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">NT${(arr / 1000).toFixed(0)}K</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">+{(mrrGrowth * 12).toFixed(1)}%</span>
              <span className="text-xs text-gray-500">年度增長</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              活躍客戶
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{currentMonth.customers}</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-purple-600 font-medium">+{currentMonth.customers - previousMonth.customers}</span>
              <span className="text-xs text-gray-500">vs 上月</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Percent className="h-4 w-4 text-orange-600" />
              轉化率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{currentMonth.conversionRate.toFixed(1)}%</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-600 font-medium">+{(currentMonth.conversionRate - previousMonth.conversionRate).toFixed(1)}%</span>
              <span className="text-xs text-gray-500">vs 上月</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 收入趨勢 */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>6 個月收入趨勢</CardTitle>
          <CardDescription>月度收入與增長率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMonthlyData.map((data, idx) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-24 h-8 bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-orange-700">NT${(data.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    {data.growth > 0 && (
                      <Badge className="bg-green-100 text-green-800">+{data.growth.toFixed(1)}%</Badge>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.revenue / 98000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 方案分佈 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>方案收入分佈</CardTitle>
            <CardDescription>各方案的收入佔比</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPlanMetrics.map((plan) => (
              <div key={plan.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{plan.name}</span>
                  <span className="text-sm text-gray-600">NT${(plan.revenue / 1000).toFixed(1)}K ({plan.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                    style={{ width: `${plan.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{plan.customers} 位客戶</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>客戶指標</CardTitle>
            <CardDescription>關鍵業務指標</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">客戶終身價值 (LTV)</div>
              <div className="text-2xl font-bold text-blue-600">NT${(ltv / 1000).toFixed(0)}K</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">客戶獲取成本 (CAC)</div>
              <div className="text-2xl font-bold text-purple-600">NT${(cac / 1000).toFixed(0)}K</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">LTV:CAC 比率</div>
              <div className="text-2xl font-bold text-green-600">{(ltv / cac).toFixed(1)}:1</div>
              <p className="text-xs text-gray-600 mt-1">✓ 優秀（&gt;3:1）</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">客戶流失率</div>
              <div className="text-2xl font-bold text-red-600">{customerChurn.toFixed(1)}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 熱銷功能 */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>熱銷功能排行</CardTitle>
          <CardDescription>客戶最常使用的功能</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTopFeatures.map((feature, idx) => (
              <div key={feature.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{feature.name}</p>
                    <p className="text-xs text-gray-600">使用率 {feature.usage}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                      style={{ width: `${feature.usage}%` }}
                    ></div>
                  </div>
                  {feature.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  )}
                  {feature.trend === "down" && (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 轉化率分析 */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>轉化率分析</CardTitle>
          <CardDescription>各階段的轉化漏斗</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "訪問網站", count: 5000, rate: 100 },
              { stage: "開始免費試用", count: 625, rate: 12.5 },
              { stage: "完成設定", count: 375, rate: 7.5 },
              { stage: "付款轉換", count: 42, rate: 0.84 },
            ].map((item, idx) => (
              <div key={item.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{item.stage}</span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{item.count.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">{item.rate.toFixed(2)}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
