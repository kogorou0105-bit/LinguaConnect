import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const LanguageSkills = ({ languages, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingLanguages, setEditingLanguages] = useState(languages);

  const proficiencyLevels = [
    { value: "beginner", label: "初学者", color: "bg-red-100 text-red-700" },
    {
      value: "elementary",
      label: "基础",
      color: "bg-orange-100 text-orange-700",
    },
    {
      value: "intermediate",
      label: "中级",
      color: "bg-yellow-100 text-yellow-700",
    },
    { value: "advanced", label: "高级", color: "bg-green-100 text-green-700" },
    { value: "native", label: "母语", color: "bg-blue-100 text-blue-700" },
  ];

  const getProficiencyColor = (level) => {
    return (
      proficiencyLevels?.find((p) => p?.value === level)?.color ||
      "bg-gray-100 text-gray-700"
    );
  };

  const getProficiencyLabel = (level) => {
    return proficiencyLevels?.find((p) => p?.value === level)?.label || level;
  };

  const handleSave = () => {
    onUpdate(editingLanguages);
    setIsEditing(false);
  };

  const addLanguage = () => {
    setEditingLanguages([
      ...editingLanguages,
      {
        id: Date.now(),
        language: "",
        proficiency: "beginner",
        isLearning: true,
        flag: "🌍",
      },
    ]);
  };

  const removeLanguage = (id) => {
    setEditingLanguages(editingLanguages?.filter((lang) => lang?.id !== id));
  };

  const updateLanguage = (id, field, value) => {
    setEditingLanguages(
      editingLanguages?.map((lang) =>
        lang?.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Globe" className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">语言技能</h2>
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
                setEditingLanguages(languages);
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
          {editingLanguages?.map((lang) => (
            <div
              key={lang?.id}
              className="flex items-center gap-3 p-3 border border-border rounded-lg"
            >
              <span className="text-2xl">{lang?.flag}</span>
              <input
                type="text"
                value={lang?.language}
                onChange={(e) =>
                  updateLanguage(lang?.id, "language", e?.target?.value)
                }
                className="flex-1 px-3 py-1 border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="语言名称"
              />
              <select
                value={lang?.proficiency}
                onChange={(e) =>
                  updateLanguage(lang?.id, "proficiency", e?.target?.value)
                }
                className="px-3 py-1 border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {proficiencyLevels?.map((level) => (
                  <option key={level?.value} value={level?.value}>
                    {level?.label}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={lang?.isLearning}
                  onChange={(e) =>
                    updateLanguage(lang?.id, "isLearning", e?.target?.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm">学习中</span>
              </label>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => removeLanguage(lang?.id)}
                className="text-destructive hover:text-destructive"
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addLanguage}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            添加语言
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {languages?.map((lang) => (
            <div
              key={lang?.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang?.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {lang?.language}
                    </span>
                    {lang?.isLearning && (
                      <span className="px-2 py-0.5 bg-cultural-energy/20 text-cultural-cta text-xs rounded-full">
                        学习中
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full ${getProficiencyColor(
                      lang?.proficiency
                    )}`}
                  >
                    {getProficiencyLabel(lang?.proficiency)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)]?.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < lang?.proficiencyLevel ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSkills;
