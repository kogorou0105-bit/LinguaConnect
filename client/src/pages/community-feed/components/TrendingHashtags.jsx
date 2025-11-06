import React from "react";
import Icon from "../../../components/AppIcon";

const TrendingHashtags = ({ hashtags, onHashtagClick }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="TrendingUp" size={20} className="text-cultural-warm" />
        <h2 className="text-lg font-semibold text-foreground">热门话题</h2>
      </div>
      <div className="space-y-3">
        {hashtags?.map((hashtag, index) => (
          <button
            key={hashtag?.tag}
            onClick={() => onHashtagClick(hashtag?.tag)}
            className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-cultural-energy/20 rounded-full">
                <span className="text-sm font-bold text-cultural-cta">
                  {index + 1}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  #{hashtag?.tag}
                </p>
                <p className="text-sm text-muted-foreground">
                  {hashtag?.posts?.toLocaleString()} 条动态
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center space-x-1 ${
                  hashtag?.trend === "up"
                    ? "text-success"
                    : hashtag?.trend === "down"
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                <Icon
                  name={
                    hashtag?.trend === "up"
                      ? "TrendingUp"
                      : hashtag?.trend === "down"
                      ? "TrendingDown"
                      : "Minus"
                  }
                  size={16}
                />
                <span className="text-xs font-medium">
                  {hashtag?.growth > 0 ? "+" : ""}
                  {hashtag?.growth}%
                </span>
              </div>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground group-hover:text-foreground"
              />
            </div>
          </button>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-primary text-sm font-medium hover:underline">
        查看更多话题
      </button>
    </div>
  );
};

export default TrendingHashtags;
