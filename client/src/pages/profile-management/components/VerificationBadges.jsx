import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const VerificationBadges = ({ badges, onVerify }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const availableBadges = [
    {
      id: "identity",
      title: "身份验证",
      description: "通过身份证件验证你的真实身份",
      icon: "UserCheck",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      requirements: [
        "上传身份证正反面照片",
        "填写真实姓名和身份证号",
        "等待人工审核（1-3个工作日）",
      ],
      benefits: ["提高账户安全性", "获得更多用户信任", "解锁高级功能"],
    },
    {
      id: "language",
      title: "语言能力认证",
      description: "证明你的语言水平和教学能力",
      icon: "Award",
      color: "text-green-600",
      bgColor: "bg-green-100",
      requirements: [
        "上传语言证书（如托福、雅思、HSK等）",
        "通过在线语言能力测试",
        "提供语言学习或教学经历",
      ],
      benefits: ["成为认证语言伙伴", "优先匹配高质量用户", "获得平台推荐"],
    },
    {
      id: "educator",
      title: "教育工作者认证",
      description: "验证你的教育背景和专业资质",
      icon: "GraduationCap",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      requirements: [
        "上传教师资格证或相关证书",
        "提供教育机构工作证明",
        "完成专业能力评估",
      ],
      benefits: ["开设付费课程", "创建学习小组", "获得教育者专属功能"],
    },
    {
      id: "community",
      title: "社区贡献者",
      description: "表彰你对社区的积极贡献",
      icon: "Heart",
      color: "text-red-600",
      bgColor: "bg-red-100",
      requirements: [
        "累计帮助100+用户",
        "发布50+优质内容",
        "获得社区好评率95%以上",
      ],
      benefits: ["社区影响力徽章", "内容优先展示", "参与社区管理"],
    },
    {
      id: "cultural",
      title: "文化大使",
      description: "认可你在文化交流方面的专业知识",
      icon: "Globe",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      requirements: [
        "分享100+文化内容",
        "组织文化交流活动",
        "获得文化专业认可",
      ],
      benefits: ["文化活动优先权", "跨文化交流专家标识", "平台合作机会"],
    },
  ];

  const getBadgeStatus = (badgeId) => {
    const badge = badges?.find((b) => b?.id === badgeId);
    return badge ? badge?.status : "not_started";
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "verified":
        return {
          label: "已认证",
          color: "text-success",
          bgColor: "bg-success/10",
          icon: "CheckCircle",
        };
      case "pending":
        return {
          label: "审核中",
          color: "text-warning",
          bgColor: "bg-warning/10",
          icon: "Clock",
        };
      case "rejected":
        return {
          label: "未通过",
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          icon: "XCircle",
        };
      default:
        return {
          label: "未开始",
          color: "text-muted-foreground",
          bgColor: "bg-muted/30",
          icon: "Circle",
        };
    }
  };

  const handleStartVerification = (badgeId) => {
    onVerify(badgeId);
    setSelectedBadge(null);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Shield" className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">认证徽章</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableBadges?.map((badge) => {
          const status = getBadgeStatus(badge?.id);
          const statusInfo = getStatusInfo(status);

          return (
            <div
              key={badge?.id}
              className="relative p-4 border border-border rounded-lg hover:shadow-soft transition-all cursor-pointer"
              onClick={() =>
                setSelectedBadge(selectedBadge === badge?.id ? null : badge?.id)
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 ${badge?.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon name={badge?.icon} size={24} className={badge?.color} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground">
                      {badge?.title}
                    </h3>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusInfo?.bgColor}`}
                    >
                      <Icon
                        name={statusInfo?.icon}
                        size={12}
                        className={statusInfo?.color}
                      />
                      <span className={`text-xs ${statusInfo?.color}`}>
                        {statusInfo?.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {badge?.description}
                  </p>
                </div>
              </div>
              {selectedBadge === badge?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        认证要求:
                      </h4>
                      <ul className="space-y-1">
                        {badge?.requirements?.map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Icon
                              name="Check"
                              size={14}
                              className="text-primary mt-0.5 flex-shrink-0"
                            />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        认证收益:
                      </h4>
                      <ul className="space-y-1">
                        {badge?.benefits?.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Icon
                              name="Star"
                              size={14}
                              className="text-cultural-energy mt-0.5 flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {status === "not_started" && (
                      <Button
                        onClick={() => handleStartVerification(badge?.id)}
                        iconName="ArrowRight"
                        iconPosition="right"
                        className="w-full"
                      >
                        开始认证
                      </Button>
                    )}

                    {status === "pending" && (
                      <div className="p-3 bg-warning/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            name="Clock"
                            size={16}
                            className="text-warning"
                          />
                          <span className="text-sm font-medium text-warning">
                            审核进行中
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          我们正在审核你的认证材料，预计1-3个工作日内完成审核。
                        </p>
                      </div>
                    )}

                    {status === "rejected" && (
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            name="XCircle"
                            size={16}
                            className="text-destructive"
                          />
                          <span className="text-sm font-medium text-destructive">
                            认证未通过
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          很抱歉，你的认证材料未能通过审核。请检查材料是否完整和清晰。
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartVerification(badge?.id)}
                        >
                          重新提交
                        </Button>
                      </div>
                    )}

                    {status === "verified" && (
                      <div className="p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon
                            name="CheckCircle"
                            size={16}
                            className="text-success"
                          />
                          <span className="text-sm font-medium text-success">
                            认证成功
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          恭喜！你已成功获得此认证徽章，现在可以享受相应的特权和功能。
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Verification Progress */}
      <div className="mt-6 p-4 bg-cultural-trust/10 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-cultural-bridge" />
          <span className="font-medium text-cultural-bridge">认证进度</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">已完成认证</span>
          <span className="font-medium text-foreground">
            {badges?.filter((b) => b?.status === "verified")?.length} /{" "}
            {availableBadges?.length}
          </span>
        </div>

        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-cultural-bridge h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (badges?.filter((b) => b?.status === "verified")?.length /
                  availableBadges?.length) *
                100
              }%`,
            }}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          完成更多认证可以提高你的可信度，获得更好的匹配和更多功能权限
        </p>
      </div>
    </div>
  );
};

export default VerificationBadges;
