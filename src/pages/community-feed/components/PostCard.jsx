import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [likeCount, setLikeCount] = useState(post?.likes);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    onLike(post?.id, newLikedState);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}小时前`;
    return `${Math.floor(diffInMinutes / 1440)}天前`;
  };

  const shouldTruncate = post?.content?.length > 150;
  const displayContent =
    shouldTruncate && !showFullContent
      ? post?.content?.substring(0, 150) + "..."
      : post?.content;

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4 shadow-soft hover:shadow-medium transition-shadow duration-300">
      {/* User Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={post?.user?.avatar}
              alt={post?.user?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover border-2 border-cultural-bridge/20"
            />
            {post?.user?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">
                {post?.user?.name}
              </h3>
              {post?.user?.isVerified && (
                <Icon name="BadgeCheck" size={16} className="text-primary" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{post?.user?.location}</span>
              <span>•</span>
              <span>{formatTimeAgo(post?.timestamp)}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      {/* Language Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post?.languages?.map((lang, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-cultural-energy/20 text-cultural-cta text-xs font-medium rounded-full"
          >
            {lang}
          </span>
        ))}
      </div>
      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {displayContent}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-primary text-sm font-medium mt-2 hover:underline"
          >
            {showFullContent ? "收起" : "展开"}
          </button>
        )}
      </div>
      {/* Media Content */}
      {post?.media && post?.media?.length > 0 && (
        <div
          className={`mb-4 rounded-lg overflow-hidden ${
            post?.media?.length === 1
              ? "aspect-video"
              : "grid grid-cols-2 gap-2"
          }`}
        >
          {post?.media?.map((media, index) => (
            <div key={index} className="relative group cursor-pointer">
              <Image
                src={media?.url}
                alt={media?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {media?.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Icon
                      name="Play"
                      size={20}
                      className="text-gray-800 ml-1"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Hashtags */}
      {post?.hashtags && post?.hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post?.hashtags?.map((tag, index) => (
            <span
              key={index}
              className="text-primary text-sm hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {/* Engagement Stats */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked
                ? "text-cultural-warm"
                : "text-muted-foreground hover:text-cultural-warm"
            }`}
          >
            <Icon
              name={isLiked ? "Heart" : "Heart"}
              size={20}
              className={isLiked ? "fill-current" : ""}
            />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <button
            onClick={() => onComment(post?.id)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon name="MessageCircle" size={20} />
            <span className="text-sm font-medium">{post?.comments}</span>
          </button>

          <button
            onClick={() => onShare(post?.id)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-cultural-bridge transition-colors"
          >
            <Icon name="Share2" size={20} />
            <span className="text-sm font-medium">{post?.shares}</span>
          </button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          iconName="Bookmark"
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
    </div>
  );
};

export default PostCard;
