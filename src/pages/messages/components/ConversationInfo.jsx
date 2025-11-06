import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ConversationInfo = ({ conversation, onClose, isVisible }) => {
  const [activeTab, setActiveTab] = useState("profile");

  if (!conversation || !isVisible) return null;

  const tabs = [
    { key: "profile", label: "资料", icon: "User" },
    { key: "media", label: "媒体", icon: "Image" },
    { key: "files", label: "文件", icon: "FileText" },
    { key: "settings", label: "设置", icon: "Settings" },
  ];

  const sharedMedia = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1526460603902-b54a2ccf8f1a",
      alt: "Shared photo of mountain landscape with snow-capped peaks",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1590019639866-40d0fd95caf8",
      alt: "Shared photo of traditional Chinese architecture with red pillars",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1585835582181-6b1accea23e0",
      alt: "Shared photo of cherry blossoms in spring garden",
      timestamp: new Date(Date.now() - 259200000),
    },
  ];

  const sharedFiles = [
    {
      id: 1,
      name: "中文学习资料.pdf",
      size: "2.4 MB",
      type: "pdf",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      name: "语法练习.docx",
      size: "856 KB",
      type: "document",
      timestamp: new Date(Date.now() - 172800000),
    },
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* User Profile */}
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Image
            src={conversation?.avatar}
            alt={conversation?.avatarAlt}
            className="w-20 h-20 rounded-full object-cover"
          />

          {conversation?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-background rounded-full"></div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {conversation?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {conversation?.isOnline
            ? "在线"
            : `最后活跃 ${conversation?.lastSeen}`}
        </p>

        {conversation?.languages && (
          <div className="flex justify-center space-x-2 mb-4">
            {conversation?.languages?.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cultural-trust/20 text-cultural-bridge text-sm rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">127</div>
          <div className="text-xs text-muted-foreground">消息</div>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">23</div>
          <div className="text-xs text-muted-foreground">通话</div>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">15</div>
          <div className="text-xs text-muted-foreground">天</div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">学习进度</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">词汇量提升</span>
            <span className="text-foreground font-medium">+47 个词</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-cultural-bridge h-2 rounded-full"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">对话流畅度</span>
            <span className="text-foreground font-medium">85%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-cultural-energy h-2 rounded-full"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button
          variant="outline"
          fullWidth
          iconName="Phone"
          iconPosition="left"
        >
          语音通话
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Video"
          iconPosition="left"
        >
          视频通话
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
        >
          安排学习时间
        </Button>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">共享媒体</h4>
        <span className="text-sm text-muted-foreground">
          {sharedMedia?.length} 项
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {sharedMedia?.map((media) => (
          <div
            key={media?.id}
            className="aspect-square rounded-lg overflow-hidden bg-muted"
          >
            <Image
              src={media?.url}
              alt={media?.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" fullWidth>
        查看全部媒体
      </Button>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">共享文件</h4>
        <span className="text-sm text-muted-foreground">
          {sharedFiles?.length} 个文件
        </span>
      </div>

      <div className="space-y-3">
        {sharedFiles?.map((file) => (
          <div
            key={file?.id}
            className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon
                name={file?.type === "pdf" ? "FileText" : "FileText"}
                size={20}
                className="text-primary"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">
                {file?.name}
              </p>
              <p className="text-xs text-muted-foreground">{file?.size}</p>
            </div>
            <Button variant="ghost" size="sm" iconName="Download" />
          </div>
        ))}
      </div>

      <Button variant="outline" fullWidth>
        查看全部文件
      </Button>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">通知设置</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">消息通知</span>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">通话通知</span>
            <div className="w-10 h-6 bg-muted rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">隐私设置</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="Shield"
            iconPosition="left"
          >
            端到端加密
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Eye"
            iconPosition="left"
          >
            阅读状态
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Clock"
            iconPosition="left"
          >
            在线状态
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="space-y-3">
        <h4 className="font-medium text-destructive">危险操作</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="UserX"
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            屏蔽用户
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Trash2"
            className="text-destructive border-destructive hover:bg-destructive/10"
          >
            删除对话
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-background border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">对话信息</h3>
        <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setActiveTab(tab?.key)}
            className={`flex-1 flex flex-col items-center space-y-1 py-3 text-xs transition-colors ${
              activeTab === tab?.key
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "profile" && renderProfileTab()}
        {activeTab === "media" && renderMediaTab()}
        {activeTab === "files" && renderFilesTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  );
};

export default ConversationInfo;
