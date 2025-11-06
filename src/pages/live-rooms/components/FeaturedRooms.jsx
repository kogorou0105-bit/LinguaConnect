import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const FeaturedRooms = ({ onJoinRoom }) => {
  const featuredRooms = [
    {
      id: "featured-1",
      title: "Global News Discussion",
      description:
        "Discuss current world events and practice expressing opinions in English. Perfect for intermediate to advanced learners.",
      language: "English",
      flag: "🇺🇸",
      level: "Intermediate",
      topic: "Current Events",
      currentParticipants: 18,
      maxParticipants: 25,
      duration: "90 min",
      isLive: true,
      isFeatured: true,
      tags: ["news", "debate", "opinions", "world-events"],
      moderator: {
        id: "mod-1",
        name: "Dr. Emily Johnson",
        title: "Language Expert",
        avatar: "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
        avatarAlt:
          "Professional headshot of middle-aged woman with blonde hair in navy blazer",
      },
      participants: [
        {
          id: "p1",
          avatar:
            "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
          avatarAlt:
            "Professional headshot of Asian man with short black hair in navy suit",
        },
        {
          id: "p2",
          avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
          avatarAlt:
            "Professional headshot of Asian woman with long black hair in white blouse",
        },
        {
          id: "p3",
          avatar:
            "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
          avatarAlt:
            "Professional headshot of young man with brown hair in casual shirt",
        },
      ],

      features: ["screen-sharing", "breakout-rooms", "noise-suppression"],
      backgroundImage:
        "https://images.unsplash.com/photo-1673519451881-6d801cad9040",
      backgroundAlt:
        "Modern conference room with large windows and city skyline view",
    },
    {
      id: "featured-2",
      title: "Chinese Culture & Traditions",
      description:
        "Explore Chinese festivals, customs, and daily life while practicing Mandarin conversation skills.",
      language: "Chinese",
      flag: "🇨🇳",
      level: "Beginner",
      topic: "Culture",
      currentParticipants: 12,
      maxParticipants: 20,
      duration: "60 min",
      isLive: true,
      isFeatured: true,
      tags: ["culture", "traditions", "festivals", "mandarin"],
      moderator: {
        id: "mod-2",
        name: "Li Wei",
        title: "Cultural Ambassador",
        avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
        avatarAlt:
          "Professional headshot of Asian man with glasses in white shirt",
      },
      participants: [
        {
          id: "p4",
          avatar:
            "https://images.unsplash.com/photo-1582903165064-c0f584740d9a",
          avatarAlt:
            "Professional headshot of Hispanic woman with curly brown hair in red blazer",
        },
        {
          id: "p5",
          avatar:
            "https://images.unsplash.com/photo-1609770653328-a4d1dd377970",
          avatarAlt:
            "Professional headshot of young man with beard in casual shirt",
        },
      ],

      features: ["screen-sharing", "chat", "whiteboard"],
      backgroundImage:
        "https://images.unsplash.com/photo-1560477576-b9679a31f910",
      backgroundAlt:
        "Traditional Chinese architecture with red lanterns and pagoda",
    },
  ];

  const getCapacityColor = (current, max) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return "text-error";
    if (percentage >= 70) return "text-warning";
    return "text-success";
  };

  const getLevelColor = (level) => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Featured Rooms
          </h2>
          <p className="text-muted-foreground">
            Curated conversations with expert moderators
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-cultural-energy/20 rounded-full">
            <Icon name="Star" size={14} className="text-cultural-energy" />
            <span className="text-xs font-medium text-cultural-energy">
              Featured
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuredRooms?.map((room) => (
          <div
            key={room?.id}
            className="relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-cultural transition-all duration-300 group"
          >
            {/* Background Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={room?.backgroundImage}
                alt={room?.backgroundAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Live Indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1.5 bg-error/90 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-white rounded-full cultural-pulse"></div>
                <span className="text-xs font-medium text-white">LIVE</span>
              </div>

              {/* Featured Badge */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-cultural-energy rounded-full flex items-center justify-center">
                <Icon name="Star" size={16} className="text-white" />
              </div>

              {/* Language Flag */}
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-2xl">
                {room?.flag}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {room?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {room?.description}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium border ml-3 ${getLevelColor(
                    room?.level
                  )}`}
                >
                  {room?.level}
                </span>
              </div>

              {/* Moderator */}
              <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/30 rounded-lg">
                <Image
                  src={room?.moderator?.avatar}
                  alt={room?.moderator?.avatarAlt}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    {room?.moderator?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {room?.moderator?.title}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="w-6 h-6 bg-cultural-trust rounded-full flex items-center justify-center">
                    <Icon name="Shield" size={12} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Stats */}
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
                    <Icon
                      name="Clock"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      {room?.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Hash"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                      {room?.topic}
                    </span>
                  </div>
                </div>
              </div>

              {/* Participants Preview */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {room?.participants?.slice(0, 3)?.map((participant) => (
                      <Image
                        key={participant?.id}
                        src={participant?.avatar}
                        alt={participant?.avatarAlt}
                        className="w-8 h-8 rounded-full border-2 border-background"
                      />
                    ))}
                    {room?.participants?.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{room?.participants?.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {room?.participants?.length} active participants
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
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
                      <Icon
                        name="Users2"
                        size={14}
                        className="text-muted-foreground"
                      />
                      <span className="text-xs text-muted-foreground">
                        Breakout
                      </span>
                    </div>
                  )}
                  {room?.features?.includes("noise-suppression") && (
                    <div className="flex items-center space-x-1">
                      <Icon
                        name="Volume2"
                        size={14}
                        className="text-muted-foreground"
                      />
                      <span className="text-xs text-muted-foreground">
                        Clear Audio
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
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

                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Share"
                  className="px-3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
