import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ConversationHeader = ({
  conversation,
  onStartVoiceCall,
  onStartVideoCall,
  onToggleInfo,
  onSearchMessages,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-16 border-b border-border bg-background">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Icon name="MessageCircle" size={24} />
          <span className="font-medium">选择对话开始聊天</span>
        </div>
      </div>
    );
  }

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearchMessages?.(searchQuery);
    }
  };

  return (
    <div className="border-b border-border bg-background">
      {/* Main Header */}
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section - User Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            {conversation?.isGroup ? (
              <div className="w-10 h-10 bg-cultural-gradient rounded-full flex items-center justify-center">
                <Icon name="Users" size={20} className="text-white" />
              </div>
            ) : (
              <Image
                src={conversation?.avatar}
                alt={conversation?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            {conversation?.isOnline && !conversation?.isGroup && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-foreground truncate">
                {conversation?.name}
              </h2>
              {conversation?.isVerified && (
                <Icon
                  name="BadgeCheck"
                  size={16}
                  className="text-cultural-bridge flex-shrink-0"
                />
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {conversation?.isGroup ? (
                <span>{conversation?.memberCount} 位成员</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>
                    {conversation?.isOnline
                      ? "在线"
                      : `最后活跃 ${conversation?.lastSeen}`}
                  </span>
                  {conversation?.isTyping && (
                    <>
                      <span>•</span>
                      <span className="text-cultural-bridge">正在输入...</span>
                    </>
                  )}
                </div>
              )}

              {conversation?.languages && (
                <div className="flex items-center space-x-1">
                  <span>•</span>
                  {conversation?.languages?.map((lang, index) => (
                    <span key={index} className="text-cultural-bridge">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Search"
            onClick={() => setShowSearch(!showSearch)}
            className={showSearch ? "text-primary" : ""}
          />

          {/* Voice Call */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            onClick={onStartVoiceCall}
            className="text-cultural-bridge hover:bg-cultural-bridge/10"
          />

          {/* Video Call */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Video"
            onClick={onStartVideoCall}
            className="text-cultural-bridge hover:bg-cultural-bridge/10"
          />

          {/* Info Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Info"
            onClick={onToggleInfo}
          />

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium z-50">
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Icon name="Pin" size={16} />
                    <span>置顶对话</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Icon name="VolumeX" size={16} />
                    <span>静音通知</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    <Icon name="Archive" size={16} />
                    <span>归档对话</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                    <Icon name="Trash2" size={16} />
                    <span>删除对话</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Search Bar */}
      {showSearch && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="搜索消息内容..."
              className="w-full px-4 py-2 pl-10 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
            />
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </form>
        </div>
      )}
      {/* Connection Status */}
      {conversation?.connectionQuality && (
        <div className="px-4 pb-2">
          <div className="flex items-center space-x-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                conversation?.connectionQuality === "excellent"
                  ? "bg-success"
                  : conversation?.connectionQuality === "good"
                  ? "bg-warning"
                  : "bg-destructive"
              }`}
            ></div>
            <span className="text-muted-foreground">
              连接质量:{" "}
              {conversation?.connectionQuality === "excellent"
                ? "优秀"
                : conversation?.connectionQuality === "good"
                ? "良好"
                : "较差"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHeader;
