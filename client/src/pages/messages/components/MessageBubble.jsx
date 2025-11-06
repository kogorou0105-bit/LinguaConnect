import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const MessageBubble = ({
  message,
  isOwn,
  onReply,
  onTranslate,
  onBookmark,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedText, setTranslatedText] = useState("");

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleTranslate = () => {
    if (!isTranslated) {
      // Mock translation
      setTranslatedText(message?.translation || "这是翻译后的文本内容");
      setIsTranslated(true);
    } else {
      setIsTranslated(false);
    }
    onTranslate?.(message?.id);
  };

  const renderMessageContent = () => {
    switch (message?.type) {
      case "text":
        return (
          <div>
            <p className="text-sm leading-relaxed">{message?.content}</p>
            {isTranslated && (
              <div className="mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center space-x-1 mb-1">
                  <Icon
                    name="Languages"
                    size={12}
                    className="text-cultural-bridge"
                  />
                  <span className="text-xs text-cultural-bridge font-medium">
                    翻译
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {translatedText}
                </p>
              </div>
            )}
          </div>
        );

      case "voice":
        return (
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName={message?.isPlaying ? "Pause" : "Play"}
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${message?.progress || 0}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {message?.duration}
                </span>
              </div>
              {message?.transcription && (
                <p className="text-xs text-muted-foreground italic">
                  "{message?.transcription}"
                </p>
              )}
            </div>
          </div>
        );

      case "image":
        return (
          <div>
            <div className="rounded-lg overflow-hidden mb-2">
              <Image
                src={message?.imageUrl}
                alt={message?.imageAlt}
                className="w-full max-w-xs h-auto"
              />
            </div>
            {message?.caption && <p className="text-sm">{message?.caption}</p>}
          </div>
        );

      case "file":
        return (
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {message?.fileName}
              </p>
              <p className="text-xs text-muted-foreground">
                {message?.fileSize}
              </p>
            </div>
            <Button variant="ghost" size="sm" iconName="Download" />
          </div>
        );

      case "system":
        return (
          <div className="text-center">
            <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full inline-block">
              {message?.content}
            </p>
          </div>
        );

      default:
        return <p className="text-sm">{message?.content}</p>;
    }
  };

  if (message?.type === "system") {
    return (
      <div className="flex justify-center my-4">{renderMessageContent()}</div>
    );
  }

  return (
    <div
      className={`flex items-end space-x-2 mb-4 group ${
        isOwn ? "flex-row-reverse space-x-reverse" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      {!isOwn && (
        <Image
          src={message?.avatar}
          alt={message?.avatarAlt}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
      )}
      {/* Message Content */}
      <div
        className={`flex flex-col max-w-xs lg:max-w-md ${
          isOwn ? "items-end" : "items-start"
        }`}
      >
        {/* Sender Name */}
        {!isOwn && (
          <span className="text-xs text-muted-foreground mb-1 px-1">
            {message?.sender}
          </span>
        )}

        {/* Message Bubble */}
        <div
          className={`relative px-4 py-2 rounded-2xl ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md"
          }`}
        >
          {renderMessageContent()}

          {/* Message Status */}
          {isOwn && (
            <div className="flex items-center justify-end space-x-1 mt-1">
              <span className="text-xs opacity-70">
                {formatTime(message?.timestamp)}
              </span>
              {message?.status === "sent" && (
                <Icon name="Check" size={12} className="opacity-70" />
              )}
              {message?.status === "delivered" && (
                <Icon name="CheckCheck" size={12} className="opacity-70" />
              )}
              {message?.status === "read" && (
                <Icon
                  name="CheckCheck"
                  size={12}
                  className="text-cultural-bridge"
                />
              )}
            </div>
          )}

          {!isOwn && (
            <span className="text-xs opacity-70 mt-1 block">
              {formatTime(message?.timestamp)}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {showActions && message?.type !== "system" && (
          <div
            className={`flex items-center space-x-1 mt-1 transition-opacity duration-200 ${
              isOwn ? "flex-row-reverse" : ""
            }`}
          >
            <Button
              variant="ghost"
              size="xs"
              iconName="Reply"
              onClick={() => onReply?.(message)}
              className="opacity-0 group-hover:opacity-100"
            />
            {message?.type === "text" && (
              <Button
                variant="ghost"
                size="xs"
                iconName="Languages"
                onClick={handleTranslate}
                className={`opacity-0 group-hover:opacity-100 ${
                  isTranslated ? "text-cultural-bridge" : ""
                }`}
              />
            )}
            <Button
              variant="ghost"
              size="xs"
              iconName={message?.isBookmarked ? "BookmarkCheck" : "Bookmark"}
              onClick={() => onBookmark?.(message)}
              className={`opacity-0 group-hover:opacity-100 ${
                message?.isBookmarked ? "text-cultural-cta" : ""
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
