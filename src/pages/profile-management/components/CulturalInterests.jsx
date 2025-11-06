import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CulturalInterests = ({ interests, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(interests);

  const availableInterests = [
    {
      id: "food",
      label: "美食",
      icon: "UtensilsCrossed",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "music",
      label: "音乐",
      icon: "Music",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "travel",
      label: "旅行",
      icon: "Plane",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "art",
      label: "艺术",
      icon: "Palette",
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: "sports",
      label: "运动",
      icon: "Trophy",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "movies",
      label: "电影",
      icon: "Film",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "books",
      label: "阅读",
      icon: "BookOpen",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "technology",
      label: "科技",
      icon: "Smartphone",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "fashion",
      label: "时尚",
      icon: "Shirt",
      color: "bg-rose-100 text-rose-700",
    },
    {
      id: "photography",
      label: "摄影",
      icon: "Camera",
      color: "bg-slate-100 text-slate-700",
    },
    {
      id: "cooking",
      label: "烹饪",
      icon: "ChefHat",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "gaming",
      label: "游戏",
      icon: "Gamepad2",
      color: "bg-violet-100 text-violet-700",
    },
  ];

  const handleSave = () => {
    onUpdate(selectedInterests);
    setIsEditing(false);
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev?.includes(interestId)
        ? prev?.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const getInterestData = (id) => {
    return availableInterests?.find((interest) => interest?.id === id);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Heart" className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">文化兴趣</h2>
        </div>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit2"
            onClick={() => setIsEditing(true)}
          >
            编辑
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              保存
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedInterests(interests);
                setIsEditing(false);
              }}
            >
              取消
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            选择你感兴趣的文化领域，这将帮助我们为你匹配志同道合的语言伙伴
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableInterests?.map((interest) => (
              <button
                key={interest?.id}
                onClick={() => toggleInterest(interest?.id)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  selectedInterests?.includes(interest?.id)
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon name={interest?.icon} size={18} />
                <span className="text-sm font-medium">{interest?.label}</span>
                {selectedInterests?.includes(interest?.id) && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {selectedInterests?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedInterests?.map((interestId) => {
                const interest = getInterestData(interestId);
                return interest ? (
                  <div
                    key={interestId}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full ${interest?.color}`}
                  >
                    <Icon name={interest?.icon} size={16} />
                    <span className="text-sm font-medium">
                      {interest?.label}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon
                name="Heart"
                size={48}
                className="text-muted-foreground/50 mx-auto mb-3"
              />
              <p className="text-muted-foreground">还没有添加兴趣标签</p>
              <p className="text-sm text-muted-foreground mt-1">
                添加你的兴趣爱好，让其他用户更好地了解你
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CulturalInterests;
