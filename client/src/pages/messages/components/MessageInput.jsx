import React, { useState, useRef } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const MessageInput = ({
  onSendMessage,
  onStartVoiceCall,
  onStartVideoCall,
  disabled,
}) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachmentMenu, setAttachmentMenu] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "👏",
    "🎉",
    "🔥",
    "💯",
    "🤔",
    "😍",
    "🙏",
    "✨",
  ];

  const handleSendMessage = () => {
    if (message?.trim()) {
      onSendMessage({
        type: "text",
        content: message?.trim(),
        timestamp: new Date(),
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === "Enter" && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Mock voice recording
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage({
          type: "voice",
          duration: "0:05",
          transcription: "这是语音消息的转录文本",
          timestamp: new Date(),
        });
      }, 2000);
    }
  };

  const handleFileUpload = (type) => {
    if (type === "image") {
      imageInputRef?.current?.click();
    } else {
      fileInputRef?.current?.click();
    }
    setAttachmentMenu(false);
  };

  const handleFileSelect = (e, type) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (type === "image") {
        onSendMessage({
          type: "image",
          imageUrl:
            "https://images.unsplash.com/photo-1723772501154-f02bed550f4f",
          imageAlt:
            "Shared image showing mountain landscape with clear blue sky",
          caption: `分享了图片: ${file?.name}`,
          timestamp: new Date(),
        });
      } else {
        onSendMessage({
          type: "file",
          fileName: file?.name,
          fileSize: `${(file?.size / 1024 / 1024)?.toFixed(1)} MB`,
          timestamp: new Date(),
        });
      }
    }
  };

  const insertEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Phone"
            onClick={onStartVoiceCall}
            className="text-cultural-bridge hover:bg-cultural-bridge/10"
          >
            语音通话
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Video"
            onClick={onStartVideoCall}
            className="text-cultural-bridge hover:bg-cultural-bridge/10"
          >
            视频通话
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
            <span>对方正在输入...</span>
          </div>
        </div>
      </div>
      {/* Message Input Area */}
      <div className="flex items-end space-x-3">
        {/* Attachment Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="Paperclip"
            onClick={() => setAttachmentMenu(!attachmentMenu)}
            className="flex-shrink-0"
          />

          {attachmentMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-popover border border-border rounded-lg shadow-medium p-2 min-w-40">
              <button
                onClick={() => handleFileUpload("image")}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="Image" size={16} />
                <span>图片</span>
              </button>
              <button
                onClick={() => handleFileUpload("file")}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Icon name="FileText" size={16} />
                <span>文件</span>
              </button>
            </div>
          )}
        </div>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息... (支持实时翻译)"
            disabled={disabled}
            className="w-full px-4 py-3 pr-12 bg-muted border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
            rows="1"
            style={{
              minHeight: "44px",
              maxHeight: "120px",
            }}
          />

          {/* Emoji Button */}
          <div className="absolute right-3 bottom-3">
            <Button
              variant="ghost"
              size="xs"
              iconName="Smile"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-medium p-3">
              <div className="grid grid-cols-6 gap-2">
                {emojis?.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => insertEmoji(emoji)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted rounded-md transition-colors text-lg"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voice/Send Button */}
        {message?.trim() ? (
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            onClick={handleSendMessage}
            disabled={disabled}
            className="flex-shrink-0 bg-primary hover:bg-primary/90"
          />
        ) : (
          <Button
            variant={isRecording ? "destructive" : "ghost"}
            size="sm"
            iconName={isRecording ? "Square" : "Mic"}
            onClick={handleVoiceRecord}
            disabled={disabled}
            className={`flex-shrink-0 ${isRecording ? "cultural-pulse" : ""}`}
          />
        )}
      </div>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-2 mt-3 p-2 bg-destructive/10 rounded-lg">
          <div className="w-2 h-2 bg-destructive rounded-full cultural-pulse"></div>
          <span className="text-sm text-destructive font-medium">
            正在录音...
          </span>
          <span className="text-xs text-muted-foreground">松开发送</span>
        </div>
      )}
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, "file")}
        accept=".pdf,.doc,.docx,.txt,.zip"
      />

      <input
        ref={imageInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFileSelect(e, "image")}
        accept="image/*"
      />
    </div>
  );
};

export default MessageInput;
