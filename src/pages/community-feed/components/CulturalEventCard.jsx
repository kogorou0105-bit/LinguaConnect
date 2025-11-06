import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CulturalEventCard = ({ event, onJoinEvent, onShareEvent }) => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const month = date?.getMonth() + 1;
    const day = date?.getDate();
    const hour = date?.getHours();
    const minute = date?.getMinutes();

    return {
      date: `${month}月${day}日`,
      time: `${hour?.toString()?.padStart(2, "0")}:${minute
        ?.toString()
        ?.padStart(2, "0")}`,
    };
  };

  const getEventStatus = () => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const diffInHours = (eventDate - now) / (1000 * 60 * 60);

    if (diffInHours < 0)
      return {
        status: "ended",
        text: "已结束",
        color: "text-muted-foreground",
      };
    if (diffInHours < 1)
      return { status: "live", text: "进行中", color: "text-cultural-warm" };
    if (diffInHours < 24)
      return {
        status: "soon",
        text: "即将开始",
        color: "text-cultural-energy",
      };
    return { status: "upcoming", text: "即将举行", color: "text-primary" };
  };

  const eventStatus = getEventStatus();
  const { date, time } = formatEventDate(event?.date);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-medium transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Event Status Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium bg-white/90 ${eventStatus?.color}`}
          >
            {eventStatus?.text}
          </div>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-2 text-center">
          <div className="text-xs text-muted-foreground">{date}</div>
          <div className="text-sm font-semibold text-foreground">{time}</div>
        </div>

        {/* Live Indicator */}
        {eventStatus?.status === "live" && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-cultural-warm text-white px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full cultural-pulse"></div>
            <span className="text-xs font-medium">直播中</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {/* Event Title & Category */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-cultural-bridge/20 text-cultural-bridge text-xs font-medium rounded-full">
              {event?.category}
            </span>
            <span className="px-2 py-1 bg-cultural-energy/20 text-cultural-cta text-xs font-medium rounded-full">
              {event?.language}
            </span>
          </div>
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {event?.title}
          </h3>
        </div>

        {/* Event Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {event?.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>{event?.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>{event?.participants?.toLocaleString()} 人参与</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>预计时长 {event?.duration}</span>
          </div>
        </div>

        {/* Host Information */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <Image
            src={event?.host?.avatar}
            alt={event?.host?.avatarAlt}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-foreground text-sm">
              {event?.host?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {event?.host?.title}
            </p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center space-x-1 text-xs text-cultural-energy">
              <Icon name="Star" size={12} className="fill-current" />
              <span>{event?.host?.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant={event?.isJoined ? "outline" : "default"}
            size="sm"
            onClick={() => onJoinEvent(event?.id)}
            iconName={event?.isJoined ? "Check" : "Calendar"}
            className="flex-1"
            disabled={eventStatus?.status === "ended"}
          >
            {event?.isJoined ? "已报名" : "参与活动"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShareEvent(event?.id)}
            iconName="Share2"
          />
        </div>

        {/* Participants Preview */}
        {event?.participantAvatars && event?.participantAvatars?.length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {event?.participantAvatars
                  ?.slice(0, 4)
                  ?.map((participant, index) => (
                    <Image
                      key={index}
                      src={participant?.avatar}
                      alt={participant?.avatarAlt}
                      className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                {event?.participantAvatars?.length > 4 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-muted-foreground font-medium">
                      +{event?.participantAvatars?.length - 4}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                和其他 {event?.participants - 1} 人
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalEventCard;
