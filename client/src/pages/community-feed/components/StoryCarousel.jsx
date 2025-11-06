import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const StoryCarousel = ({ stories, onAddStory, onViewStory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(stories?.length - 4, prev + 1));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">文化动态</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={scrollRight}
            disabled={currentIndex >= stories?.length - 4}
          />
        </div>
      </div>
      <div className="flex space-x-4 overflow-hidden">
        {/* Add Story Button */}
        <div className="flex-flex-shrink-0">
          <button
            onClick={onAddStory}
            className="flex flex-col items-center space-y-2 group"
          >
            <div className="w-16 h-16 border-2 border-dashed border-cultural-bridge rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
              <Icon
                name="Plus"
                size={24}
                className="text-cultural-bridge group-hover:text-primary"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              添加动态
            </span>
          </button>
        </div>

        {/* Stories */}
        {stories?.slice(currentIndex, currentIndex + 4)?.map((story) => (
          <div key={story?.id} className="flex-flex-shrink-0">
            <button
              onClick={() => onViewStory(story?.id)}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-full p-0.5 ${
                    story?.isViewed
                      ? "bg-gray-300"
                      : "bg-gradient-to-tr from-cultural-warm to-cultural-bridge"
                  }`}
                >
                  <Image
                    src={story?.user?.avatar}
                    alt={story?.user?.avatarAlt}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                {story?.isLive && (
                  <div className="absolute -bottom-1 -right-1 bg-cultural-warm text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    直播
                  </div>
                )}
              </div>
              <span className="text-xs text-foreground font-medium max-w-16 truncate">
                {story?.user?.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryCarousel;
