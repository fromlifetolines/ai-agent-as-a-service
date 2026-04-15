import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type TimeRange = "week" | "month" | "quarter" | "year";

interface AnalyticsData {
  conversationTrend: Array<{ date: string; conversations: number }>;
  conversionRateTrend: Array<{ date: string; rate: number }>;
  topQuestions: Array<{ question: string; count: number }>;
  stats: {
    totalConversations: number;
    conversionRate: number;
    avgResponseTime: string;
    satisfaction: number;
    monthlyChange: string;
  };
}

const mockData: Record<TimeRange, AnalyticsData> = {
  week: {
    conversationTrend: [
      { date: "4/9", conversations: 280 },
      { date: "4/10", conversations: 320 },
      { date: "4/11", conversations: 290 },
      { date: "4/12", conversations: 380 },
      { date: "4/13", conversations: 420 },
      { date: "4/14", conversations: 350 },
      { date: "4/15", conversations: 480 },
    ],
    conversionRateTrend: [
      { date: "4/9", rate: 88 },
      { date: "4/10", rate: 90 },
      { date: "4/11", rate: 87 },
      { date: "4/12", rate: 92 },
      { date: "4/13", rate: 94 },
      { date: "4/14", rate: 91 },
      { date: "4/15", rate: 96 },
    ],
    topQuestions: [
      { question: "營業時間是幾點？", count: 287 },
      { question: "如何預約服務？", count: 245 },
      { question: "有停車位嗎？", count: 198 },
      { question: "支援線上支付嗎？", count: 156 },
    ],
    stats: {
      totalConversations: 2847,
      conversionRate: 94.2,
      avgResponseTime: "0.8s",
      satisfaction: 4.8,
      monthlyChange: "↑ 12%",
    },
  },
  month: {
    conversationTrend: [
      { date: "4/1", conversations: 2100 },
      { date: "4/8", conversations: 2400 },
      { date: "4/15", conversations: 2847 },
    ],
    conversionRateTrend: [
      { date: "4/1", rate: 88 },
      { date: "4/8", rate: 91 },
      { date: "4/15", rate: 94.2 },
    ],
    topQuestions: [
      { question: "營業時間是幾點？", count: 287 },
      { question: "如何預約服務？", count: 245 },
      { question: "有停車位嗎？", count: 198 },
      { question: "支援線上支付嗎？", count: 156 },
    ],
    stats: {
      totalConversations: 2847,
      conversionRate: 94.2,
      avgResponseTime: "0.8s",
      satisfaction: 4.8,
      monthlyChange: "↑ 12%",
    },
  },
  quarter: {
    conversationTrend: [
      { date: "1月", conversations: 5200 },
      { date: "2月", conversations: 6100 },
      { date: "3月", conversations: 7400 },
      { date: "4月", conversations: 8500 },
    ],
    conversionRateTrend: [
      { date: "1月", rate: 85 },
      { date: "2月", rate: 88 },
      { date: "3月", rate: 91 },
      { date: "4月", rate: 94.2 },
    ],
    topQuestions: [
      { question: "營業時間是幾點？", count: 1200 },
      { question: "如何預約服務？", count: 980 },
      { question: "有停車位嗎？", count: 750 },
      { question: "支援線上支付嗎？", count: 620 },
    ],
    stats: {
      totalConversations: 27200,
      conversionRate: 94.2,
      avgResponseTime: "0.75s",
      satisfaction: 4.7,
      monthlyChange: "↑ 35%",
    },
  },
  year: {
    conversationTrend: [
      { date: "2025年", conversations: 45000 },
      { date: "2026年Q1", conversations: 28700 },
      { date: "2026年Q2", conversations: 32100 },
    ],
    conversionRateTrend: [
      { date: "2025年", rate: 82 },
      { date: "2026年Q1", rate: 89 },
      { date: "2026年Q2", rate: 94.2 },
    ],
    topQuestions: [
      { question: "營業時間是幾點？", count: 5200 },
      { question: "如何預約服務？", count: 4100 },
      { question: "有停車位嗎？", count: 3200 },
      { question: "支援線上支付嗎？", count: 2800 },
    ],
    stats: {
      totalConversations: 105800,
      conversionRate: 94.2,
      avgResponseTime: "0.72s",
      satisfaction: 4.6,
      monthlyChange: "↑ 85%",
    },
  },
};

export default function AnalyticsPanel() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("month");
  const data = mockData[selectedRange];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">分析報告</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <span className="text-sm font-medium text-gray-700">時間範圍：</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "本週", value: "week" as TimeRange },
                { label: "本月", value: "month" as TimeRange },
                { label: "本季", value: "quarter" as TimeRange },
                { label: "本年", value: "year" as TimeRange },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={selectedRange === option.value ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => setSelectedRange(option.value)}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <Card>
        <CardHeader>
          <p className="text-sm font-semibold text-gray-900">📊 概覽</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-gray-600 text-xs">總對話數</p>
              <p className="text-2xl font-bold text-primary mt-1">{data.stats.totalConversations.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">{data.stats.monthlyChange}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-xs">預約成功率</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{data.stats.conversionRate}%</p>
              <p className="text-xs text-green-600 mt-1">↑ 3.5%</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-gray-600 text-xs">平均回應時間</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{data.stats.avgResponseTime}</p>
              <p className="text-xs text-green-600 mt-1">↓ 0.2s</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-gray-600 text-xs">用戶滿意度</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{data.stats.satisfaction}/5</p>
              <p className="text-xs text-green-600 mt-1">↑ 0.2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conversation Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">對話量趨勢</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.conversationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conversations" stroke="#3b82f6" name="對話數" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">預約轉化率</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.conversionRateTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" fill="#10b981" name="轉化率 (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">🔝 熱門問題</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topQuestions.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700 font-medium">{idx + 1}. {item.question}</span>
                <span className="text-sm font-bold text-primary bg-blue-100 px-3 py-1 rounded-full">{item.count} 次</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
