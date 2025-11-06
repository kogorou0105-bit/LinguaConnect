import React from "react";

import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const RoomCard = ({ room, onJoinRoom }) => {
  const getLanguageFlag = (language) => {
    const flags = {
      English: "🇺🇸",
      Chinese: "🇨🇳",
      Spanish: "🇪🇸",
      French: "🇫🇷",
      German: "🇩🇪",
      Japanese: "🇯🇵",
      Korean: "🇰🇷",
      Italian: "🇮🇹",
      Portuguese: "🇵🇹",
      Russian: "🇷🇺",
    };
    return flags?.[language] || "🌍";
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-error/10 text-error border-error/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getCapacityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-error";
    if (percentage >= 70) return "text-warning";
    return "text-success";
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-cultural transition-all duration-300 group">
      {/* Room Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-cultural-gradient rounded-lg flex items-center justify-center text-white text-xl">
              {getLanguageFlag(room?.language)}
            </div>
            {room?.isLive && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full cultural-pulse"></div>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {room?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {room?.language} Practice
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(
              room?.level
            )}`}
          >
            {room?.level}
          </span>
          {room?.isFeatured && (
            <div className="w-6 h-6 bg-cultural-energy rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-white" />
            </div>
          )}
        </div>
      </div>
      {/* Room Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {room?.description}
      </p>
      {/* Room Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon
              name="Users"
              size={16}
              className={getCapacityColor(
                room?.currentParticipants,
                room?.maxParticipants
              )}
            />
            <span
              className={`text-sm font-medium ${getCapacityColor(
                room?.currentParticipants,
                room?.maxParticipants
              )}`}
            >
              {room?.currentParticipants}/{room?.maxParticipants}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {room?.duration}
            </span>
          </div>
        </div>

        {room?.moderator && (
          <div className="flex items-center space-x-2">
            <Image
              src={room?.moderator?.avatar}
              alt={room?.moderator?.avatarAlt}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-muted-foreground">
              Hosted by {room?.moderator?.name}
            </span>
          </div>
        )}
      </div>
      {/* Participants Preview */}
      {room?.participants && room?.participants?.length > 0 && (
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex -space-x-2">
            {room?.participants?.slice(0, 4)?.map((participant) => (
              <Image
                key={participant?.id}
                src={participant?.avatar}
                alt={participant?.avatarAlt}
                className="w-8 h-8 rounded-full border-2 border-background"
              />
            ))}
            {room?.participants?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{room?.participants?.length - 4}
                </span>
              </div>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {room?.participants?.length} active
          </span>
        </div>
      )}
      {/* Room Tags */}
      {room?.tags && room?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {room?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {room?.tags?.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{room?.tags?.length - 3} more
            </span>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Mic"
          iconPosition="left"
          onClick={() => onJoinRoom(room?.id)}
          disabled={room?.currentParticipants >= room?.maxParticipants}
          className="flex-1"
        >
          {room?.currentParticipants >= room?.maxParticipants
            ? "Room Full"
            : "Join Room"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          iconName="Bookmark"
          className="px-3"
        />

        <Button variant="ghost" size="sm" iconName="Share" className="px-3" />
      </div>
      {/* Room Features */}
      {room?.features && room?.features?.length > 0 && (
        <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-border">
          {room?.features?.includes("screen-sharing") && (
            <div className="flex items-center space-x-1">
              <Icon
                name="Monitor"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">
                Screen Share
              </span>
            </div>
          )}
          {room?.features?.includes("breakout-rooms") && (
            <div className="flex items-center space-x-1">
              <Icon name="Users2" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Breakout</span>
            </div>
          )}
          {room?.features?.includes("noise-suppression") && (
            <div className="flex items-center space-x-1">
              <Icon
                name="Volume2"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">Clear Audio</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomCard;
