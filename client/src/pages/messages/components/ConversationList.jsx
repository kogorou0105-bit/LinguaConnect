import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  searchQuery,
}) => {
  const [filter, setFilter] = useState("all");

  const filteredConversations = conversations?.filter((conv) => {
    const matchesSearch =
      conv?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      conv?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "unread") return matchesSearch && conv?.unreadCount > 0;
    if (filter === "online") return matchesSearch && conv?.isOnline;
    if (filter === "groups") return matchesSearch && conv?.isGroup;

    return matchesSearch;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? "now" : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime?.toLocaleDateString("zh-CN", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const filterOptions = [
    { key: "all", label: "全部", icon: "MessageCircle" },
    { key: "unread", label: "未读", icon: "Circle" },
    { key: "online", label: "在线", icon: "Users" },
    { key: "groups", label: "群组", icon: "Users2" },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 p-4 border-b border-border">
        {filterOptions?.map((option) => (
          <button
            key={option?.key}
            onClick={() => setFilter(option?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === option?.key
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon name={option?.icon} size={16} />
            <span>{option?.label}</span>
          </button>
        ))}
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Icon
                name="MessageCircle"
                size={24}
                className="text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              没有找到对话
            </h3>
            <p className="text-muted-foreground text-sm">
              {searchQuery ? "尝试搜索其他关键词" : "开始新的对话来练习语言"}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted ${
                  selectedConversation?.id === conversation?.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  {conversation?.isGroup ? (
                    <div className="w-12 h-12 bg-cultural-gradient rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-white" />
                    </div>
                  ) : (
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.avatarAlt}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  {conversation?.isOnline && !conversation?.isGroup && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-background rounded-full"></div>
                  )}
                  {conversation?.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-cultural-cta text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                      {conversation?.unreadCount > 99
                        ? "99+"
                        : conversation?.unreadCount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {conversation?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatTime(conversation?.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {conversation?.lastMessageType === "voice" && (
                      <Icon
                        name="Mic"
                        size={14}
                        className="text-muted-foreground flex-shrink-0"
                      />
                    )}
                    {conversation?.lastMessageType === "image" && (
                      <Icon
                        name="Image"
                        size={14}
                        className="text-muted-foreground flex-shrink-0"
                      />
                    )}
                    {conversation?.lastMessageType === "file" && (
                      <Icon
                        name="Paperclip"
                        size={14}
                        className="text-muted-foreground flex-shrink-0"
                      />
                    )}
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation?.lastMessage}
                    </p>
                  </div>

                  {/* Language Tags */}
                  {conversation?.languages && (
                    <div className="flex items-center space-x-1 mt-2">
                      {conversation?.languages?.map((lang, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cultural-trust/20 text-cultural-bridge text-xs rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Indicators */}
                <div className="flex flex-col items-end space-y-1">
                  {conversation?.isPinned && (
                    <Icon name="Pin" size={14} className="text-cultural-cta" />
                  )}
                  {conversation?.isMuted && (
                    <Icon
                      name="VolumeX"
                      size={14}
                      className="text-muted-foreground"
                    />
                  )}
                  {conversation?.hasTranslation && (
                    <Icon
                      name="Languages"
                      size={14}
                      className="text-cultural-bridge"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
