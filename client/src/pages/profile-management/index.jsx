import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProfileHeader from "./components/ProfileHeader";
import LanguageSkills from "./components/LanguageSkills";
import CulturalInterests from "./components/CulturalInterests";
import LearningGoals from "./components/LearningGoals";
import AvailabilitySchedule from "./components/AvailabilitySchedule";
import PrivacySettings from "./components/PrivacySettings";
import VerificationBadges from "./components/VerificationBadges";

const ProfileManagement = () => {
  // Mock user profile data
  const [profile] = useState({
    id: 1,
    name: "李小明",
    username: "xiaoming_li",
    avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
    avatarAlt:
      "Professional headshot of young Asian man with short black hair wearing navy blue shirt",
    location: "北京, 中国",
    bio: "热爱语言学习的软件工程师，希望通过语言交流结识来自世界各地的朋友。我对中西方文化差异很感兴趣，也乐于分享中国文化。目前正在学习英语和日语，希望能在轻松愉快的氛围中提高口语水平。",
    isVerified: true,
    stats: {
      conversations: 156,
      friends: 89,
      streak: 23,
    },
  });

  const [languages, setLanguages] = useState([
    {
      id: 1,
      language: "中文（普通话）",
      proficiency: "native",
      proficiencyLevel: 5,
      isLearning: false,
      flag: "🇨🇳",
    },
    {
      id: 2,
      language: "英语",
      proficiency: "intermediate",
      proficiencyLevel: 3,
      isLearning: true,
      flag: "🇺🇸",
    },
    {
      id: 3,
      language: "日语",
      proficiency: "elementary",
      proficiencyLevel: 2,
      isLearning: true,
      flag: "🇯🇵",
    },
  ]);

  const [interests, setInterests] = useState([
    "technology",
    "travel",
    "food",
    "music",
    "movies",
    "photography",
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      type: "conversation",
      description: "能够流利地进行日常英语对话，特别是在工作场景中",
      targetDate: "2025-06-01",
      progress: 65,
      isActive: true,
    },
    {
      id: 2,
      type: "travel",
      description: "为明年的日本旅行做准备，学会基本的日语交流",
      targetDate: "2025-03-15",
      progress: 30,
      isActive: true,
    },
  ]);

  const [schedule, setSchedule] = useState({
    monday: { morning: false, afternoon: false, evening: true },
    tuesday: { morning: false, afternoon: true, evening: true },
    wednesday: { morning: false, afternoon: false, evening: true },
    thursday: { morning: false, afternoon: true, evening: false },
    friday: { morning: false, afternoon: false, evening: true },
    saturday: { morning: true, afternoon: true, evening: true },
    sunday: { morning: true, afternoon: true, evening: false },
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "friends",
    contactInfo: "limited",
    onlineStatus: "visible",
    messageRequests: "friends",
    showLearningProgress: true,
    allowFriendRequests: true,
    showActivity: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [badges] = useState([
    { id: "identity", status: "verified" },
    { id: "language", status: "pending" },
    { id: "educator", status: "not_started" },
    { id: "community", status: "not_started" },
    { id: "cultural", status: "rejected" },
  ]);

  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "基本信息", icon: "User" },
    { id: "languages", label: "语言技能", icon: "Globe" },
    { id: "interests", label: "兴趣爱好", icon: "Heart" },
    { id: "goals", label: "学习目标", icon: "Target" },
    { id: "schedule", label: "可用时间", icon: "Clock" },
    { id: "privacy", label: "隐私设置", icon: "Shield" },
    { id: "badges", label: "认证徽章", icon: "Award" },
  ];

  const handleEditProfile = () => {
    // Handle profile editing
    console.log("Edit profile clicked");
  };

  const handleVerifyProfile = () => {
    // Handle profile verification
    console.log("Verify profile clicked");
  };

  const handleVerifyBadge = (badgeId) => {
    // Handle badge verification
    console.log("Verify badge:", badgeId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileHeader
            profile={profile}
            onEdit={handleEditProfile}
            onVerify={handleVerifyProfile}
          />
        );

      case "languages":
        return <LanguageSkills languages={languages} onUpdate={setLanguages} />;

      case "interests":
        return (
          <CulturalInterests interests={interests} onUpdate={setInterests} />
        );

      case "goals":
        return <LearningGoals goals={goals} onUpdate={setGoals} />;

      case "schedule":
        return (
          <AvailabilitySchedule schedule={schedule} onUpdate={setSchedule} />
        );

      case "privacy":
        return (
          <PrivacySettings
            settings={privacySettings}
            onUpdate={setPrivacySettings}
          />
        );

      case "badges":
        return (
          <VerificationBadges badges={badges} onVerify={handleVerifyBadge} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-foreground transition-colors">
                首页
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span>个人资料管理</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">个人资料管理</h1>
            <p className="text-muted-foreground mt-2">
              完善你的个人资料，让其他用户更好地了解你，建立有意义的语言学习连接
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab?.id
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-medium text-foreground mb-3">
                    资料完整度
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">基本信息</span>
                      <span className="font-medium text-success">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">语言技能</span>
                      <span className="font-medium text-success">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">兴趣爱好</span>
                      <span className="font-medium text-success">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">学习目标</span>
                      <span className="font-medium text-warning">75%</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">总体完成度</span>
                      <span className="font-medium text-foreground">94%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-success h-2 rounded-full w-[94%] transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">{renderTabContent()}</div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              className="min-w-[140px]"
            >
              预览资料
            </Button>
            <Button
              iconName="Share"
              iconPosition="left"
              className="min-w-[140px]"
            >
              分享资料
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="min-w-[140px]"
            >
              导出数据
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
