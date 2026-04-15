import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, AlertCircle, Info, TrendingUp, CreditCard } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Notifications() {
  const [selectedTab, setSelectedTab] = useState<"all" | "unread">("all");

  // Fetch notifications
  const { data: notificationsData, isLoading, refetch } = trpc.notification.getNotifications.useQuery({
    limit: 50,
    offset: 0,
  });

  // Fetch unread count
  const { data: unreadData } = trpc.notification.getUnreadCount.useQuery();

  // Mark as read mutation
  const markAsReadMutation = trpc.notification.markAsRead.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = trpc.notification.markAllAsRead.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const notifications = notificationsData?.notifications || [];
  const unreadCount = unreadData?.unreadCount || 0;

  const filteredNotifications =
    selectedTab === "unread" ? notifications.filter((n: any) => !n.isRead) : notifications;

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
          <h1 className="text-2xl lg:text-3xl font-bold">通知中心</h1>
          <p className="text-gray-600 mt-1">管理您的訂閱、付款和帳戶通知</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={() => markAllAsReadMutation.mutate()} variant="outline">
            全部標記為已讀
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setSelectedTab("all")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            selectedTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          全部通知 ({notifications.length})
        </button>
        <button
          onClick={() => setSelectedTab("unread")}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            selectedTab === "unread"
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          未讀 ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">
                {selectedTab === "unread" ? "沒有未讀通知" : "沒有通知"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification: any) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md hover:shadow-lg transition-shadow duration-300 ${
                !notification.isRead ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => {
                if (!notification.isRead) {
                  markAsReadMutation.mutate({ id: notification.id });
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.content}</p>
                      </div>
                      <Badge className={getNotificationBadgeColor(notification.type)}>
                        {getNotificationTypeLabel(notification.type)}
                      </Badge>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString("zh-TW")}
                      </p>
                      {!notification.isRead && (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                          <span className="text-xs text-primary font-medium">未讀</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
