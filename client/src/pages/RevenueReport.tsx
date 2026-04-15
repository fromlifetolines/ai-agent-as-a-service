import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, CreditCard, Target, BarChart3, LineChart } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function RevenueReport() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  // Fetch monthly revenue
  const { data: monthlyRevenue, isLoading: revenueLoading } = trpc.revenue.getMonthlyRevenue.useQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  // Fetch revenue trend
  const { data: revenueTrend } = trpc.revenue.getRevenueTrend.useQuery();

  // Fetch customer metrics
  const { data: customerMetrics } = trpc.revenue.getCustomerMetrics.useQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  // Fetch conversion metrics
  const { data: conversionMetrics } = trpc.revenue.getConversionMetrics.useQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  // Fetch MRR
  const { data: mrrData } = trpc.revenue.getMRR.useQuery();

  // Fetch ARR
  const { data: arrData } = trpc.revenue.getARR.useQuery();

  const months = [
    { value: 1, label: "1 月" },
    { value: 2, label: "2 月" },
    { value: 3, label: "3 月" },
    { value: 4, label: "4 月" },
    { value: 5, label: "5 月" },
    { value: 6, label: "6 月" },
    { value: 7, label: "7 月" },
    { value: 8, label: "8 月" },
    { value: 9, label: "9 月" },
    { value: 10, label: "10 月" },
    { value: 11, label: "11 月" },
    { value: 12, label: "12 月" },
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i);

  if (revenueLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">載入中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">業績報表</h1>
          <p className="text-gray-600 mt-1">查看收入、客戶和轉化率統計</p>
        </div>
      </div>

      {/* Date Filters */}
      <div className="flex gap-4">
        <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year} 年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              月度收入
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-primary">
              NT${monthlyRevenue?.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              ↑ {monthlyRevenue?.monthlyGrowth}% vs 上月
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              客戶數
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-blue-600">
              {customerMetrics?.totalCustomers}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              活躍用戶：{customerMetrics?.activeCustomers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Target className="h-4 w-4" />
              轉化率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-green-600">
              {conversionMetrics?.overallConversion}%
            </div>
            <p className="text-xs text-gray-600 mt-1">
              試用轉付費：{conversionMetrics?.trialToPayingConversion}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              平均訂單值
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-purple-600">
              NT${monthlyRevenue?.averageOrderValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              本月交易數：{monthlyRevenue?.totalTransactions}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* MRR & ARR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>月度經常性收入 (MRR)</CardTitle>
            <CardDescription>當月訂閱產生的經常性收入</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">當前 MRR</p>
              <p className="text-3xl font-bold text-primary">NT${mrrData?.currentMRR.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">↑ {mrrData?.growth}% vs 上月</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">按方案分佈：</p>
              {mrrData?.mrrByPlan.map((plan: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {plan.plan} ({plan.customers} 客戶)
                  </span>
                  <span className="font-medium">NT${plan.mrr.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>年度經常性收入 (ARR)</CardTitle>
            <CardDescription>年化訂閱產生的經常性收入</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">當前 ARR</p>
              <p className="text-3xl font-bold text-primary">NT${arrData?.currentARR.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">↑ {arrData?.growth}% vs 去年</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">按方案分佈：</p>
              {arrData?.arrByPlan.map((plan: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {plan.plan} ({plan.customers} 客戶)
                  </span>
                  <span className="font-medium">NT${plan.arr.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Plans */}
      <Card>
        <CardHeader>
          <CardTitle>熱銷方案排行</CardTitle>
          <CardDescription>本月收入最高的訂閱方案</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenue?.topPlans.map((plan: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{plan.name}</p>
                  <p className="text-sm text-gray-600">{plan.customers} 位客戶</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">NT${plan.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">
                    {((plan.revenue / monthlyRevenue.totalRevenue) * 100).toFixed(1)}% 佔比
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>客戶指標</CardTitle>
          <CardDescription>客戶獲取、保留和流失分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">新客戶（本月）</p>
              <p className="text-2xl font-bold text-blue-600">{monthlyRevenue?.newCustomers}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">流失客戶（本月）</p>
              <p className="text-2xl font-bold text-red-600">{monthlyRevenue?.churnedCustomers}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">保留率</p>
              <p className="text-2xl font-bold text-green-600">{customerMetrics?.retentionRate}%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">客戶終身價值</p>
              <p className="text-2xl font-bold text-purple-600">NT${customerMetrics?.lifetimeValue}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>轉化率分析</CardTitle>
          <CardDescription>各個轉化漏斗的轉化率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">註冊到試用</span>
                <span className="text-sm font-bold text-primary">
                  {conversionMetrics?.signupToTrialConversion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${conversionMetrics?.signupToTrialConversion}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">試用到付費</span>
                <span className="text-sm font-bold text-green-600">
                  {conversionMetrics?.trialToPayingConversion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${conversionMetrics?.trialToPayingConversion}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">整體轉化率</span>
                <span className="text-sm font-bold text-blue-600">
                  {conversionMetrics?.overallConversion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${conversionMetrics?.overallConversion}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
