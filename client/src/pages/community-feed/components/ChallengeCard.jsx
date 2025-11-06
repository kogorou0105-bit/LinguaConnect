import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ChallengeCard = ({ challenge, onJoinChallenge, onViewLeaderboard }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 50) return "bg-cultural-energy";
    return "bg-cultural-warm";
  };

  const formatTimeLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffInHours = Math.ceil((end - now) / (1000 * 60 * 60));

    if (diffInHours < 24) return `${diffInHours}小时`;
    return `${Math.ceil(diffInHours / 24)}天`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-4 hover:shadow-medium transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-cultural-gradient rounded-xl flex items-center justify-center">
            <Icon name={challenge?.icon} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {challenge?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {challenge?.category}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-cultural-cta">
            剩余 {formatTimeLeft(challenge?.endDate)}
          </p>
          <p className="text-xs text-muted-foreground">
            {challenge?.participants?.toLocaleString()} 人参与
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {challenge?.description}
      </p>
      {/* Challenge Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">挑战进度</span>
          <span className="text-sm text-muted-foreground">
            {challenge?.progress}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
              challenge?.progress
            )}`}
            style={{ width: `${challenge?.progress}%` }}
          ></div>
        </div>
      </div>
      {/* Top Participants */}
      <div className="mb-4">
        <p className="text-sm font-medium text-foreground mb-2">排行榜前三</p>
        <div className="flex items-center space-x-2">
          {challenge?.topParticipants?.map((participant, index) => (
            <div key={participant?.id} className="flex items-center space-x-1">
              <div className="relative">
                <Image
                  src={participant?.avatar}
                  alt={participant?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-cultural-energy rounded-full flex items-center justify-center">
                    <Icon
                      name="Crown"
                      size={10}
                      className="text-cultural-cta"
                    />
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {participant?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Reward */}
      <div className="bg-cultural-trust/10 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Gift" size={16} className="text-cultural-cta" />
          <span className="text-sm font-medium text-foreground">挑战奖励</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {challenge?.reward}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <Button
          variant={challenge?.isJoined ? "outline" : "default"}
          size="sm"
          onClick={() => onJoinChallenge(challenge?.id)}
          iconName={challenge?.isJoined ? "Check" : "Plus"}
          className="flex-1"
        >
          {challenge?.isJoined ? "已参与" : "参与挑战"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewLeaderboard(challenge?.id)}
          iconName="Trophy"
        >
          排行榜
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;
