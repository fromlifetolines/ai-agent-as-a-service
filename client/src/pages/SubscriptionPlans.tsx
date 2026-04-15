import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function SubscriptionPlans() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currency: "TWD",
    billingCycle: "monthly",
    conversationLimit: "",
    knowledgeBaseLimit: "",
    features: "",
    displayOrder: "0",
  });

  // Fetch all plans
  const { data: plans = [], isLoading, refetch } = trpc.subscription.getAllPlans.useQuery();

  // Create plan mutation
  const createPlanMutation = trpc.subscription.createPlan.useMutation({
    onSuccess: () => {
      refetch();
      setIsCreateDialogOpen(false);
      resetForm();
    },
  });

  // Update plan mutation
  const updatePlanMutation = trpc.subscription.updatePlan.useMutation({
    onSuccess: () => {
      refetch();
      setIsEditDialogOpen(false);
      resetForm();
    },
  });

  // Delete plan mutation
  const deletePlanMutation = trpc.subscription.deletePlan.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      currency: "TWD",
      billingCycle: "monthly",
      conversationLimit: "",
      knowledgeBaseLimit: "",
      features: "",
      displayOrder: "0",
    });
    setSelectedPlan(null);
  };

  const handleCreatePlan = async () => {
    if (!formData.name || !formData.price) {
      alert("請填入方案名稱和價格");
      return;
    }

    await createPlanMutation.mutateAsync({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      currency: formData.currency,
      billingCycle: formData.billingCycle as "monthly" | "yearly",
      conversationLimit: formData.conversationLimit ? parseInt(formData.conversationLimit) : undefined,
      knowledgeBaseLimit: formData.knowledgeBaseLimit ? parseInt(formData.knowledgeBaseLimit) : undefined,
      features: formData.features ? formData.features.split("\n").filter((f) => f.trim()) : undefined,
      displayOrder: parseInt(formData.displayOrder),
    });
  };

  const handleEditPlan = async () => {
    if (!selectedPlan) return;

    await updatePlanMutation.mutateAsync({
      id: selectedPlan.id,
      name: formData.name || undefined,
      description: formData.description || undefined,
      price: formData.price || undefined,
      currency: formData.currency || undefined,
      billingCycle: (formData.billingCycle as "monthly" | "yearly") || undefined,
      conversationLimit: formData.conversationLimit ? parseInt(formData.conversationLimit) : undefined,
      knowledgeBaseLimit: formData.knowledgeBaseLimit ? parseInt(formData.knowledgeBaseLimit) : undefined,
      features: formData.features ? formData.features.split("\n").filter((f) => f.trim()) : undefined,
      displayOrder: parseInt(formData.displayOrder),
    });
  };

  const openEditDialog = (plan: any) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || "",
      price: plan.price,
      currency: plan.currency,
      billingCycle: plan.billingCycle,
      conversationLimit: plan.conversationLimit?.toString() || "",
      knowledgeBaseLimit: plan.knowledgeBaseLimit?.toString() || "",
      features: plan.features?.join("\n") || "",
      displayOrder: plan.displayOrder?.toString() || "0",
    });
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
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
          <h1 className="text-2xl lg:text-3xl font-bold">訂閱方案管理</h1>
          <p className="text-gray-600 mt-1">管理和編輯所有訂閱方案</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              新增方案
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>新增訂閱方案</DialogTitle>
              <DialogDescription>建立新的訂閱方案</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>方案名稱 *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="例如：基礎版"
                  />
                </div>
                <div>
                  <Label>價格 (TWD) *</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="例如：2990"
                  />
                </div>
              </div>

              <div>
                <Label>描述</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="例如：適合初期試用"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>對話次數限制</Label>
                  <Input
                    type="number"
                    value={formData.conversationLimit}
                    onChange={(e) => setFormData({ ...formData, conversationLimit: e.target.value })}
                    placeholder="例如：1000"
                  />
                </div>
                <div>
                  <Label>知識庫數量限制</Label>
                  <Input
                    type="number"
                    value={formData.knowledgeBaseLimit}
                    onChange={(e) => setFormData({ ...formData, knowledgeBaseLimit: e.target.value })}
                    placeholder="例如：1"
                  />
                </div>
              </div>

              <div>
                <Label>功能列表 (每行一個)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="例如：1,000 次對話/月&#10;1 個知識庫&#10;基礎分析"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>計費周期</Label>
                  <Select value={formData.billingCycle} onValueChange={(value) => setFormData({ ...formData, billingCycle: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">月付</SelectItem>
                      <SelectItem value="yearly">年付</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>顯示順序</Label>
                  <Input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleCreatePlan} disabled={createPlanMutation.isPending}>
                  {createPlanMutation.isPending ? "建立中..." : "建立方案"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan: any) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${plan.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                  {plan.isActive ? "啟用" : "停用"}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-3xl font-bold">NT${plan.price}</p>
                <p className="text-sm text-gray-600">/{plan.billingCycle === "monthly" ? "月" : "年"}</p>
              </div>

              {plan.features && (
                <div>
                  <p className="text-sm font-semibold mb-2">功能：</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(plan)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  編輯
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    if (confirm("確定要刪除此方案嗎？")) {
                      deletePlanMutation.mutate({ id: plan.id });
                    }
                  }}
                  disabled={deletePlanMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  刪除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>編輯訂閱方案</DialogTitle>
            <DialogDescription>修改方案詳細資訊</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>方案名稱</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>價格 (TWD)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>描述</Label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>對話次數限制</Label>
                <Input
                  type="number"
                  value={formData.conversationLimit}
                  onChange={(e) => setFormData({ ...formData, conversationLimit: e.target.value })}
                />
              </div>
              <div>
                <Label>知識庫數量限制</Label>
                <Input
                  type="number"
                  value={formData.knowledgeBaseLimit}
                  onChange={(e) => setFormData({ ...formData, knowledgeBaseLimit: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label>功能列表 (每行一個)</Label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleEditPlan} disabled={updatePlanMutation.isPending}>
                {updatePlanMutation.isPending ? "更新中..." : "更新方案"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
