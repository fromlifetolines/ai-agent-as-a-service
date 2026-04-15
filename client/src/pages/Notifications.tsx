import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, AlertCircle, Info, TrendingUp, CreditCard, Trash2, Archive } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "subscription_confirmation" | "renewal_reminder" | "expiry_warning" | "plan_upgrade" | "plan_downgrade" | "payment_failed";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Mock 通知資料
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "subscription_confirmation",
    title: "訂閱確認",
    message: "您已成功訂閱 From Life To Lines 專業版方案，14 天免費試用期已開始。",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 分鐘前
    actionUrl: "/dashboard?tab=plans"
  },
  {
    id: "2",
    type: "renewal_reminder",
    title: "續約提醒",
    message: "您的訂閱將在 7 天後到期。請在到期前續約以保持服務不中斷。",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 小時前
    actionUrl: "/dashboard?tab=plans"
  },
  {
    id: "3",
    type: "plan_upgrade",
    title: "方案升級",
    message: "恭喜！您已成功升級至企業版方案，享受無限對話和完整分析功能。",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 天前
    actionUrl: "/dashboard?tab=plans"
  },
  {
    id: "4",
    type: "expiry_warning",
    title: "到期警告",
    message: "您的訂閱將在 3 天後到期。請立即續約以避免服務中斷。",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 天前
    actionUrl: "/dashboard?tab=plans"
  },
  {
    id: "5",
    type: "payment_failed",
    title: "付款失敗",
    message: "您的訂閱續約付款失敗。請更新支付方式以繼續使用服務。",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 天前
    actionUrl: "/dashboard?tab=settings"
  },
  {
    id: "6",
    type: "plan_downgrade",
    title: "方案降級",
    message: "您已降級至基礎版方案。部分功能將受到限制。",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 天前
    actionUrl: "/dashboard?tab=plans"
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedTab, setSelectedTab] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const filteredNotifications = selectedTab === "unread" 
    ? notifications.filter(n => !n.isRead) 
    : notifications;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "subscription_confirmation":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "renewal_reminder":
        return <Bell className="h-5 w-5 text-blue-600" />;
      case "expiry_warning":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "plan_upgrade":
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      case "plan_downgrade":
        return <TrendingUp className="h-5 w-5 text-orange-600" />;
      case "payment_failed":
        return <CreditCard className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case "subscription_confirmation":
        return "bg-green-100 text-green-800";
      case "renewal_reminder":
        return "bg-blue-100 text-blue-800";
      case "expiry_warning":
        return "bg-red-100 text-red-800";
      case "plan_upgrade":
        return "bg-purple-100 text-purple-800";
      case "plan_downgrade":
        return "bg-orange-100 text-orange-800";
      case "payment_failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "subscription_confirmation":
        return "訂閱確認";
      case "renewal_reminder":
        return "續約提醒";
      case "expiry_warning":
        return "到期警告";
      case "plan_upgrade":
        return "方案升級";
      case "plan_downgrade":
        return "方案降級";
      case "payment_failed":
        return "付款失敗";
      default:
        return "通知";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} 分鐘前`;
    if (hours < 24) return `${hours} 小時前`;
    if (days < 7) return `${days} 天前`;
    return date.toLocaleDateString('zh-TW');
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">通知中心</h2>
          <p className="text-sm text-gray-600 mt-1">管理您的訂閱和系統通知</p>
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleMarkAllAsRead}
            className="hover:bg-blue-50"
          >
            標記全部為已讀
          </Button>
        )}
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">總通知數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{notifications.length}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">未讀通知</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{unreadCount}</div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">已讀通知</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{notifications.length - unreadCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* 通知列表 */}
      <Card className="shadow-md">
        <CardHeader className="border-b border-gray-200">
          <Tabs value={selectedTab} onValueChange={(v: any) => setSelectedTab(v)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">全部通知 ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">未讀 ({unreadCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="pt-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">沒有通知</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                    notification.isRead
                      ? "bg-gray-50 border-gray-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <Badge className={`text-xs ${getNotificationBadgeColor(notification.type)}`}>
                          {getNotificationTypeLabel(notification.type)}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{formatTime(notification.createdAt)}</p>
                    </div>

                    <div className="flex-shrink-0 flex gap-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="hover:bg-blue-100"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        className="hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 通知設定 */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>通知設定</CardTitle>
          <CardDescription>自訂您要接收的通知類型</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">訂閱確認通知</p>
              <p className="text-sm text-gray-600">當訂閱成功時接收通知</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">續約提醒通知</p>
              <p className="text-sm text-gray-600">在訂閱到期前 7 天提醒</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">到期警告通知</p>
              <p className="text-sm text-gray-600">在訂閱到期前 3 天警告</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">方案變更通知</p>
              <p className="text-sm text-gray-600">當升級或降級方案時通知</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">付款失敗通知</p>
              <p className="text-sm text-gray-600">當付款失敗時立即通知</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>

          <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
            保存設定
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
