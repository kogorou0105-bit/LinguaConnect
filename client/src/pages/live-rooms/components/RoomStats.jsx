import React from "react";
import Icon from "../../../components/AppIcon";

const RoomStats = () => {
  const stats = [
    {
      id: "active-rooms",
      label: "Active Rooms",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "Radio",
      color: "text-cultural-warm",
      bgColor: "bg-cultural-warm/10",
    },
    {
      id: "online-users",
      label: "Online Users",
      value: "2,847",
      change: "+8%",
      changeType: "positive",
      icon: "Users",
      color: "text-cultural-bridge",
      bgColor: "bg-cultural-bridge/10",
    },
    {
      id: "languages",
      label: "Languages",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: "Globe",
      color: "text-cultural-energy",
      bgColor: "bg-cultural-energy/10",
    },
    {
      id: "conversations",
      label: "Today's Conversations",
      value: "1,456",
      change: "+15%",
      changeType: "positive",
      icon: "MessageCircle",
      color: "text-cultural-trust",
      bgColor: "bg-cultural-trust/10",
    },
  ];

  const topLanguages = [
    { language: "English", flag: "🇺🇸", rooms: 89, percentage: 36 },
    { language: "Chinese", flag: "🇨🇳", rooms: 67, percentage: 27 },
    { language: "Spanish", flag: "🇪🇸", rooms: 45, percentage: 18 },
    { language: "French", flag: "🇫🇷", rooms: 28, percentage: 11 },
    { language: "German", flag: "🇩🇪", rooms: 18, percentage: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}
              >
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>

              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat?.changeType === "positive"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                <Icon
                  name={
                    stat?.changeType === "positive"
                      ? "TrendingUp"
                      : "TrendingDown"
                  }
                  size={12}
                />
                <span>{stat?.change}</span>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Language Distribution */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Popular Languages
            </h3>
            <p className="text-sm text-muted-foreground">
              Most active conversation languages
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-full">
            <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
            <span className="text-xs font-medium text-muted-foreground">
              Live Data
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {topLanguages?.map((lang, index) => (
            <div key={lang?.language} className="flex items-center space-x-4">
              {/* Rank */}
              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">
                  {index + 1}
                </span>
              </div>

              {/* Flag */}
              <div className="text-xl">{lang?.flag}</div>

              {/* Language Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">
                    {lang?.language}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {lang?.rooms} rooms
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-cultural-gradient h-2 rounded-full transition-all duration-500"
                    style={{ width: `${lang?.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Percentage */}
              <div className="text-sm font-medium text-muted-foreground min-w-12 text-right">
                {lang?.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Activity Timeline */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Activity Timeline
            </h3>
            <p className="text-sm text-muted-foreground">
              Room activity over the last 24 hours
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              time: "2 min ago",
              event: 'New room created: "Japanese Anime Discussion"',
              type: "create",
              icon: "Plus",
            },
            {
              time: "5 min ago",
              event: '12 users joined "English Coffee Chat"',
              type: "join",
              icon: "UserPlus",
            },
            {
              time: "8 min ago",
              event: 'Featured room started: "Business Spanish"',
              type: "featured",
              icon: "Star",
            },
            {
              time: "15 min ago",
              event: 'Room completed: "French Pronunciation Practice"',
              type: "complete",
              icon: "CheckCircle",
            },
            {
              time: "23 min ago",
              event: 'Breakout rooms activated in "German Culture Talk"',
              type: "feature",
              icon: "Users2",
            },
          ]?.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity?.type === "create"
                    ? "bg-success/10 text-success"
                    : activity?.type === "join"
                    ? "bg-cultural-bridge/10 text-cultural-bridge"
                    : activity?.type === "featured"
                    ? "bg-cultural-energy/10 text-cultural-energy"
                    : activity?.type === "complete"
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <Icon name={activity?.icon} size={14} />
              </div>

              <div className="flex-1">
                <p className="text-sm text-foreground">{activity?.event}</p>
                <p className="text-xs text-muted-foreground">
                  {activity?.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomStats;
