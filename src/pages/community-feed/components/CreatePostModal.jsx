import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [content, setContent] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [hashtags, setHashtags] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const languages = [
    { id: "zh", name: "中文", flag: "🇨🇳" },
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "ja", name: "日本語", flag: "🇯🇵" },
    { id: "ko", name: "한국어", flag: "🇰🇷" },
    { id: "fr", name: "Français", flag: "🇫🇷" },
    { id: "es", name: "Español", flag: "🇪🇸" },
  ];

  const handleLanguageToggle = (langId) => {
    setSelectedLanguages((prev) =>
      prev?.includes(langId)
        ? prev?.filter((id) => id !== langId)
        : [...prev, langId]
    );
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!content?.trim()) return;

    const postData = {
      content: content?.trim(),
      languages: selectedLanguages,
      hashtags: hashtags?.split(" ")?.filter((tag) => tag?.startsWith("#")),
      media: mediaFiles,
    };

    onCreatePost(postData);

    // Reset form
    setContent("");
    setSelectedLanguages([]);
    setHashtags("");
    setMediaFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">创建动态</h2>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="p-4 space-y-4">
          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e?.target?.value)}
              placeholder="分享你的语言学习心得或文化体验..."
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">
                {content?.length}/500
              </span>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              选择相关语言
            </label>
            <div className="flex flex-wrap gap-2">
              {languages?.map((lang) => (
                <button
                  key={lang?.id}
                  onClick={() => handleLanguageToggle(lang?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedLanguages?.includes(lang?.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  <span>{lang?.flag}</span>
                  <span className="text-sm">{lang?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <Input
              label="话题标签"
              value={hashtags}
              onChange={(e) => setHashtags(e?.target?.value)}
              placeholder="#语言学习 #文化交流 #日常分享"
              description="用空格分隔多个标签"
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              添加图片或视频
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon
                  name="Upload"
                  size={32}
                  className="text-muted-foreground mb-2"
                />
                <p className="text-sm text-muted-foreground text-center">
                  点击上传图片或视频
                  <br />
                  <span className="text-xs">支持 JPG, PNG, MP4 格式</span>
                </p>
              </label>
            </div>

            {/* Media Preview */}
            {mediaFiles?.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {mediaFiles?.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Icon
                        name="Image"
                        size={24}
                        className="text-muted-foreground"
                      />
                    </div>
                    <button
                      onClick={() => removeMedia(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="X" size={12} />
                    </button>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {file?.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Settings */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">公开发布</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              所有用户都可以看到这条动态
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" iconName="Smile">
              表情
            </Button>
            <Button variant="ghost" size="sm" iconName="MapPin">
              位置
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={!content?.trim()}>
              发布动态
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
