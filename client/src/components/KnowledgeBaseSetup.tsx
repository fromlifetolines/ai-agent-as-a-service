import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Download, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Staff {
  id: string;
  name: string;
  specialties: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface KnowledgeBase {
  businessName: string;
  businessType: string;
  phone: string;
  services: Service[];
  staff: Staff[];
  faqs: FAQ[];
}

const steps = [
  { id: 1, label: "業務資訊", icon: "🏢" },
  { id: 2, label: "服務項目", icon: "⚙️" },
  { id: 3, label: "員工資訊", icon: "👥" },
  { id: 4, label: "常見問題", icon: "❓" },
];

export default function KnowledgeBaseSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [kb, setKb] = useState<KnowledgeBase>({
    businessName: "",
    businessType: "dental",
    phone: "",
    services: [],
    staff: [],
    faqs: [],
  });

  const [newService, setNewService] = useState({ name: "", duration: 30, price: 0 });
  const [newStaff, setNewStaff] = useState({ name: "", specialties: "" });
  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });

  // 計時器
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const addService = () => {
    if (newService.name) {
      setKb((prev) => ({
        ...prev,
        services: [
          ...prev.services,
          { id: Date.now().toString(), ...newService },
        ],
      }));
      setNewService({ name: "", duration: 30, price: 0 });
    }
  };

  const removeService = (id: string) => {
    setKb((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const addStaff = () => {
    if (newStaff.name) {
      setKb((prev) => ({
        ...prev,
        staff: [...prev.staff, { id: Date.now().toString(), ...newStaff }],
      }));
      setNewStaff({ name: "", specialties: "" });
    }
  };

  const removeStaff = (id: string) => {
    setKb((prev) => ({
      ...prev,
      staff: prev.staff.filter((s) => s.id !== id),
    }));
  };

  const addFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
      setKb((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { id: Date.now().toString(), ...newFAQ }],
      }));
      setNewFAQ({ question: "", answer: "" });
    }
  };

  const removeFAQ = (id: string) => {
    setKb((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(kb, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${kb.businessName || "knowledge-base"}.json`;
    link.click();
  };

  const startSetup = () => {
    setIsRunning(true);
    setTimeLeft(120);
  };

  const resetSetup = () => {
    setIsRunning(false);
    setTimeLeft(120);
    setCurrentStep(1);
    setKb({
      businessName: "",
      businessType: "dental",
      phone: "",
      services: [],
      staff: [],
      faqs: [],
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 頂部計時器與進度 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">2 分鐘快速設定</h2>
            <p className="text-gray-600">
              按照步驟填入業務資訊，AI 客服立即上線
            </p>
          </div>
          {isRunning && (
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 font-mono">
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {timeLeft === 0 ? "✅ 完成！" : "⏱️ 進行中..."}
              </p>
            </div>
          )}
        </div>

        {/* 進度指示器 */}
        <div className="flex gap-2 mb-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                  currentStep === step.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : currentStep > step.id
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="text-xl">{step.icon}</span>
                <span className="hidden sm:inline">{step.label}</span>
                {currentStep > step.id && (
                  <CheckCircle2 className="w-4 h-4 ml-1" />
                )}
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`w-2 h-2 rounded-full mx-2 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 左側：表單 */}
        <div>
          {/* Step 1: 業務資訊 */}
          {currentStep === 1 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">📋 業務基本資訊</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    業務名稱 *
                  </label>
                  <Input
                    placeholder="例：笑容牙醫診所"
                    value={kb.businessName}
                    onChange={(e) =>
                      setKb({ ...kb, businessName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    行業類型 *
                  </label>
                  <select
                    value={kb.businessType}
                    onChange={(e) =>
                      setKb({ ...kb, businessType: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="dental">🦷 牙醫診所</option>
                    <option value="restaurant">🍽️ 餐廳</option>
                    <option value="salon">💇 美髮沙龍</option>
                    <option value="other">🏢 其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    聯絡電話 *
                  </label>
                  <Input
                    placeholder="(02) XXXX-XXXX"
                    value={kb.phone}
                    onChange={(e) => setKb({ ...kb, phone: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: 服務項目 */}
          {currentStep === 2 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">⚙️ 服務項目</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  💡 新增 3-5 個主要服務項目
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="服務名稱（例：洗牙）"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="時長（分鐘）"
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          duration: parseInt(e.target.value),
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="價格（NT$）"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          price: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={addService}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" /> 新增服務
                  </Button>
                </div>

                {/* 已新增的服務 */}
                <div className="space-y-2">
                  {kb.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-sm text-gray-600">
                          {service.duration} 分鐘 • NT${service.price}
                        </p>
                      </div>
                      <button
                        onClick={() => removeService(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Step 3: 員工資訊 */}
          {currentStep === 3 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">👥 員工資訊</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  💡 新增 2-3 位主要員工或設計師
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="員工名稱"
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="專長或服務（例：剪髮、燙染）"
                    value={newStaff.specialties}
                    onChange={(e) =>
                      setNewStaff({
                        ...newStaff,
                        specialties: e.target.value,
                      })
                    }
                  />
                  <Button
                    onClick={addStaff}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" /> 新增員工
                  </Button>
                </div>

                {/* 已新增的員工 */}
                <div className="space-y-2">
                  {kb.staff.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-600">
                          {member.specialties}
                        </p>
                      </div>
                      <button
                        onClick={() => removeStaff(member.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: 常見問題 */}
          {currentStep === 4 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">❓ 常見問題</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                  💡 新增 3-5 個常見問題與回答
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="問題（例：營業時間？）"
                    value={newFAQ.question}
                    onChange={(e) =>
                      setNewFAQ({ ...newFAQ, question: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="回答"
                    rows={3}
                    value={newFAQ.answer}
                    onChange={(e) =>
                      setNewFAQ({ ...newFAQ, answer: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <Button
                    onClick={addFAQ}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" /> 新增問題
                  </Button>
                </div>

                {/* 已新增的問題 */}
                <div className="space-y-2">
                  {kb.faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            Q: {faq.question}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            A: {faq.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFAQ(faq.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* 控制按鈕 */}
          <div className="flex gap-2 mt-6">
            <Button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              variant="outline"
              disabled={currentStep === 1}
              className="flex-1"
            >
              上一步
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              下一步 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* 右側：實時預覽 */}
        <div>
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-4">
            <h3 className="text-xl font-bold mb-4">🤖 AI 客服預覽</h3>

            {/* 預覽聊天 */}
            <div className="bg-white rounded-lg p-4 h-80 overflow-y-auto mb-4 border border-gray-200">
              {kb.businessName ? (
                <div className="space-y-3">
                  {/* Bot 初始訊息 */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm max-w-xs">
                      歡迎來到 {kb.businessName}！請問有什麼我可以幫助您的嗎？
                    </div>
                  </div>

                  {/* 服務列表預覽 */}
                  {kb.services.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm max-w-xs">
                        <p className="font-semibold mb-2">我們提供以下服務：</p>
                        {kb.services.map((s) => (
                          <p key={s.id} className="text-xs">
                            • {s.name} ({s.duration} 分鐘)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 員工資訊預覽 */}
                  {kb.staff.length > 0 && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm max-w-xs">
                        <p className="font-semibold mb-2">我們的專業團隊：</p>
                        {kb.staff.map((m) => (
                          <p key={m.id} className="text-xs">
                            • {m.name} - {m.specialties}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 用戶範例訊息 */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white px-3 py-2 rounded-lg rounded-br-none text-sm max-w-xs">
                      我想預約服務
                    </div>
                  </div>

                  {/* Bot 回應 */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none text-sm max-w-xs">
                      完美！我已為您預約。請稍候，我會發送確認訊息。
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p className="text-lg mb-2">📝</p>
                    <p>填入業務名稱開始預覽</p>
                  </div>
                </div>
              )}
            </div>

            {/* 設定統計 */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <p className="text-gray-600">服務項目</p>
                <p className="text-2xl font-bold text-blue-600">
                  {kb.services.length}
                </p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <p className="text-gray-600">員工</p>
                <p className="text-2xl font-bold text-blue-600">
                  {kb.staff.length}
                </p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <p className="text-gray-600">FAQ</p>
                <p className="text-2xl font-bold text-blue-600">
                  {kb.faqs.length}
                </p>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                <p className="text-gray-600">完成度</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    ((kb.businessName ? 1 : 0) +
                      (kb.services.length > 0 ? 1 : 0) +
                      (kb.staff.length > 0 ? 1 : 0) +
                      (kb.faqs.length > 0 ? 1 : 0)) /
                      4 *
                      100
                  )}
                  %
                </p>
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex gap-2">
              {!isRunning ? (
                <Button
                  onClick={startSetup}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Clock className="w-4 h-4 mr-2" /> 開始計時
                </Button>
              ) : (
                <Button
                  onClick={resetSetup}
                  variant="outline"
                  className="flex-1"
                >
                  重置
                </Button>
              )}
              <Button
                onClick={downloadJSON}
                disabled={!kb.businessName}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" /> 導出 JSON
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
