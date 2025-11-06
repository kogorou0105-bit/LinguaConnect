import React from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const MatchModal = ({
  isOpen,
  onClose,
  matchedUser,
  currentUser,
  onStartChat,
}) => {
  if (!isOpen || !matchedUser) return null;

  const handleStartChat = () => {
    onStartChat(matchedUser?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="relative bg-background rounded-2xl shadow-cultural max-w-md w-full overflow-hidden">
        {/* Celebration Header */}
        <div className="relative bg-cultural-gradient p-8 text-center">
          {/* Floating Hearts Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)]?.map((_, i) => (
              <div
                key={i}
                className="absolute cultural-float"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              >
                <Icon
                  name="Heart"
                  size={16 + i * 2}
                  className="text-white/30"
                />
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cultural-pulse">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              It's a Match!
            </h2>
            <p className="text-white/90 text-sm">
              You and {matchedUser?.name} liked each other
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-6">
          {/* User Profiles */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {/* Current User */}
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cultural-warm shadow-medium">
                  <Image
                    src={currentUser?.profileImage}
                    alt={currentUser?.profileImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cultural-warm rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={12} className="text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mt-2">
                {currentUser?.name}
              </p>
            </div>

            {/* Connection Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-cultural-bridge/20 rounded-full flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-cultural-bridge" />
              </div>
            </div>

            {/* Matched User */}
            <div className="text-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cultural-bridge shadow-medium">
                  <Image
                    src={matchedUser?.profileImage}
                    alt={matchedUser?.profileImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-cultural-bridge rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={12} className="text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground mt-2">
                {matchedUser?.name}
              </p>
            </div>
          </div>

          {/* Match Details */}
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {matchedUser?.compatibilityScore}% Compatibility
              </span>
            </div>

            <div className="space-y-2">
              {/* Mutual Interests */}
              {matchedUser?.mutualInterests?.length > 0 && (
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Heart" size={14} className="text-cultural-warm" />
                  <span className="text-xs text-muted-foreground">
                    {matchedUser?.mutualInterests?.length} mutual interests
                  </span>
                </div>
              )}

              {/* Language Exchange */}
              <div className="flex items-center justify-center space-x-2">
                <Icon
                  name="Languages"
                  size={14}
                  className="text-cultural-bridge"
                />
                <span className="text-xs text-muted-foreground">
                  Perfect language exchange match
                </span>
              </div>
            </div>
          </div>

          {/* Suggested Icebreaker */}
          {matchedUser?.icebreakers?.length > 0 && (
            <div className="bg-cultural-canvas/20 border border-cultural-canvas rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cultural-energy/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon
                    name="MessageSquare"
                    size={16}
                    className="text-cultural-energy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    Suggested conversation starter:
                  </h4>
                  <p className="text-sm text-muted-foreground italic">
                    "{matchedUser?.icebreakers?.[0]}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleStartChat}
              iconName="MessageCircle"
              iconPosition="left"
              className="w-full bg-cultural-bridge hover:bg-cultural-bridge/90"
            >
              Start Conversation
            </Button>

            <Button variant="outline" onClick={onClose} className="w-full">
              Keep Discovering
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-cultural-trust/10 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon
                name="Lightbulb"
                size={16}
                className="text-cultural-trust flex-shrink-0 mt-0.5"
              />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">
                  Pro Tip
                </h5>
                <p className="text-xs text-muted-foreground">
                  Start with a friendly greeting in their native language to
                  make a great first impression!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
