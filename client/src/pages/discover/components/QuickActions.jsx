import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuickActions = ({
  onFilterToggle,
  onRefresh,
  activeFiltersCount,
  isLoading,
}) => {
  const quickFilters = [
    {
      id: "online",
      label: "Online Now",
      icon: "Wifi",
      color: "bg-success/10 text-success hover:bg-success/20",
    },
    {
      id: "verified",
      label: "Verified",
      icon: "CheckCircle",
      color: "bg-primary/10 text-primary hover:bg-primary/20",
    },
    {
      id: "video",
      label: "Video Chat",
      icon: "Video",
      color:
        "bg-cultural-bridge/10 text-cultural-bridge hover:bg-cultural-bridge/20",
    },
    {
      id: "beginner",
      label: "Beginner Friendly",
      icon: "GraduationCap",
      color:
        "bg-cultural-energy/10 text-cultural-energy hover:bg-cultural-energy/20",
    },
  ];

  return (
    <div className="bg-background border-b border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">
            Discover Partners
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
            <span>2,847 online</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            onClick={onRefresh}
            disabled={isLoading}
            className={isLoading ? "animate-spin" : ""}
          />

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            onClick={onFilterToggle}
            className="relative"
          >
            Filters
            {activeFiltersCount > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {activeFiltersCount}
              </div>
            )}
          </Button>
        </div>
      </div>
      {/* Quick Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {quickFilters?.map((filter) => (
          <button
            key={filter?.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter?.color}`}
          >
            <Icon name={filter?.icon} size={14} />
            <span>{filter?.label}</span>
          </button>
        ))}
      </div>
      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Filter" size={14} />
          <span>
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
            active
          </span>
          <button className="text-primary hover:text-primary/80 font-medium">
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
