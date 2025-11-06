import React, { useState } from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProfileHeader = ({ profile, onEdit, onVerify }) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(profile?.bio);

  const handleSaveBio = () => {
    setIsEditingBio(false);
    // Save bio logic would go here
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-cultural">
      {/* Cover Photo */}
      <div className="relative h-32 -m-6 mb-6 rounded-t-xl overflow-hidden bg-cultural-gradient">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Camera"
            className="bg-black/20 text-white hover:bg-black/40"
          >
            更换封面
          </Button>
        </div>
      </div>
      {/* Profile Info */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-medium">
              <Image
                src={profile?.avatar}
                alt={profile?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-soft hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
            </button>
            {profile?.isVerified && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} />
              </div>
            )}
          </div>

          <div className="mt-4 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <h1 className="text-xl font-bold text-foreground">
                {profile?.name}
              </h1>
              {profile?.isVerified && (
                <Icon name="BadgeCheck" size={20} className="text-success" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              @{profile?.username}
            </p>
            <div className="flex items-center gap-1 mt-1 justify-center lg:justify-start">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {profile?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bio and Stats */}
        <div className="flex-1">
          {/* Bio Section */}
          <div className="mb-4">
            {isEditingBio ? (
              <div className="space-y-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e?.target?.value)}
                  className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  placeholder="介绍一下你自己..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveBio}>
                    保存
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingBio(false)}
                  >
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <div className="group">
                <p className="text-foreground leading-relaxed">{bio}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit2"
                  onClick={() => setIsEditingBio(true)}
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  编辑简介
                </Button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {profile?.stats?.conversations}
              </div>
              <div className="text-xs text-muted-foreground">对话次数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {profile?.stats?.friends}
              </div>
              <div className="text-xs text-muted-foreground">好友</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {profile?.stats?.streak}
              </div>
              <div className="text-xs text-muted-foreground">连续天数</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={onEdit} iconName="Edit" iconPosition="left">
              编辑资料
            </Button>
            {!profile?.isVerified && (
              <Button
                variant="outline"
                onClick={onVerify}
                iconName="Shield"
                iconPosition="left"
              >
                身份验证
              </Button>
            )}
            <Button variant="outline" iconName="Share">
              分享资料
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
