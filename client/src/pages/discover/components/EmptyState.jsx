import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const EmptyState = ({ type = "no-matches", onAction }) => {
  const states = {
    "no-matches": {
      icon: "Search",
      title: "No matches found",
      description:
        "Try adjusting your filters or expanding your preferences to find more conversation partners.",
      actionLabel: "Adjust Filters",
      actionIcon: "Filter",
    },
    loading: {
      icon: "Loader2",
      title: "Finding perfect matches...",
      description:
        "We're searching for conversation partners who match your preferences and learning goals.",
      actionLabel: null,
      actionIcon: null,
    },
    error: {
      icon: "AlertCircle",
      title: "Something went wrong",
      description:
        "We couldn't load new matches right now. Please check your connection and try again.",
      actionLabel: "Try Again",
      actionIcon: "RotateCcw",
    },
    "end-of-stack": {
      icon: "CheckCircle",
      title: "You've seen everyone!",
      description:
        "You've reviewed all available matches. Check back later for new members or adjust your filters.",
      actionLabel: "Refresh",
      actionIcon: "RotateCcw",
    },
  };

  const state = states?.[type] || states?.["no-matches"];

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center">
      {/* Animated Icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-cultural-gradient rounded-full flex items-center justify-center shadow-cultural">
          <Icon
            name={state?.icon}
            size={40}
            className={`text-white ${
              type === "loading" ? "animate-spin" : "cultural-pulse"
            }`}
          />
        </div>

        {/* Floating Elements */}
        {type !== "loading" && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-cultural-energy rounded-full flex items-center justify-center cultural-float">
            <Icon name="Star" size={16} className="text-white" />
          </div>
        )}
      </div>
      {/* Content */}
      <div className="max-w-sm">
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {state?.title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {state?.description}
        </p>

        {/* Action Button */}
        {state?.actionLabel && (
          <Button
            onClick={onAction}
            iconName={state?.actionIcon}
            iconPosition="left"
            className="mb-6"
          >
            {state?.actionLabel}
          </Button>
        )}

        {/* Tips Section */}
        {type === "no-matches" && (
          <div className="bg-cultural-canvas/20 border border-cultural-canvas rounded-xl p-4 mt-6">
            <h4 className="font-medium text-foreground mb-3 flex items-center justify-center space-x-2">
              <Icon
                name="Lightbulb"
                size={16}
                className="text-cultural-energy"
              />
              <span>Tips to find more matches</span>
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground text-left">
              <div className="flex items-start space-x-2">
                <Icon
                  name="Check"
                  size={14}
                  className="text-success mt-0.5 flex-flex-shrink-0"
                />
                <span>Expand your age range preferences</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon
                  name="Check"
                  size={14}
                  className="text-success mt-0.5 flex-flex-shrink-0"
                />
                <span>Add more conversation topics</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon
                  name="Check"
                  size={14}
                  className="text-success mt-0.5 flex-flex-shrink-0"
                />
                <span>Consider different proficiency levels</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon
                  name="Check"
                  size={14}
                  className="text-success mt-0.5 flex-flex-shrink-0"
                />
                <span>Include users from more time zones</span>
              </div>
            </div>
          </div>
        )}

        {/* Encouragement for end of stack */}
        {type === "end-of-stack" && (
          <div className="bg-cultural-trust/10 border border-cultural-trust/30 rounded-xl p-4 mt-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Trophy" size={16} className="text-cultural-trust" />
              <span className="font-medium text-foreground">
                Great job exploring!
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              New members join LinguaConnect every day. Come back tomorrow for
              fresh matches!
            </p>
          </div>
        )}
      </div>
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cultural-warm rounded-full cultural-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cultural-bridge rounded-full cultural-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-cultural-energy rounded-full cultural-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

export default EmptyState;
