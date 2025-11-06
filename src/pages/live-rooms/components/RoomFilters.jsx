import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const RoomFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const languageOptions = [
    { value: "all", label: "All Languages" },
    { value: "english", label: "🇺🇸 English" },
    { value: "chinese", label: "🇨🇳 Chinese" },
    { value: "spanish", label: "🇪🇸 Spanish" },
    { value: "french", label: "🇫🇷 French" },
    { value: "german", label: "🇩🇪 German" },
    { value: "japanese", label: "🇯🇵 Japanese" },
    { value: "korean", label: "🇰🇷 Korean" },
    { value: "italian", label: "🇮🇹 Italian" },
    { value: "portuguese", label: "🇵🇹 Portuguese" },
    { value: "russian", label: "🇷🇺 Russian" },
  ];

  const levelOptions = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const topicOptions = [
    { value: "all", label: "All Topics" },
    { value: "daily-life", label: "Daily Life" },
    { value: "business", label: "Business" },
    { value: "culture", label: "Culture" },
    { value: "travel", label: "Travel" },
    { value: "technology", label: "Technology" },
    { value: "food", label: "Food & Cooking" },
    { value: "hobbies", label: "Hobbies" },
    { value: "current-events", label: "Current Events" },
    { value: "entertainment", label: "Entertainment" },
    { value: "education", label: "Education" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "participants", label: "Most Participants" },
    { value: "level", label: "By Level" },
    { value: "language", label: "By Language" },
  ];

  const roomTypeFilters = [
    { id: "live", label: "Live Now", icon: "Radio" },
    { id: "scheduled", label: "Scheduled", icon: "Calendar" },
    { id: "featured", label: "Featured", icon: "Star" },
    { id: "moderated", label: "Moderated", icon: "Shield" },
  ];

  const handleFilterToggle = (filterId) => {
    const currentTypes = filters?.roomTypes || [];
    const newTypes = currentTypes?.includes(filterId)
      ? currentTypes?.filter((type) => type !== filterId)
      : [...currentTypes, filterId];

    onFilterChange({ ...filters, roomTypes: newTypes });
  };

  const hasActiveFilters = () => {
    return (
      filters?.language !== "all" ||
      filters?.level !== "all" ||
      filters?.topic !== "all" ||
      (filters?.roomTypes && filters?.roomTypes?.length > 0)
    );
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filter Rooms</h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Language Filter */}
        <div>
          <Select
            label="Language"
            options={languageOptions}
            value={filters?.language || "all"}
            onChange={(value) =>
              onFilterChange({ ...filters, language: value })
            }
            className="w-full"
          />
        </div>

        {/* Level Filter */}
        <div>
          <Select
            label="Proficiency Level"
            options={levelOptions}
            value={filters?.level || "all"}
            onChange={(value) => onFilterChange({ ...filters, level: value })}
            className="w-full"
          />
        </div>

        {/* Topic Filter */}
        <div>
          <Select
            label="Topic"
            options={topicOptions}
            value={filters?.topic || "all"}
            onChange={(value) => onFilterChange({ ...filters, topic: value })}
            className="w-full"
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy || "popular"}
            onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
            className="w-full"
          />
        </div>

        {/* Room Type Filters */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Room Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {roomTypeFilters?.map((filter) => (
              <button
                key={filter?.id}
                onClick={() => handleFilterToggle(filter?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filters?.roomTypes?.includes(filter?.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon name={filter?.icon} size={16} />
                <span>{filter?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Participant Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Room Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "small", label: "2-5", range: [2, 5] },
              { id: "medium", label: "6-15", range: [6, 15] },
              { id: "large", label: "16+", range: [16, 50] },
            ]?.map((size) => (
              <button
                key={size?.id}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    participantRange:
                      filters?.participantRange === size?.id ? null : size?.id,
                  })
                }
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filters?.participantRange === size?.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {size?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Features
          </label>
          <div className="space-y-2">
            {[
              {
                id: "screen-sharing",
                label: "Screen Sharing",
                icon: "Monitor",
              },
              { id: "breakout-rooms", label: "Breakout Rooms", icon: "Users2" },
              {
                id: "noise-suppression",
                label: "Noise Suppression",
                icon: "Volume2",
              },
              { id: "recording", label: "Recording Available", icon: "Video" },
            ]?.map((feature) => (
              <button
                key={feature?.id}
                onClick={() => {
                  const currentFeatures = filters?.features || [];
                  const newFeatures = currentFeatures?.includes(feature?.id)
                    ? currentFeatures?.filter((f) => f !== feature?.id)
                    : [...currentFeatures, feature?.id];
                  onFilterChange({ ...filters, features: newFeatures });
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filters?.features?.includes(feature?.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon name={feature?.icon} size={16} />
                <span>{feature?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomFilters;
