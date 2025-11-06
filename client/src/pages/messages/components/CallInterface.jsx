import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const CallInterface = ({ call, onEndCall, onToggleMute, onToggleVideo }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(call?.type === "video");
  const [connectionQuality] = useState("excellent");

  useEffect(() => {
    if (call?.status === "connected") {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [call?.status]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, "0")}:${secs
      ?.toString()
      ?.padStart(2, "0")}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onToggleMute?.(!isMuted);
  };

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
    onToggleVideo?.(!isVideoOn);
  };

  if (!call) return null;

  const renderCallStatus = () => {
    switch (call?.status) {
      case "calling":
        return (
          <div className="text-center">
            <div className="text-lg font-medium text-foreground mb-2">
              正在呼叫...
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-cultural-bridge rounded-full cultural-pulse"></div>
              <span>等待对方接听</span>
            </div>
          </div>
        );
      case "ringing":
        return (
          <div className="text-center">
            <div className="text-lg font-medium text-foreground mb-2">来电</div>
            <div className="text-sm text-muted-foreground mb-6">
              {call?.type === "video" ? "视频通话" : "语音通话"}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="destructive"
                size="lg"
                iconName="PhoneOff"
                onClick={onEndCall}
                className="rounded-full w-16 h-16"
              />
              <Button
                variant="default"
                size="lg"
                iconName="Phone"
                onClick={() => call?.onAccept?.()}
                className="rounded-full w-16 h-16 bg-success hover:bg-success/90"
              />
            </div>
          </div>
        );
      case "connected":
        return (
          <div className="text-center">
            <div className="text-lg font-medium text-foreground mb-1">
              {formatDuration(callDuration)}
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div
                className={`w-2 h-2 rounded-full ${
                  connectionQuality === "excellent"
                    ? "bg-success"
                    : connectionQuality === "good"
                    ? "bg-warning"
                    : "bg-destructive"
                }`}
              ></div>
              <span>
                {connectionQuality === "excellent"
                  ? "连接优秀"
                  : connectionQuality === "good"
                  ? "连接良好"
                  : "连接较差"}
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Video Area */}
      {call?.type === "video" && call?.status === "connected" && (
        <div className="flex-1 relative bg-gray-900">
          {/* Remote Video */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {isVideoOn ? (
              <div className="text-white text-center">
                <Icon
                  name="Video"
                  size={48}
                  className="mb-4 mx-auto opacity-50"
                />
                <p className="text-lg">对方的视频</p>
              </div>
            ) : (
              <div className="text-center">
                <Image
                  src={call?.participant?.avatar}
                  alt={call?.participant?.avatarAlt}
                  className="w-32 h-32 rounded-full object-cover mb-4 mx-auto"
                />
                <p className="text-white text-lg">{call?.participant?.name}</p>
              </div>
            )}
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden">
            {isVideoOn ? (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <Icon name="User" size={24} className="text-white opacity-50" />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                <Icon
                  name="VideoOff"
                  size={24}
                  className="text-white opacity-50"
                />
              </div>
            )}
          </div>

          {/* Call Info Overlay */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="text-white text-sm font-medium">
              {call?.participant?.name}
            </div>
            {renderCallStatus()}
          </div>
        </div>
      )}
      {/* Audio Call Interface */}
      {(call?.type === "voice" || call?.status !== "connected") && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-cultural-bridge/20 to-cultural-warm/20 p-8">
          {/* Participant Avatar */}
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden cultural-float">
              <Image
                src={call?.participant?.avatar}
                alt={call?.participant?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {call?.status === "connected" && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Phone" size={16} className="text-white" />
              </div>
            )}
          </div>

          {/* Participant Info */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {call?.participant?.name}
            </h2>
            {call?.participant?.languages && (
              <div className="flex justify-center space-x-2">
                {call?.participant?.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cultural-trust/20 text-cultural-bridge text-sm rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Call Status */}
          {renderCallStatus()}
        </div>
      )}
      {/* Call Controls */}
      <div className="bg-background/95 backdrop-blur-sm border-t border-border p-6">
        <div className="flex items-center justify-center space-x-6">
          {/* Mute Button */}
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="lg"
            iconName={isMuted ? "MicOff" : "Mic"}
            onClick={handleMuteToggle}
            className="rounded-full w-14 h-14"
          />

          {/* Video Toggle (for video calls) */}
          {call?.type === "video" && (
            <Button
              variant={!isVideoOn ? "destructive" : "outline"}
              size="lg"
              iconName={isVideoOn ? "Video" : "VideoOff"}
              onClick={handleVideoToggle}
              className="rounded-full w-14 h-14"
            />
          )}

          {/* End Call Button */}
          <Button
            variant="destructive"
            size="lg"
            iconName="PhoneOff"
            onClick={onEndCall}
            className="rounded-full w-16 h-16"
          />

          {/* Speaker Button */}
          <Button
            variant="outline"
            size="lg"
            iconName="Volume2"
            className="rounded-full w-14 h-14"
          />

          {/* More Options */}
          <Button
            variant="outline"
            size="lg"
            iconName="MoreHorizontal"
            className="rounded-full w-14 h-14"
          />
        </div>

        {/* Additional Controls */}
        {call?.status === "connected" && (
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-muted-foreground">
            <button className="flex items-center space-x-2 hover:text-foreground transition-colors">
              <Icon name="MessageCircle" size={16} />
              <span>发送消息</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-foreground transition-colors">
              <Icon name="Users" size={16} />
              <span>添加参与者</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-foreground transition-colors">
              <Icon name="Share" size={16} />
              <span>共享屏幕</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallInterface;
