import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "王醫生",
    role: "診所院長",
    company: "笑容牙醫診所",
    avatar: "👨‍⚕️",
    rating: 5,
    comment: "導入後預約率提升 30%，客服成本降低 70%。系統穩定可靠，客戶滿意度大幅提升！",
  },
  {
    id: 2,
    name: "李老闆",
    role: "餐廳負責人",
    company: "Bistro Uno",
    avatar: "👨‍🍳",
    rating: 5,
    comment: "自動訂位功能超實用，翻桌率提升 25%。AI 客服回應速度快，客戶體驗大幅改善。",
  },
  {
    id: 3,
    name: "陳設計師",
    role: "沙龍經營者",
    company: "Luxe Hair Studio",
    avatar: "👩‍🦰",
    rating: 5,
    comment: "缺席率從 15% 降到 5%，客戶黏著度提升 20%。30 分鐘上線，完全無需技術背景！",
  },
  {
    id: 4,
    name: "黃經理",
    role: "行銷主管",
    company: "美容連鎖集團",
    avatar: "👩‍💼",
    rating: 5,
    comment: "支援多家分店管理，統一 AI 客服標準。數據分析功能幫助我們優化預約流程。",
  },
  {
    id: 5,
    name: "劉醫生",
    role: "診所主任",
    company: "健康牙科中心",
    avatar: "👨‍⚕️",
    rating: 5,
    comment: "LINE 整合完美無缺，患者習慣的溝通方式。自動提醒減少缺席，提升診療效率。",
  },
  {
    id: 6,
    name: "陳老闆",
    role: "餐飲集團CEO",
    company: "美食餐飲集團",
    avatar: "👨‍💼",
    rating: 5,
    comment: "24/7 自動客服，節省人力成本。客戶滿意度提升，口碑推薦增加 40%。",
  },
];

export default function CustomerTestimonials() {
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* 標題與統計 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">客戶推薦</h2>
          <p className="text-gray-600 text-lg mb-6">
            已有 380+ 家中小企業透過 AI 客服實現業績提升
          </p>

          {/* 評分統計 */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {averageRating}
              </span>
              <span className="text-gray-600">
                ({testimonials.length}+ 客戶評價)
              </span>
            </div>
          </div>
        </div>

        {/* 客戶頭像牆 */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer"
                title={`${testimonial.name} - ${testimonial.company}`}
              >
                {testimonial.avatar}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            點擊頭像查看客戶評價
          </p>
        </div>

        {/* 推薦卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              {/* 星級評分 */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* 評論文本 */}
              <p className="text-gray-700 mb-4 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* 客戶資訊 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部 CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            加入這些成功的企業，開始您的 AI 客服之旅
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl">
            免費試用 14 天
          </button>
        </div>
      </div>
    </section>
  );
}
