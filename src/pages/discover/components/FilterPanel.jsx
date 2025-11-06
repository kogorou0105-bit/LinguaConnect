import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "chinese", label: "中文 (Chinese)" },
    { value: "spanish", label: "Español" },
    { value: "french", label: "Français" },
    { value: "german", label: "Deutsch" },
    { value: "japanese", label: "日本語" },
    { value: "korean", label: "한국어" },
    { value: "portuguese", label: "Português" },
    { value: "italian", label: "Italiano" },
    { value: "russian", label: "Русский" },
  ];

  const proficiencyOptions = [
    { value: "beginner", label: "Beginner (A1-A2)" },
    { value: "intermediate", label: "Intermediate (B1-B2)" },
    { value: "advanced", label: "Advanced (C1-C2)" },
    { value: "native", label: "Native Speaker" },
  ];

  const timezoneOptions = [
    { value: "utc-12", label: "UTC-12 (Baker Island)" },
    { value: "utc-8", label: "UTC-8 (PST - Los Angeles)" },
    { value: "utc-5", label: "UTC-5 (EST - New York)" },
    { value: "utc+0", label: "UTC+0 (GMT - London)" },
    { value: "utc+1", label: "UTC+1 (CET - Berlin)" },
    { value: "utc+8", label: "UTC+8 (CST - Beijing)" },
    { value: "utc+9", label: "UTC+9 (JST - Tokyo)" },
    { value: "utc+10", label: "UTC+10 (AEST - Sydney)" },
  ];

  const topicOptions = [
    { value: "daily-life", label: "Daily Life & Culture" },
    { value: "business", label: "Business & Professional" },
    { value: "travel", label: "Travel & Adventure" },
    { value: "technology", label: "Technology & Innovation" },
    { value: "food", label: "Food & Cooking" },
    { value: "sports", label: "Sports & Fitness" },
    { value: "arts", label: "Arts & Entertainment" },
    { value: "education", label: "Education & Learning" },
    { value: "hobbies", label: "Hobbies & Interests" },
    { value: "current-events", label: "Current Events" },
  ];

  const goalOptions = [
    { value: "conversation", label: "Conversation Practice" },
    { value: "pronunciation", label: "Pronunciation Improvement" },
    { value: "grammar", label: "Grammar & Writing" },
    { value: "business", label: "Business Communication" },
    { value: "exam-prep", label: "Exam Preparation" },
    { value: "cultural-exchange", label: "Cultural Exchange" },
    { value: "travel-prep", label: "Travel Preparation" },
    { value: "academic", label: "Academic Study" },
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      targetLanguage: "",
      nativeLanguage: "",
      proficiencyLevel: "",
      timezone: "",
      topics: [],
      goals: [],
      ageRange: { min: 18, max: 65 },
      onlineOnly: false,
      verifiedOnly: false,
      hasVideo: false,
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div
        className="lg:hidden fixed inset-0 bg-black/50"
        onClick={onClose}
      ></div>
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border lg:relative lg:w-80 lg:h-auto lg:border lg:rounded-xl lg:shadow-medium overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            Filter Partners
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="lg:hidden"
          />
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6">
          {/* Language Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Languages" size={18} className="text-primary" />
              <span>Language Preferences</span>
            </h4>

            <Select
              label="Target Language (Learning)"
              placeholder="Select language to learn"
              options={languageOptions}
              value={localFilters?.targetLanguage}
              onChange={(value) => handleFilterChange("targetLanguage", value)}
              searchable
            />

            <Select
              label="Native Language (Teaching)"
              placeholder="Select your native language"
              options={languageOptions}
              value={localFilters?.nativeLanguage}
              onChange={(value) => handleFilterChange("nativeLanguage", value)}
              searchable
            />

            <Select
              label="Proficiency Level"
              placeholder="Select proficiency level"
              options={proficiencyOptions}
              value={localFilters?.proficiencyLevel}
              onChange={(value) =>
                handleFilterChange("proficiencyLevel", value)
              }
            />
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Clock" size={18} className="text-primary" />
              <span>Availability</span>
            </h4>

            <Select
              label="Timezone"
              placeholder="Select preferred timezone"
              options={timezoneOptions}
              value={localFilters?.timezone}
              onChange={(value) => handleFilterChange("timezone", value)}
              searchable
            />

            <Checkbox
              label="Online now only"
              description="Show only users currently online"
              checked={localFilters?.onlineOnly}
              onChange={(e) =>
                handleFilterChange("onlineOnly", e?.target?.checked)
              }
            />
          </div>

          {/* Interests & Topics */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Heart" size={18} className="text-primary" />
              <span>Conversation Topics</span>
            </h4>

            <Select
              label="Preferred Topics"
              description="Select topics you'd like to discuss"
              placeholder="Choose conversation topics"
              options={topicOptions}
              value={localFilters?.topics}
              onChange={(value) => handleFilterChange("topics", value)}
              multiple
              searchable
            />
          </div>

          {/* Learning Goals */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Target" size={18} className="text-primary" />
              <span>Learning Goals</span>
            </h4>

            <Select
              label="Learning Objectives"
              description="What do you want to focus on?"
              placeholder="Select learning goals"
              options={goalOptions}
              value={localFilters?.goals}
              onChange={(value) => handleFilterChange("goals", value)}
              multiple
              searchable
            />
          </div>

          {/* Age Range */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Users" size={18} className="text-primary" />
              <span>Age Range</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Min Age"
                type="number"
                min="18"
                max="100"
                value={localFilters?.ageRange?.min}
                onChange={(e) =>
                  handleFilterChange("ageRange", {
                    ...localFilters?.ageRange,
                    min: parseInt(e?.target?.value) || 18,
                  })
                }
              />
              <Input
                label="Max Age"
                type="number"
                min="18"
                max="100"
                value={localFilters?.ageRange?.max}
                onChange={(e) =>
                  handleFilterChange("ageRange", {
                    ...localFilters?.ageRange,
                    max: parseInt(e?.target?.value) || 65,
                  })
                }
              />
            </div>
          </div>

          {/* Additional Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground flex items-center space-x-2">
              <Icon name="Shield" size={18} className="text-primary" />
              <span>Additional Preferences</span>
            </h4>

            <div className="space-y-3">
              <Checkbox
                label="Verified profiles only"
                description="Show only verified users"
                checked={localFilters?.verifiedOnly}
                onChange={(e) =>
                  handleFilterChange("verifiedOnly", e?.target?.checked)
                }
              />

              <Checkbox
                label="Video chat available"
                description="Users who support video calls"
                checked={localFilters?.hasVideo}
                onChange={(e) =>
                  handleFilterChange("hasVideo", e?.target?.checked)
                }
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset
            </Button>
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
