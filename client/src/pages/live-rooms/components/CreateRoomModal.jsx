import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const CreateRoomModal = ({ isOpen, onClose, onCreateRoom }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    level: "",
    topic: "",
    maxParticipants: 10,
    duration: "60",
    isPrivate: false,
    requireApproval: false,
    features: [],
  });

  const [errors, setErrors] = useState({});

  const languageOptions = [
    { value: "english", label: "🇺🇸 English" },
    { value: "chinese", label: "🇨🇳 Chinese" },
    { value: "spanish", label: "🇪🇸 Spanish" },
    { value: "french", label: "🇫🇷 French" },
    { value: "german", label: "🇩🇪 German" },
    { value: "japanese", label: "🇯🇵 Japanese" },
    { value: "korean", label: "🇰🇷 Korean" },
    { value: "italian", label: "🇮🇹 Italian" },
  ];

  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "mixed", label: "Mixed Levels" },
  ];

  const topicOptions = [
    { value: "daily-life", label: "Daily Life" },
    { value: "business", label: "Business" },
    { value: "culture", label: "Culture" },
    { value: "travel", label: "Travel" },
    { value: "technology", label: "Technology" },
    { value: "food", label: "Food & Cooking" },
    { value: "hobbies", label: "Hobbies" },
    { value: "current-events", label: "Current Events" },
  ];

  const durationOptions = [
    { value: "30", label: "30 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
    { value: "unlimited", label: "No time limit" },
  ];

  const featureOptions = [
    { id: "screen-sharing", label: "Screen Sharing", icon: "Monitor" },
    { id: "breakout-rooms", label: "Breakout Rooms", icon: "Users2" },
    { id: "noise-suppression", label: "Noise Suppression", icon: "Volume2" },
    { id: "recording", label: "Recording", icon: "Video" },
    { id: "chat", label: "Text Chat", icon: "MessageCircle" },
    { id: "whiteboard", label: "Whiteboard", icon: "Edit3" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFeatureToggle = (featureId) => {
    setFormData((prev) => ({
      ...prev,
      features: prev?.features?.includes(featureId)
        ? prev?.features?.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = "Room title is required";
    }

    if (!formData?.description?.trim()) {
      newErrors.description = "Room description is required";
    }

    if (!formData?.language) {
      newErrors.language = "Please select a language";
    }

    if (!formData?.level) {
      newErrors.level = "Please select a proficiency level";
    }

    if (!formData?.topic) {
      newErrors.topic = "Please select a topic";
    }

    if (formData?.maxParticipants < 2 || formData?.maxParticipants > 50) {
      newErrors.maxParticipants = "Participants must be between 2 and 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (validateForm()) {
      onCreateRoom({
        ...formData,
        id: Date.now()?.toString(),
        createdAt: new Date(),
        currentParticipants: 1,
        isLive: true,
        moderator: {
          id: "current-user",
          name: "You",
          avatar:
            "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
          avatarAlt:
            "Professional headshot of young man with brown hair in casual shirt",
        },
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        language: "",
        level: "",
        topic: "",
        maxParticipants: 10,
        duration: "60",
        isPrivate: false,
        requireApproval: false,
        features: [],
      });

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Create New Room
            </h2>
            <p className="text-sm text-muted-foreground">
              Start a conversation and connect with learners
            </p>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Basic Information
            </h3>

            <Input
              label="Room Title"
              type="text"
              placeholder="Enter an engaging room title"
              value={formData?.title}
              onChange={(e) => handleInputChange("title", e?.target?.value)}
              error={errors?.title}
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
                placeholder="Describe what you'll discuss in this room"
                value={formData?.description}
                onChange={(e) =>
                  handleInputChange("description", e?.target?.value)
                }
              />

              {errors?.description && (
                <p className="text-sm text-error mt-1">{errors?.description}</p>
              )}
            </div>
          </div>

          {/* Language & Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Language"
              options={languageOptions}
              value={formData?.language}
              onChange={(value) => handleInputChange("language", value)}
              error={errors?.language}
              placeholder="Select language"
              required
            />

            <Select
              label="Proficiency Level"
              options={levelOptions}
              value={formData?.level}
              onChange={(value) => handleInputChange("level", value)}
              error={errors?.level}
              placeholder="Select level"
              required
            />
          </div>

          {/* Topic & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Topic"
              options={topicOptions}
              value={formData?.topic}
              onChange={(value) => handleInputChange("topic", value)}
              error={errors?.topic}
              placeholder="Select topic"
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={formData?.duration}
              onChange={(value) => handleInputChange("duration", value)}
              placeholder="Select duration"
            />
          </div>

          {/* Participants */}
          <Input
            label="Maximum Participants"
            type="number"
            min="2"
            max="50"
            value={formData?.maxParticipants}
            onChange={(e) =>
              handleInputChange("maxParticipants", parseInt(e?.target?.value))
            }
            error={errors?.maxParticipants}
            description="Between 2 and 50 participants"
          />

          {/* Room Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Room Settings
            </h3>

            <div className="space-y-3">
              <Checkbox
                label="Private Room"
                description="Only invited users can join"
                checked={formData?.isPrivate}
                onChange={(e) =>
                  handleInputChange("isPrivate", e?.target?.checked)
                }
              />

              <Checkbox
                label="Require Approval"
                description="Manually approve join requests"
                checked={formData?.requireApproval}
                onChange={(e) =>
                  handleInputChange("requireApproval", e?.target?.checked)
                }
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {featureOptions?.map((feature) => (
                <button
                  key={feature?.id}
                  type="button"
                  onClick={() => handleFeatureToggle(feature?.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    formData?.features?.includes(feature?.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                >
                  <Icon name={feature?.icon} size={16} />
                  <span className="text-sm font-medium">{feature?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" iconName="Plus" iconPosition="left">
              Create Room
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;
