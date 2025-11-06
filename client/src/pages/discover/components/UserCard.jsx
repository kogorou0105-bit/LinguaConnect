import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const UserCard = ({ user, onConnect, onPass, onSuperLike }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCompatibilityColor = (score) => {
    if (score >= 90) return "text-success bg-success/10";
    if (score >= 75) return "text-cultural-bridge bg-cultural-bridge/10";
    if (score >= 60) return "text-warning bg-warning/10";
    return "text-muted-foreground bg-muted";
  };

  const getOnlineStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-success";
      case "away":
        return "bg-warning";
      case "busy":
        return "bg-destructive";
      default:
        return "bg-muted-foreground";
    }
  };

  const formatLastSeen = (timestamp) => {
    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffInMinutes = Math.floor((now - lastSeen) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Card Container */}
      <div
        className={`relative w-full h-[600px] rounded-2xl overflow-hidden shadow-cultural transition-transform duration-300 ${
          isFlipped ? "transform rotateY-180" : ""
        }`}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 bg-card border border-border rounded-2xl overflow-hidden ${
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* Profile Image */}
          <div className="relative h-2/3 overflow-hidden">
            <Image
              src={user?.profileImage}
              alt={user?.profileImageAlt}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <Icon name="User" size={48} className="text-muted-foreground" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Online Status */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <div
                className={`w-2 h-2 rounded-full ${getOnlineStatusColor(
                  user?.onlineStatus
                )} ${user?.onlineStatus === "online" ? "cultural-pulse" : ""}`}
              ></div>
              <span className="text-white text-xs font-medium">
                {user?.onlineStatus === "online"
                  ? "Online"
                  : formatLastSeen(user?.lastSeen)}
              </span>
            </div>

            {/* Verification Badge */}
            {user?.isVerified && (
              <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm rounded-full p-2">
                <Icon name="CheckCircle" size={16} className="text-white" />
              </div>
            )}

            {/* Compatibility Score */}
            <div className="absolute bottom-4 right-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getCompatibilityColor(
                  user?.compatibilityScore
                )}`}
              >
                {user?.compatibilityScore}% Match
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="h-1/3 p-6 bg-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                  <span>{user?.name}</span>
                  <span className="text-muted-foreground text-lg">
                    {user?.age}
                  </span>
                </h3>
                <p className="text-muted-foreground flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{user?.location}</span>
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                iconName="Info"
                onClick={() => setIsFlipped(true)}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Languages */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="MessageCircle" size={12} />
                <span>Teaches {user?.nativeLanguage}</span>
              </div>
              <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="BookOpen" size={12} />
                <span>Learning {user?.targetLanguage}</span>
              </div>
            </div>

            {/* Mutual Interests */}
            {user?.mutualInterests?.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Heart" size={14} className="text-cultural-warm" />
                <span>{user?.mutualInterests?.length} mutual interests</span>
              </div>
            )}
          </div>
        </div>

        {/* Back Side - Detailed Info */}
        <div
          className={`absolute inset-0 bg-card border border-border rounded-2xl overflow-hidden ${
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}
        >
          <div className="h-full p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Profile Details
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => setIsFlipped(false)}
              />
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="User" size={16} className="text-primary" />
                <span>About</span>
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {user?.bio}
              </p>
            </div>

            {/* Learning Goals */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span>Learning Goals</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {user?.learningGoals?.map((goal, index) => (
                  <span
                    key={index}
                    className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Heart" size={16} className="text-primary" />
                <span>Interests</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {user?.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs ${
                      user?.mutualInterests?.includes(interest)
                        ? "bg-cultural-warm/20 text-cultural-warm border border-cultural-warm/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {interest}
                    {user?.mutualInterests?.includes(interest) && (
                      <Icon name="Star" size={12} className="ml-1 inline" />
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Availability</span>
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="text-foreground">{user?.timezone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preferred time:</span>
                  <span className="text-foreground">{user?.preferredTime}</span>
                </div>
              </div>
            </div>

            {/* Icebreaker Suggestions */}
            {user?.icebreakers?.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                  <Icon
                    name="MessageSquare"
                    size={16}
                    className="text-primary"
                  />
                  <span>Conversation Starters</span>
                </h4>
                <div className="space-y-2">
                  {user?.icebreakers?.slice(0, 2)?.map((icebreaker, index) => (
                    <div
                      key={index}
                      className="bg-cultural-canvas/30 border border-cultural-canvas rounded-lg p-3"
                    >
                      <p className="text-sm text-foreground">"{icebreaker}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <Button
          variant="outline"
          size="lg"
          iconName="X"
          onClick={() => onPass(user?.id)}
          className="w-14 h-14 rounded-full border-2 border-muted-foreground/20 hover:border-destructive hover:text-destructive"
        />

        <Button
          variant="outline"
          size="lg"
          iconName="Star"
          onClick={() => onSuperLike(user?.id)}
          className="w-16 h-16 rounded-full border-2 border-cultural-energy hover:border-cultural-energy hover:bg-cultural-energy hover:text-white"
        />

        <Button
          size="lg"
          iconName="Heart"
          onClick={() => onConnect(user?.id)}
          className="w-14 h-14 rounded-full bg-cultural-warm hover:bg-cultural-warm/90"
        />
      </div>
    </div>
  );
};

export default UserCard;
