import React, { useState, useEffect, useRef } from "react";
// import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ConversationList from "./components/ConversationList";
import ConversationHeader from "./components/ConversationHeader";
import MessageBubble from "./components/MessageBubble";
import MessageInput from "./components/MessageInput";
import ConversationInfo from "./components/ConversationInfo";
import CallInterface from "./components/CallInterface";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: "李小明",
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      avatarAlt:
        "Professional headshot of young Asian man with short black hair wearing white shirt",
      lastMessage: "你好！我想练习中文对话，可以帮助我吗？",
      lastMessageType: "text",
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isOnline: true,
      isGroup: false,
      languages: ["中文", "英语"],
      isVerified: true,
      isPinned: true,
      hasTranslation: true,
      connectionQuality: "excellent",
    },
    {
      id: 2,
      name: "英语学习小组",
      avatar: "https://images.unsplash.com/photo-1728404059702-259bae4265a6",
      avatarAlt: "Group chat avatar showing diverse group of language learners",
      lastMessage: "Sarah: 今天的发音练习很有帮助！",
      lastMessageType: "text",
      timestamp: new Date(Date.now() - 900000),
      unreadCount: 5,
      isOnline: false,
      isGroup: true,
      memberCount: 12,
      languages: ["英语", "中文"],
      isPinned: false,
      hasTranslation: true,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507532459814-b32f63cf4497",
      avatarAlt:
        "Professional headshot of Hispanic woman with long brown hair smiling warmly",
      lastMessage: "¡Hola! ¿Podemos practicar español juntos?",
      lastMessageType: "voice",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      isOnline: true,
      isGroup: false,
      languages: ["西班牙语", "英语"],
      isVerified: false,
      isPinned: false,
      hasTranslation: true,
      lastSeen: "2小时前",
    },
    {
      id: 4,
      name: "田中太郎",
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt:
        "Professional headshot of middle-aged Japanese man with glasses wearing navy suit",
      lastMessage: "写真を送りました",
      lastMessageType: "image",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 1,
      isOnline: false,
      isGroup: false,
      languages: ["日语", "英语"],
      isVerified: true,
      isPinned: false,
      hasTranslation: true,
      lastSeen: "1小时前",
      isMuted: true,
    },
  ];

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 1,
      type: "system",
      content: "对话已启用端到端加密",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      type: "text",
      content: "你好！很高兴认识你。我正在学习中文，希望能和你练习对话。",
      sender: "李小明",
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      avatarAlt:
        "Professional headshot of young Asian man with short black hair wearing white shirt",
      timestamp: new Date(Date.now() - 7200000),
      isOwn: false,
      status: "read",
      translation:
        "Hello! Nice to meet you. I'm learning Chinese and hope to practice conversation with you.",
    },
    {
      id: 3,
      type: "text",
      content: "你好！当然可以，我很乐意帮助你练习中文。你学中文多长时间了？",
      sender: "我",
      timestamp: new Date(Date.now() - 7000000),
      isOwn: true,
      status: "read",
    },
    {
      id: 4,
      type: "voice",
      content: "语音消息",
      sender: "李小明",
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      avatarAlt:
        "Professional headshot of young Asian man with short black hair wearing white shirt",
      timestamp: new Date(Date.now() - 6800000),
      isOwn: false,
      status: "read",
      duration: "0:15",
      transcription: "我学中文大概六个月了，但是口语还需要很多练习。",
      progress: 0,
    },
    {
      id: 5,
      type: "image",
      content: "图片消息",
      sender: "我",
      timestamp: new Date(Date.now() - 6600000),
      isOwn: true,
      status: "read",
      imageUrl: "https://images.unsplash.com/photo-1608046878377-12e92b23e6e9",
      imageAlt:
        "Photo of Chinese calligraphy practice with brush and ink on traditional paper",
      caption: "这是我今天练习的书法，你觉得怎么样？",
    },
    {
      id: 6,
      type: "text",
      content: "哇，你的书法写得很好！我也想学书法，你能教我一些基本的笔画吗？",
      sender: "李小明",
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      avatarAlt:
        "Professional headshot of young Asian man with short black hair wearing white shirt",
      timestamp: new Date(Date.now() - 6400000),
      isOwn: false,
      status: "read",
      isBookmarked: true,
    },
    {
      id: 7,
      type: "file",
      content: "文件消息",
      sender: "我",
      timestamp: new Date(Date.now() - 6200000),
      isOwn: true,
      status: "delivered",
      fileName: "书法基础教程.pdf",
      fileSize: "2.4 MB",
    },
  ];

  useEffect(() => {
    if (selectedConversation) {
      setIsLoading(true);
      // Simulate loading messages
      setTimeout(() => {
        setMessages(mockMessages);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowInfo(false);
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      ...messageData,
      id: messages?.length + 1,
      sender: "我",
      isOwn: true,
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) =>
        prev?.map((msg) =>
          msg?.id === newMessage?.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    // Simulate read receipt
    setTimeout(() => {
      setMessages((prev) =>
        prev?.map((msg) =>
          msg?.id === newMessage?.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 2000);
  };

  const handleStartCall = (type) => {
    if (selectedConversation) {
      setActiveCall({
        id: Date.now(),
        type: type, // 'voice' or 'video'
        participant: {
          name: selectedConversation?.name,
          avatar: selectedConversation?.avatar,
          avatarAlt: selectedConversation?.avatarAlt,
          languages: selectedConversation?.languages,
        },
        status: "calling",
        startTime: new Date(),
      });
    }
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleReplyToMessage = (message) => {
    // Focus on input and add reply context
    console.log("Replying to:", message);
  };

  const handleTranslateMessage = (messageId) => {
    console.log("Translating message:", messageId);
  };

  const handleBookmarkMessage = (message) => {
    setMessages((prev) =>
      prev?.map((msg) =>
        msg?.id === message?.id
          ? { ...msg, isBookmarked: !msg?.isBookmarked }
          : msg
      )
    );
  };

  const handleSearchMessages = (query) => {
    console.log("Searching messages:", query);
  };

  if (activeCall) {
    return (
      <CallInterface
        call={activeCall}
        onEndCall={handleEndCall}
        onToggleMute={(muted) => console.log("Mute:", muted)}
        onToggleVideo={(video) => console.log("Video:", video)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="pt-16 h-screen flex">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-border flex flex-col bg-background">
          {/* Search Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-xl font-semibold text-foreground">消息</h1>
              <Button variant="ghost" size="sm" iconName="Edit3" />
            </div>

            <div className="relative">
              <Input
                type="search"
                placeholder="搜索对话..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10"
              />

              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            searchQuery={searchQuery}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <ConversationHeader
                conversation={selectedConversation}
                onStartVoiceCall={() => handleStartCall("voice")}
                onStartVideoCall={() => handleStartCall("video")}
                onToggleInfo={() => setShowInfo(!showInfo)}
                onSearchMessages={handleSearchMessages}
              />

              {/* Messages Area */}
              <div className="flex-1 flex">
                <div className="flex-1 flex flex-col">
                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <span>加载消息中...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages?.map((message) => (
                          <MessageBubble
                            key={message?.id}
                            message={message}
                            isOwn={message?.isOwn}
                            onReply={handleReplyToMessage}
                            onTranslate={handleTranslateMessage}
                            onBookmark={handleBookmarkMessage}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <MessageInput
                    onSendMessage={handleSendMessage}
                    onStartVoiceCall={() => handleStartCall("voice")}
                    onStartVideoCall={() => handleStartCall("video")}
                    disabled={isLoading}
                  />
                </div>

                {/* Conversation Info Sidebar */}
                <ConversationInfo
                  conversation={selectedConversation}
                  onClose={() => setShowInfo(false)}
                  isVisible={showInfo}
                />
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="w-24 h-24 bg-cultural-gradient rounded-full flex items-center justify-center mx-auto mb-6 cultural-float">
                  <Icon name="MessageCircle" size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  欢迎来到 LinguaConnect
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  选择一个对话开始练习语言，或者寻找新的语言伙伴。
                  每次对话都是学习的机会！
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="default"
                    iconName="Search"
                    iconPosition="left"
                  >
                    寻找语言伙伴
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Users"
                    iconPosition="left"
                  >
                    加入群组对话
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-cultural-bridge">
                      2,847
                    </div>
                    <div className="text-xs text-muted-foreground">
                      在线用户
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-cultural-energy">
                      156
                    </div>
                    <div className="text-xs text-muted-foreground">
                      活跃对话
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-cultural-cta">
                      23
                    </div>
                    <div className="text-xs text-muted-foreground">
                      语言类型
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
