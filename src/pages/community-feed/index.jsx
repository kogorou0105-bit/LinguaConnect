import React, { useState, useEffect } from "react";
// import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import PostCard from "./components/PostCard";
import StoryCarousel from "./components/StoryCarousel";
import TrendingHashtags from "./components/TrendingHashtags";
import ChallengeCard from "./components/ChallengeCard";
import CreatePostModal from "./components/CreatePostModal";
import CulturalEventCard from "./components/CulturalEventCard";

const CommunityFeed = () => {
  const [activeTab, setActiveTab] = useState("following");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [culturalEvents, setCulturalEvents] = useState([]);

  // Mock data initialization
  useEffect(() => {
    // Mock posts data
    const mockPosts = [
      {
        id: 1,
        user: {
          name: "李小雨",
          avatar:
            "https://images.unsplash.com/photo-1652391584869-0408bf759537",
          avatarAlt:
            "Young Asian woman with long black hair smiling at camera in casual white top",
          location: "北京",
          isOnline: true,
          isVerified: true,
        },
        content: `今天和我的法国语伴Marie聊天，她教我用法语描述中国菜！🥟\n\n我们聊了饺子、麻婆豆腐，还有火锅。Marie说她特别想尝试正宗的川菜。语言交流真的是最好的文化桥梁！\n\n#语言学习 #文化交流 #法语练习`,
        languages: ["中文", "Français"],
        hashtags: ["语言学习", "文化交流", "法语练习"],
        media: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1684252794403-98dd876bb67a",
            alt: "Traditional Chinese dumplings on bamboo steamer with chopsticks and soy sauce",
          },
        ],

        timestamp: new Date(Date.now() - 1800000),
        likes: 127,
        comments: 23,
        shares: 8,
        isLiked: false,
      },
      {
        id: 2,
        user: {
          name: "田中太郎",
          avatar:
            "https://images.unsplash.com/photo-1588178457501-31b7688a41a0",
          avatarAlt:
            "Professional Japanese man in navy suit with short black hair and friendly smile",
          location: "东京",
          isOnline: false,
          isVerified: false,
        },
        content: `中国朋友们，大家好！🇯🇵\n\n我正在学习中文，今天学会了"加油"这个词。在日语中我们说"頑張って"，但是"加油"听起来更有力量！\n\n有没有中文母语者可以教我更多鼓励的话？我想在下次马拉松比赛时用中文为朋友加油！`,
        languages: ["中文", "日本語"],
        hashtags: ["中文学习", "日语交流", "马拉松"],
        media: [],
        timestamp: new Date(Date.now() - 3600000),
        likes: 89,
        comments: 34,
        shares: 12,
        isLiked: true,
      },
      {
        id: 3,
        user: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1552334588-6c2511e9f2cf",
          avatarAlt:
            "Blonde woman with blue eyes wearing casual denim jacket outdoors with natural lighting",
          location: "纽约",
          isOnline: true,
          isVerified: true,
        },
        content: `Learning Mandarin has been such an incredible journey! 🌟\n\n今天我终于能够用中文点餐了！服务员夸我发音很标准，我超级开心！\n\nShoutout to my language partner 王明 for being so patient with my tones. 谢谢你！`,
        languages: ["English", "中文"],
        hashtags: ["MandarinLearning", "中文学习", "LanguageExchange"],
        media: [
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1564119778592-4ba489af7ecb",
            alt: "Traditional Chinese restaurant interior with red lanterns and wooden tables",
          },
          {
            type: "image",
            url: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            alt: "Plate of authentic Chinese noodles with vegetables and chopsticks on wooden table",
          },
        ],

        timestamp: new Date(Date.now() - 7200000),
        likes: 156,
        comments: 41,
        shares: 15,
        isLiked: false,
      },
    ];

    // Mock stories data
    const mockStories = [
      {
        id: 1,
        user: {
          name: "小明",
          avatar:
            "https://images.unsplash.com/photo-1650622806331-9c54553efb05",
          avatarAlt:
            "Young Asian man with glasses and casual shirt smiling in modern office setting",
        },
        isViewed: false,
        isLive: true,
      },
      {
        id: 2,
        user: {
          name: "Emma",
          avatar:
            "https://images.unsplash.com/photo-1505897992121-96ada980273a",
          avatarAlt:
            "Young woman with curly brown hair wearing white sweater with warm smile",
        },
        isViewed: true,
        isLive: false,
      },
      {
        id: 3,
        user: {
          name: "Pierre",
          avatar: "https://images.unsplash.com/photo-1561719632-3a05ac56bc51",
          avatarAlt:
            "French man with beard wearing casual blue shirt in outdoor cafe setting",
        },
        isViewed: false,
        isLive: false,
      },
      {
        id: 4,
        user: {
          name: "Yuki",
          avatar:
            "https://images.unsplash.com/photo-1704860043801-9f2f9dfb3210",
          avatarAlt:
            "Japanese woman with short black hair in professional attire with gentle expression",
        },
        isViewed: false,
        isLive: false,
      },
      {
        id: 5,
        user: {
          name: "Carlos",
          avatar:
            "https://images.unsplash.com/photo-1633116180013-9230e78e98ca",
          avatarAlt:
            "Hispanic man with dark hair wearing casual green shirt with friendly smile",
        },
        isViewed: true,
        isLive: false,
      },
    ];

    // Mock trending hashtags
    const mockHashtags = [
      { tag: "语言学习", posts: 12847, trend: "up", growth: 15 },
      { tag: "文化交流", posts: 8932, trend: "up", growth: 8 },
      { tag: "英语口语", posts: 7654, trend: "down", growth: -3 },
      { tag: "日语学习", posts: 6543, trend: "up", growth: 12 },
      { tag: "法语练习", posts: 4321, trend: "stable", growth: 0 },
      { tag: "韩语入门", posts: 3876, trend: "up", growth: 25 },
    ];

    // Mock challenges
    const mockChallenges = [
      {
        id: 1,
        title: "30天英语口语挑战",
        category: "口语练习",
        description:
          "每天录制一段英语口语视频，分享你的学习心得和日常生活。坚持30天，提升口语表达能力！",
        icon: "Mic",
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        participants: 2847,
        progress: 65,
        isJoined: true,
        reward: "专属徽章 + 1个月高级会员",
        topParticipants: [
          {
            id: 1,
            name: "Alice",
            avatar:
              "https://images.unsplash.com/photo-1630473147136-fedd85b45f25",
            avatarAlt:
              "Young woman with long brown hair in professional headshot",
          },
          {
            id: 2,
            name: "Bob",
            avatar:
              "https://images.unsplash.com/photo-1674916973829-7147c6610bf0",
            avatarAlt:
              "Professional man with glasses in business casual attire",
          },
          {
            id: 3,
            name: "Chen",
            avatar:
              "https://images.unsplash.com/photo-1593032527598-55649fe534ac",
            avatarAlt: "Asian man in navy suit with confident expression",
          },
        ],
      },
      {
        id: 2,
        title: "文化美食分享周",
        category: "文化交流",
        description:
          "分享你家乡的特色美食，用目标语言介绍制作方法和文化背景。让美食成为语言学习的桥梁！",
        icon: "ChefHat",
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        participants: 1523,
        progress: 80,
        isJoined: false,
        reward: "美食达人称号 + 精美食谱集",
        topParticipants: [
          {
            id: 1,
            name: "Maria",
            avatar:
              "https://images.unsplash.com/photo-1595791110236-57388a565f21",
            avatarAlt: "Latina woman with warm smile in kitchen setting",
          },
          {
            id: 2,
            name: "Hiroshi",
            avatar:
              "https://images.unsplash.com/photo-1533540499377-cf2dec26c3d7",
            avatarAlt: "Japanese chef in traditional white uniform",
          },
          {
            id: 3,
            name: "Sophie",
            avatar:
              "https://images.unsplash.com/photo-1731758997066-443cbe7a3020",
            avatarAlt: "French woman with curly hair in casual cooking attire",
          },
        ],
      },
    ];

    // Mock cultural events
    const mockEvents = [
      {
        id: 1,
        title: "中秋节文化交流会",
        category: "传统节日",
        language: "多语言",
        description:
          "一起了解中秋节的传统习俗，学习相关词汇，品尝月饼，分享各国的类似节日文化。",
        image: "https://images.unsplash.com/photo-1560091806-1f856566d23a",
        imageAlt:
          "Traditional Chinese mooncakes arranged on wooden table with tea set and autumn decorations",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: "线上活动",
        duration: "2小时",
        participants: 156,
        isJoined: false,
        host: {
          name: "王老师",
          avatar:
            "https://images.unsplash.com/photo-1720873708731-596ff0523d4f",
          avatarAlt:
            "Middle-aged Chinese teacher in traditional clothing with warm expression",
          title: "文化交流导师",
          rating: 4.9,
        },
        participantAvatars: [
          {
            avatar:
              "https://images.unsplash.com/photo-1684303243725-8e23818a281c",
            avatarAlt: "Young Asian woman participant",
          },
          {
            avatar:
              "https://images.unsplash.com/photo-1642431940390-0483fb1fca73",
            avatarAlt: "Male participant with glasses",
          },
          {
            avatar:
              "https://images.unsplash.com/photo-1696918248787-55574a515c17",
            avatarAlt: "Female participant with blonde hair",
          },
        ],
      },
      {
        id: 2,
        title: "法语电影赏析会",
        category: "语言实践",
        language: "法语",
        description:
          "观看经典法语电影《天使爱美丽》，讨论剧情，学习地道法语表达，提升听力和口语能力。",
        image: "https://images.unsplash.com/photo-1610046101475-659f4c41a907",
        imageAlt:
          "Vintage French cinema interior with red velvet seats and classic movie posters",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        location: "线上观影厅",
        duration: "3小时",
        participants: 89,
        isJoined: true,
        host: {
          name: "Marie Dubois",
          avatar:
            "https://images.unsplash.com/photo-1708724175667-188d62ae235e",
          avatarAlt:
            "French woman with elegant style and warm smile in Parisian cafe",
          title: "法语母语导师",
          rating: 4.8,
        },
        participantAvatars: [
          {
            avatar:
              "https://images.unsplash.com/photo-1584968676846-b044262ffc0d",
            avatarAlt: "Male French language learner",
          },
          {
            avatar:
              "https://images.unsplash.com/photo-1654648062010-2a2fcc4c1f5c",
            avatarAlt: "Female French language enthusiast",
          },
        ],
      },
    ];

    setPosts(mockPosts);
    setStories(mockStories);
    setTrendingHashtags(mockHashtags);
    setChallenges(mockChallenges);
    setCulturalEvents(mockEvents);
  }, []);

  const tabs = [
    { id: "following", label: "关注", icon: "Users" },
    { id: "discover", label: "发现", icon: "Compass" },
    { id: "trending", label: "热门", icon: "TrendingUp" },
    { id: "challenges", label: "挑战", icon: "Trophy" },
    { id: "events", label: "活动", icon: "Calendar" },
  ];

  const handleLike = (postId, isLiked) => {
    setPosts((prev) =>
      prev?.map((post) =>
        post?.id === postId
          ? {
              ...post,
              isLiked,
              likes: isLiked ? post?.likes + 1 : post?.likes - 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId) => {
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId) => {
    console.log("Share post:", postId);
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: posts?.length + 1,
      user: {
        name: "我",
        avatar: "https://images.unsplash.com/photo-1548536095-f0a3e0dafcaf",
        avatarAlt: "Current user profile photo with friendly expression",
        location: "北京",
        isOnline: true,
        isVerified: false,
      },
      content: postData?.content,
      languages: postData?.languages,
      hashtags: postData?.hashtags,
      media: [],
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  const handleHashtagClick = (hashtag) => {
    console.log("Clicked hashtag:", hashtag);
  };

  const handleJoinChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev?.map((challenge) =>
        challenge?.id === challengeId
          ? { ...challenge, isJoined: !challenge?.isJoined }
          : challenge
      )
    );
  };

  const handleViewLeaderboard = (challengeId) => {
    console.log("View leaderboard for challenge:", challengeId);
  };

  const handleJoinEvent = (eventId) => {
    setCulturalEvents((prev) =>
      prev?.map((event) =>
        event?.id === eventId ? { ...event, isJoined: !event?.isJoined } : event
      )
    );
  };

  const handleShareEvent = (eventId) => {
    console.log("Share event:", eventId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "following":
      case "discover":
      case "trending":
        return (
          <div className="space-y-6">
            {posts?.map((post) => (
              <PostCard
                key={post?.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            ))}
          </div>
        );

      case "challenges":
        return (
          <div className="space-y-6">
            {challenges?.map((challenge) => (
              <ChallengeCard
                key={challenge?.id}
                challenge={challenge}
                onJoinChallenge={handleJoinChallenge}
                onViewLeaderboard={handleViewLeaderboard}
              />
            ))}
          </div>
        );

      case "events":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {culturalEvents?.map((event) => (
              <CulturalEventCard
                key={event?.id}
                event={event}
                onJoinEvent={handleJoinEvent}
                onShareEvent={handleShareEvent}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stories */}
              <div className="lg:hidden">
                <StoryCarousel
                  stories={stories}
                  onAddStory={() => console.log("Add story")}
                  onViewStory={(storyId) => console.log("View story:", storyId)}
                />
              </div>

              {/* Trending Hashtags */}
              <TrendingHashtags
                hashtags={trendingHashtags}
                onHashtagClick={handleHashtagClick}
              />

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4">社区数据</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      在线用户
                    </span>
                    <span className="font-medium text-success">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      今日动态
                    </span>
                    <span className="font-medium text-foreground">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      活跃语言
                    </span>
                    <span className="font-medium text-foreground">28</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Stories for Desktop */}
              <div className="hidden lg:block mb-6">
                <StoryCarousel
                  stories={stories}
                  onAddStory={() => console.log("Add story")}
                  onViewStory={(storyId) => console.log("View story:", storyId)}
                />
              </div>

              {/* Create Post Button */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="w-full flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-cultural-gradient rounded-full flex items-center justify-center">
                    <Icon name="Plus" size={20} className="text-white" />
                  </div>
                  <span className="text-muted-foreground">
                    分享你的语言学习心得...
                  </span>
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-xl p-1 mb-6">
                <div className="flex space-x-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                        activeTab === tab?.id
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              {renderContent()}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Language Learning Tips */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon
                    name="Lightbulb"
                    size={20}
                    className="text-cultural-energy"
                  />
                  <h3 className="font-semibold text-foreground">学习小贴士</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-cultural-trust/10 rounded-lg">
                    <p className="text-sm text-foreground font-medium mb-1">
                      每日词汇挑战
                    </p>
                    <p className="text-xs text-muted-foreground">
                      学习5个新单词，在对话中使用它们
                    </p>
                  </div>
                  <div className="p-3 bg-cultural-energy/10 rounded-lg">
                    <p className="text-sm text-foreground font-medium mb-1">
                      发音练习
                    </p>
                    <p className="text-xs text-muted-foreground">
                      录制语音消息，获得母语者反馈
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggested Connections */}
              <div className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-4">推荐关注</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Anna Schmidt",
                      avatar:
                        "https://images.unsplash.com/photo-1686078383193-6de51f909135",
                      avatarAlt:
                        "German language teacher with professional appearance",
                      language: "德语母语者",
                      mutual: 12,
                    },
                    {
                      name: "김민수",
                      avatar:
                        "https://images.unsplash.com/photo-1676083192960-2a4873858487",
                      avatarAlt:
                        "Korean language exchange partner with friendly smile",
                      language: "韩语母语者",
                      mutual: 8,
                    },
                    {
                      name: "Isabella Rosa",
                      avatar:
                        "https://images.unsplash.com/photo-1590650213165-c1fef80648c4",
                      avatarAlt: "Spanish language tutor with warm expression",
                      language: "西班牙语母语者",
                      mutual: 15,
                    },
                  ]?.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.avatar}
                          alt={user?.avatarAlt}
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {user?.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user?.language}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        关注
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">社区公约</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 尊重不同文化背景</p>
                  <p>• 耐心帮助语言学习者</p>
                  <p>• 分享真实学习体验</p>
                  <p>• 保持友善交流氛围</p>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  查看完整公约
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          onClick={() => setIsCreatePostOpen(true)}
          className="w-14 h-14 rounded-full shadow-cultural"
          iconName="Plus"
        />
      </div>
    </div>
  );
};

export default CommunityFeed;
