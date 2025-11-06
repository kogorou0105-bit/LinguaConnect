import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Image from "../../../components/AppImage";

const QuickJoinSection = ({ onJoinRoom, onCreateRoom }) => {
  const quickJoinRooms = [
    {
      id: "quick-1",
      title: "English Coffee Chat",
      language: "English",
      flag: "🇺🇸",
      participants: 8,
      maxParticipants: 12,
      level: "Intermediate",
      topic: "Daily Life",
      isLive: true,
      moderator: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
        avatarAlt:
          "Professional headshot of Asian woman with long black hair in white blouse",
      },
    },
    {
      id: "quick-2",
      title: "Chinese Business Talk",
      language: "Chinese",
      flag: "🇨🇳",
      participants: 5,
      maxParticipants: 10,
      level: "Advanced",
      topic: "Business",
      isLive: true,
      moderator: {
        name: "David Wang",
        avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
        avatarAlt:
          "Professional headshot of Asian man with short black hair in navy suit",
      },
    },
    {
      id: "quick-3",
      title: "Spanish Culture Exchange",
      language: "Spanish",
      flag: "🇪🇸",
      participants: 12,
      maxParticipants: 15,
      level: "Beginner",
      topic: "Culture",
      isLive: true,
      moderator: {
        name: "Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1582903165064-c0f584740d9a",
        avatarAlt:
          "Professional headshot of Hispanic woman with curly brown hair in red blazer",
      },
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
        return "bg-success/10 text-success";
      case "Intermediate":
        return "bg-warning/10 text-warning";
      case "Advanced":
        return "bg-error/10 text-error";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Join</h2>
          <p className="text-sm text-muted-foreground">
            Jump into active conversations right now
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-cultural-trust/20 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
            <span className="text-xs font-medium text-success">Live</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onCreateRoom}
          >
            Create Room
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {quickJoinRooms?.map((room) => (
          <div
            key={room?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              {/* Language Flag */}
              <div className="w-10 h-10 bg-cultural-gradient rounded-lg flex items-center justify-center text-white text-lg">
                {room?.flag}
              </div>

              {/* Room Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {room?.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(
                      room?.level
                    )}`}
                  >
                    {room?.level}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Users"
                      size={14}
                      className={getCapacityColor(
                        room?.participants,
                        room?.maxParticipants
                      )}
                    />
                    <span
                      className={getCapacityColor(
                        room?.participants,
                        room?.maxParticipants
                      )}
                    >
                      {room?.participants}/{room?.maxParticipants}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Icon name="Hash" size={14} />
                    <span>{room?.topic}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Image
                      src={room?.moderator?.avatar}
                      alt={room?.moderator?.avatarAlt}
                      className="w-4 h-4 rounded-full"
                    />

                    <span>{room?.moderator?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
                <span>Active now</span>
              </div>

              <Button
                variant="default"
                size="sm"
                iconName="Mic"
                iconPosition="left"
                onClick={() => onJoinRoom(room?.id)}
                disabled={room?.participants >= room?.maxParticipants}
              >
                {room?.participants >= room?.maxParticipants ? "Full" : "Join"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onJoinRoom("random")}
            className="flex items-center space-x-2 p-3 bg-cultural-gradient rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            <Icon name="Shuffle" size={16} />
            <span className="text-sm font-medium">Random Join</span>
          </button>

          <button className="flex items-center space-x-2 p-3 bg-muted rounded-lg text-muted-foreground hover:bg-muted/80 transition-colors">
            <Icon name="Calendar" size={16} />
            <span className="text-sm font-medium">Schedule</span>
          </button>

          <button className="flex items-center space-x-2 p-3 bg-muted rounded-lg text-muted-foreground hover:bg-muted/80 transition-colors">
            <Icon name="Users2" size={16} />
            <span className="text-sm font-medium">Find Partner</span>
          </button>

          <button className="flex items-center space-x-2 p-3 bg-muted rounded-lg text-muted-foreground hover:bg-muted/80 transition-colors">
            <Icon name="Settings" size={16} />
            <span className="text-sm font-medium">Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickJoinSection;
