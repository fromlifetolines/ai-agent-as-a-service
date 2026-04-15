import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Calendar, Zap, BarChart3, Globe, ArrowRight, Star } from "lucide-react";
import { useState } from "react";

const pricingPlans = [
  {
    name: "基礎版",
    price: "2,990",
    description: "適合初期試用",
    features: [
      "1,000 次對話/月",
      "1 個知識庫",
      "基礎分析",
      "郵件支援",
      "LINE 整合"
    ],
    cta: "開始免費試用",
    highlighted: false
  },
  {
    name: "專業版",
    price: "5,990",
    description: "推薦方案",
    features: [
      "10,000 次對話/月",
      "3 個知識庫",
      "進階分析 + CRM",
      "優先郵件支援",
      "自訂工作流",
      "多渠道整合"
    ],
    cta: "開始免費試用",
    highlighted: true
  },
  {
    name: "企業版",
    price: "12,990",
    description: "完整解決方案",
    features: [
      "無限對話",
      "無限知識庫",
      "完整分析",
      "24/7 電話支援",
      "優先功能開發",
      "專屬帳戶經理"
    ],
    cta: "聯絡銷售",
    highlighted: false
  }
];

const caseStudies = [
  {
    title: "笑容牙醫診所",
    industry: "牙醫診所",
    metric1: "+30%",
    metric1Label: "預約率提升",
    metric2: "-50%",
    metric2Label: "缺席率下降",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663251767471/ZSXGN7FQEEFRpKga2SNUSU/case-study-dental-dK6bxjViGMzZdBSVpskiuB.webp"
  },
  {
    title: "Bistro Uno 餐廳",
    industry: "餐飲業",
    metric1: "+80%",
    metric1Label: "自動訂位",
    metric2: "+25%",
    metric2Label: "翻桌率提升",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663251767471/ZSXGN7FQEEFRpKga2SNUSU/case-study-restaurant-nVXc2gDP4qT8SntfrixAhr.webp"
  },
  {
    title: "Luxe Hair Studio",
    industry: "美髮沙龍",
    metric1: "-60%",
    metric1Label: "缺席率下降",
    metric2: "+20%",
    metric2Label: "客戶黏著度",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663251767471/ZSXGN7FQEEFRpKga2SNUSU/case-study-salon-STwoBoPcp7gPLLrwD5QsUf.webp"
  }
];

const features = [
  {
    icon: Zap,
    title: "30 分鐘快速上線",
    description: "無需技術背景，預設模版開箱即用"
  },
  {
    icon: MessageSquare,
    title: "LINE 優先",
    description: "台灣用戶最高滲透率，本地化支援"
  },
  {
    icon: Calendar,
    title: "自動預約管理",
    description: "自動確認、提醒、檔期管理"
  },
  {
    icon: Globe,
    title: "24/7 自動服務",
    description: "永不休息的 AI 客服助手"
  },
  {
    icon: BarChart3,
    title: "完整分析報告",
    description: "實時數據追蹤，優化決策"
  },
  {
    icon: CheckCircle2,
    title: "行業特定模版",
    description: "牙醫、餐廳、沙龍預設配置"
  }
];

const steps = [
  {
    number: "1",
    title: "選擇模版",
    description: "選擇適合您行業的模版"
  },
  {
    number: "2",
    title: "配置知識庫",
    description: "填入業務資訊與服務項目"
  },
  {
    number: "3",
    title: "整合 API",
    description: "連接 LINE、Google Calendar"
  },
  {
    number: "4",
    title: "上線運營",
    description: "啟動 AI 客服，開始收益"
  }
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<number>(0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary">From Life To Lines</div>
          <div className="flex gap-4">
            <Button variant="ghost">功能</Button>
            <Button variant="ghost">定價</Button>
            <Button variant="ghost">案例</Button>
            <Button>免費試用</Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663251767471/ZSXGN7FQEEFRpKga2SNUSU/hero-background-9FmaDbFgDtoHkQsih4WC6u.webp"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="container relative z-10 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              24/7 AI 客服
              <br />
              <span className="text-orange-400">30 分鐘快速上線</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
              為中小企業打造的無代碼 AI 預約客服系統。降低 70-80% 客服成本，提升預約轉化率 20-30%。
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                免費試用 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                預約演示
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-4">為什麼選擇我們？</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              6 個核心特性，幫助中小企業快速實現 AI 客服轉型
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-4">客戶成功案例</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              來自不同行業的真實客戶，已透過 AI Agent 實現業績提升
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {caseStudies.map((study, idx) => (
                <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentCaseStudy(idx)}>
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{study.title}</CardTitle>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{study.industry}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{study.metric1}</div>
                        <p className="text-sm text-gray-600">{study.metric1Label}</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{study.metric2}</div>
                        <p className="text-sm text-gray-600">{study.metric2Label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-4">簡單透明的定價</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              選擇適合您的方案，隨時升級或降級
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, idx) => (
                <Card
                  key={idx}
                  className={`relative transition-all ${
                    plan.highlighted
                      ? "md:scale-105 border-primary shadow-lg"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      推薦方案
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">NT${plan.price}</span>
                      <span className="text-gray-600">/月</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full mb-6" variant={plan.highlighted ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                    <ul className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-4">4 步快速開始</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              無需技術背景，30 分鐘內完成部署
            </p>
            
            <div className="grid md:grid-cols-4 gap-4">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-1 bg-primary/20 -translate-y-1/2"></div>
                  )}
                  <Card className="relative z-10 text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        {step.number}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">準備好了嗎？</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              加入 380+ 家中小企業，透過 AI 客服提升業績
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                免費試用 30 天 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                預約演示
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">From Life To Lines</h3>
              <p className="text-sm">為中小企業打造的 AI 客服解決方案</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">產品</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">功能</a></li>
                <li><a href="#" className="hover:text-white">定價</a></li>
                <li><a href="#" className="hover:text-white">案例</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">關於我們</a></li>
                <li><a href="#" className="hover:text-white">部落格</a></li>
                <li><a href="#" className="hover:text-white">聯絡我們</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">聯絡</h4>
              <ul className="space-y-2 text-sm">
                <li>📧 support@fromlifetolines.com</li>
                <li>💬 LINE: @fromlifetolines</li>
                <li>📞 (02) XXXX-XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 From Life To Lines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
