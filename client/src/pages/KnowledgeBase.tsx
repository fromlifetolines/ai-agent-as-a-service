import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowRight,
  FileText,
  Image as ImageIcon,
  Video,
  Link2,
  Save,
  X,
  CheckCircle2
} from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: "text" | "image" | "video" | "link";
  category: string;
  createdAt: string;
}

const defaultKnowledge: KnowledgeItem[] = [
  {
    id: "1",
    title: "營業時間",
    content: "週一至週五：09:00-18:00\n週六：10:00-16:00\n週日：休息",
    type: "text",
    category: "基本資訊",
    createdAt: "2026-04-15"
  },
  {
    id: "2",
    title: "聯絡方式",
    content: "電話：(02) XXXX-XXXX\nLINE：@fromlifetolines\n郵件：support@fromlifetolines.com",
    type: "text",
    category: "基本資訊",
    createdAt: "2026-04-15"
  },
  {
    id: "3",
    title: "常見問題 - 預約流程",
    content: "1. 點擊預約按鈕\n2. 選擇日期和時間\n3. 填寫個人資訊\n4. 確認預約",
    type: "text",
    category: "常見問題",
    createdAt: "2026-04-15"
  },
  {
    id: "4",
    title: "常見問題 - 取消預約",
    content: "預約前 24 小時可免費取消。請透過 LINE 或電話聯絡我們。",
    type: "text",
    category: "常見問題",
    createdAt: "2026-04-15"
  }
];

export default function KnowledgeBase() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(defaultKnowledge);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    type: "text" as const,
    category: ""
  });

  const handleAddItem = () => {
    if (newItem.title && newItem.content) {
      const item: KnowledgeItem = {
        id: Date.now().toString(),
        title: newItem.title,
        content: newItem.content,
        type: newItem.type,
        category: newItem.category || "其他",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setKnowledgeItems([...knowledgeItems, item]);
      setNewItem({ title: "", content: "", type: "text", category: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id));
  };

  const categories = Array.from(new Set(knowledgeItems.map(item => item.category)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4" />;
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "link":
        return <Link2 className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0 z-40">
        <div className="container px-4 lg:px-0 py-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              知識庫配置
            </h1>
          </div>
          <p className="text-gray-600">編輯和管理 AI 客服的知識內容</p>
        </div>
      </header>

      <main className="container px-4 lg:px-0 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">總知識項目</p>
              <p className="text-3xl font-bold text-blue-600">{knowledgeItems.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">分類數量</p>
              <p className="text-3xl font-bold text-purple-600">{categories.length}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 mb-1">最後更新</p>
              <p className="text-sm font-semibold text-gray-800">{new Date().toLocaleDateString('zh-TW')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Item Button */}
        <div className="mb-8">
          {!showAddForm ? (
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              新增知識項目
            </Button>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>新增知識項目</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">標題</label>
                  <Input
                    placeholder="輸入標題"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">分類</label>
                  <Input
                    placeholder="輸入分類（如：基本資訊、常見問題）"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">內容</label>
                  <textarea
                    placeholder="輸入內容"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={newItem.content}
                    onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    onClick={handleAddItem}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    保存
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddForm(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Knowledge Items by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeItems
                .filter(item => item.category === category)
                .map((item) => (
                  <Card key={item.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              {item.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-3 whitespace-pre-wrap">
                        {item.content}
                      </p>
                      <p className="text-xs text-gray-500">建立於：{item.createdAt}</p>
                      <div className="flex gap-2 pt-2 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setEditingId(item.id)}
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          編輯
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          刪除
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}

        {/* Next Step Button */}
        <Card className="mt-12 border-0 shadow-xl bg-gradient-to-r from-blue-50 to-blue-100/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              知識庫配置完成！
            </CardTitle>
            <CardDescription>
              您已成功配置知識庫。現在可以進行 API 整合設定。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/api-integration">
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                前往 API 整合設定
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
