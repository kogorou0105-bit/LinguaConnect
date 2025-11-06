import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PrivacySettings = ({ settings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSettings, setEditingSettings] = useState(settings);

  const privacyOptions = [
    {
      key: "profileVisibility",
      title: "个人资料可见性",
      description: "控制谁可以查看你的完整个人资料",
      options: [
        { value: "public", label: "所有人", icon: "Globe" },
        { value: "friends", label: "仅好友", icon: "Users" },
        { value: "private", label: "仅自己", icon: "Lock" },
      ],
    },
    {
      key: "contactInfo",
      title: "联系方式显示",
      description: "选择在个人资料中显示的联系信息",
      options: [
        { value: "all", label: "显示全部", icon: "Eye" },
        { value: "limited", label: "仅显示用户名", icon: "EyeOff" },
        { value: "none", label: "不显示", icon: "X" },
      ],
    },
    {
      key: "onlineStatus",
      title: "在线状态",
      description: "是否向其他用户显示你的在线状态",
      options: [
        { value: "visible", label: "显示在线状态", icon: "Wifi" },
        { value: "hidden", label: "隐藏在线状态", icon: "WifiOff" },
      ],
    },
    {
      key: "messageRequests",
      title: "消息请求",
      description: "控制谁可以向你发送消息",
      options: [
        { value: "everyone", label: "所有人", icon: "MessageCircle" },
        { value: "friends", label: "仅好友", icon: "UserCheck" },
        { value: "none", label: "不接受消息", icon: "MessageCircleOff" },
      ],
    },
  ];

  const toggleOptions = [
    {
      key: "showLearningProgress",
      title: "显示学习进度",
      description: "在个人资料中显示语言学习进度和成就",
    },
    {
      key: "allowFriendRequests",
      title: "接受好友请求",
      description: "允许其他用户向你发送好友请求",
    },
    {
      key: "showActivity",
      title: "显示活动状态",
      description: "在好友动态中显示你的学习活动",
    },
    {
      key: "emailNotifications",
      title: "邮件通知",
      description: "接收重要更新和消息的邮件通知",
    },
    {
      key: "pushNotifications",
      title: "推送通知",
      description: "接收实时消息和活动的推送通知",
    },
  ];

  const handleSave = () => {
    onUpdate(editingSettings);
    setIsEditing(false);
  };

  const updateSetting = (key, value) => {
    setEditingSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleSetting = (key) => {
    setEditingSettings((prev) => ({
      ...prev,
      [key]: !prev?.[key],
    }));
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Shield" className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">隐私设置</h2>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit2"
            onClick={() => setIsEditing(true)}
          >
            编辑
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              保存
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingSettings(settings);
                setIsEditing(false);
              }}
            >
              取消
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Privacy Options */}
        {privacyOptions?.map((option) => (
          <div key={option?.key} className="space-y-3">
            <div>
              <h3 className="font-medium text-foreground">{option?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option?.description}
              </p>
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {option?.options?.map((opt) => (
                  <button
                    key={opt?.value}
                    onClick={() => updateSetting(option?.key, opt?.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      editingSettings?.[option?.key] === opt?.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name={opt?.icon} size={16} />
                    <span className="text-sm">{opt?.label}</span>
                    {editingSettings?.[option?.key] === opt?.value && (
                      <Icon name="Check" size={14} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                {(() => {
                  const selectedOption = option?.options?.find(
                    (opt) => opt?.value === settings?.[option?.key]
                  );
                  return selectedOption ? (
                    <>
                      <Icon
                        name={selectedOption?.icon}
                        size={16}
                        className="text-primary"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {selectedOption?.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      未设置
                    </span>
                  );
                })()}
              </div>
            )}
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Toggle Options */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">通知和显示设置</h3>
          {toggleOptions?.map((option) => (
            <div
              key={option?.key}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium text-foreground">
                  {option?.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {option?.description}
                </div>
              </div>
              {isEditing ? (
                <button
                  onClick={() => toggleSetting(option?.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    editingSettings?.[option?.key] ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingSettings?.[option?.key]
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              ) : (
                <div
                  className={`flex items-center gap-2 ${
                    settings?.[option?.key]
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon
                    name={settings?.[option?.key] ? "Check" : "X"}
                    size={16}
                  />
                  <span className="text-sm">
                    {settings?.[option?.key] ? "开启" : "关闭"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-cultural-trust/10 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon
              name="Info"
              size={16}
              className="text-cultural-bridge mt-0.5"
            />
            <div>
              <h4 className="font-medium text-cultural-bridge mb-1">
                隐私保护提醒
              </h4>
              <p className="text-sm text-muted-foreground">
                我们致力于保护你的隐私安全。所有个人信息都经过加密处理，不会与第三方分享。
                你可以随时调整这些设置来控制信息的可见性。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
