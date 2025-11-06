import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LearningGoals = ({ goals, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoals, setEditingGoals] = useState(goals);

  const goalTypes = [
    { value: "conversation", label: "日常对话", icon: "MessageCircle" },
    { value: "business", label: "商务交流", icon: "Briefcase" },
    { value: "travel", label: "旅行交流", icon: "MapPin" },
    { value: "academic", label: "学术研究", icon: "GraduationCap" },
    { value: "culture", label: "文化理解", icon: "Globe" },
    { value: "exam", label: "考试准备", icon: "FileText" },
  ];

  const handleSave = () => {
    onUpdate(editingGoals);
    setIsEditing(false);
  };

  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      type: "conversation",
      description: "",
      targetDate: "",
      progress: 0,
      isActive: true,
    };
    setEditingGoals([...editingGoals, newGoal]);
  };

  const removeGoal = (id) => {
    setEditingGoals(editingGoals?.filter((goal) => goal?.id !== id));
  };

  const updateGoal = (id, field, value) => {
    setEditingGoals(
      editingGoals?.map((goal) =>
        goal?.id === id ? { ...goal, [field]: value } : goal
      )
    );
  };

  const getGoalTypeData = (type) => {
    return goalTypes?.find((gt) => gt?.value === type);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Target" className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">学习目标</h2>
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
                setEditingGoals(goals);
                setIsEditing(false);
              }}
            >
              取消
            </Button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          {editingGoals?.map((goal) => {
            // const goalTypeData = getGoalTypeData(goal?.type);
            return (
              <div
                key={goal?.id}
                className="p-4 border border-border rounded-lg space-y-3"
              >
                <div className="flex items-center gap-3">
                  <select
                    value={goal?.type}
                    onChange={(e) =>
                      updateGoal(goal?.id, "type", e?.target?.value)
                    }
                    className="px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {goalTypes?.map((type) => (
                      <option key={type?.value} value={type?.value}>
                        {type?.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={goal?.targetDate}
                    onChange={(e) =>
                      updateGoal(goal?.id, "targetDate", e?.target?.value)
                    }
                    className="px-3 py-2 border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeGoal(goal?.id)}
                    className="text-destructive hover:text-destructive"
                  />
                </div>
                <textarea
                  value={goal?.description}
                  onChange={(e) =>
                    updateGoal(goal?.id, "description", e?.target?.value)
                  }
                  placeholder="描述你的具体目标..."
                  className="w-full px-3 py-2 border border-border rounded resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-muted-foreground">进度:</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal?.progress}
                    onChange={(e) =>
                      updateGoal(
                        goal?.id,
                        "progress",
                        parseInt(e?.target?.value)
                      )
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">
                    {goal?.progress}%
                  </span>
                </div>
              </div>
            );
          })}
          <Button
            variant="outline"
            onClick={addGoal}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            添加目标
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {editingGoals?.length > 0 ? (
            editingGoals?.map((goal) => {
              const goalTypeData = getGoalTypeData(goal?.type);
              return (
                <div key={goal?.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {goalTypeData && (
                        <Icon
                          name={goalTypeData?.icon}
                          size={18}
                          className="text-primary"
                        />
                      )}
                      <span className="font-medium text-foreground">
                        {goalTypeData?.label || goal?.type}
                      </span>
                    </div>
                    {goal?.targetDate && (
                      <span className="text-sm text-muted-foreground">
                        目标日期:{" "}
                        {new Date(goal.targetDate)?.toLocaleDateString("zh-CN")}
                      </span>
                    )}
                  </div>
                  {goal?.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {goal?.description}
                    </p>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">进度</span>
                      <span className="font-medium text-foreground">
                        {goal?.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal?.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Icon
                name="Target"
                size={48}
                className="text-muted-foreground/50 mx-auto mb-3"
              />
              <p className="text-muted-foreground">还没有设置学习目标</p>
              <p className="text-sm text-muted-foreground mt-1">
                设置明确的目标，让学习更有方向
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningGoals;
