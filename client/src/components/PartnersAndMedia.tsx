import { Building2, Newspaper } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  logo: string;
  category: "partner" | "media";
}

const partnersAndMedia: Partner[] = [
  // 合作夥伴
  {
    id: 1,
    name: "Make.com",
    logo: "⚙️",
    category: "partner",
  },
  {
    id: 2,
    name: "OpenAI",
    logo: "🤖",
    category: "partner",
  },
  {
    id: 3,
    name: "Google Cloud",
    logo: "☁️",
    category: "partner",
  },
  {
    id: 4,
    name: "LINE Platform",
    logo: "💬",
    category: "partner",
  },
  // 媒體報導
  {
    id: 5,
    name: "科技新報",
    logo: "📰",
    category: "media",
  },
  {
    id: 6,
    name: "創業家雜誌",
    logo: "📑",
    category: "media",
  },
  {
    id: 7,
    name: "數位時代",
    logo: "💻",
    category: "media",
  },
  {
    id: 8,
    name: "經濟日報",
    logo: "📊",
    category: "media",
  },
];

export default function PartnersAndMedia() {
  const partners = partnersAndMedia.filter((item) => item.category === "partner");
  const media = partnersAndMedia.filter((item) => item.category === "media");

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="container">
        {/* 合作夥伴 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              技術合作夥伴
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {partner.logo}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 媒體報導 */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              媒體報導
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {media.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {item.logo}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底部文案 */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            我們與業界領先的技術平台與媒體合作，為中小企業提供最可靠的 AI 客服解決方案
          </p>
        </div>
      </div>
    </section>
  );
}
