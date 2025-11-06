import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const AvailabilitySchedule = ({ schedule, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(schedule);

  const weekDays = [
    { key: "monday", label: "周一" },
    { key: "tuesday", label: "周二" },
    { key: "wednesday", label: "周三" },
    { key: "thursday", label: "周四" },
    { key: "friday", label: "周五" },
    { key: "saturday", label: "周六" },
    { key: "sunday", label: "周日" },
  ];

  const timeSlots = [
    { value: "morning", label: "上午 (6:00-12:00)", icon: "Sunrise" },
    { value: "afternoon", label: "下午 (12:00-18:00)", icon: "Sun" },
    { value: "evening", label: "晚上 (18:00-24:00)", icon: "Sunset" },
  ];

  const handleSave = () => {
    onUpdate(editingSchedule);
    setIsEditing(false);
  };

  const toggleTimeSlot = (day, timeSlot) => {
    setEditingSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [timeSlot]: !prev?.[day]?.[timeSlot],
      },
    }));
  };

  const toggleDay = (day) => {
    const allSelected = timeSlots?.every(
      (slot) => editingSchedule?.[day]?.[slot?.value]
    );
    const newDaySchedule = {};
    timeSlots?.forEach((slot) => {
      newDaySchedule[slot.value] = !allSelected;
    });

    setEditingSchedule((prev) => ({
      ...prev,
      [day]: newDaySchedule,
    }));
  };

  const getAvailableTimeSlots = (day) => {
    return timeSlots?.filter((slot) => schedule?.[day]?.[slot?.value]);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Clock" className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">可用时间</h2>
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
                setEditingSchedule(schedule);
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
          <p className="text-sm text-muted-foreground mb-4">
            设置你的可用时间，帮助其他用户知道何时可以与你进行语言交流
          </p>

          {weekDays?.map((day) => (
            <div key={day?.key} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">{day?.label}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleDay(day?.key)}
                >
                  {timeSlots?.every(
                    (slot) => editingSchedule?.[day?.key]?.[slot?.value]
                  )
                    ? "全部取消"
                    : "全部选择"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {timeSlots?.map((slot) => (
                  <button
                    key={slot?.value}
                    onClick={() => toggleTimeSlot(day?.key, slot?.value)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      editingSchedule?.[day?.key]?.[slot?.value]
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name={slot?.icon} size={16} />
                    <span className="text-sm">{slot?.label}</span>
                    {editingSchedule?.[day?.key]?.[slot?.value] && (
                      <Icon name="Check" size={14} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {weekDays?.map((day) => {
            const availableSlots = getAvailableTimeSlots(day?.key);
            return (
              <div
                key={day?.key}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <span className="font-medium text-foreground">
                  {day?.label}
                </span>
                <div className="flex items-center gap-2">
                  {availableSlots?.length > 0 ? (
                    availableSlots?.map((slot) => (
                      <div
                        key={slot?.value}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        <Icon name={slot?.icon} size={12} />
                        <span className="text-xs">
                          {slot?.label?.split(" ")?.[0]}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      不可用
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-4 p-3 bg-cultural-trust/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" size={16} className="text-cultural-bridge" />
              <span className="text-sm font-medium text-cultural-bridge">
                时区信息
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              当前时区: 中国标准时间 (UTC+8)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilitySchedule;
