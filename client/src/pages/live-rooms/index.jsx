import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RoomCard from "./components/RoomCard";
import RoomFilters from "./components/RoomFilters";
import CreateRoomModal from "./components/CreateRoomModal";
import QuickJoinSection from "./components/QuickJoinSection";
import FeaturedRooms from "./components/FeaturedRooms";
import RoomStats from "./components/RoomStats";

const LiveRooms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    language: "all",
    level: "all",
    topic: "all",
    sortBy: "popular",
    roomTypes: [],
    participantRange: null,
    features: [],
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState("all"); // 'all', 'featured', 'stats'

  // Mock rooms data
  const [rooms, setRooms] = useState([
    {
      id: "1",
      title: "English Conversation Practice",
      description:
        "Casual English conversation for intermediate learners. We discuss daily topics, current events, and practice pronunciation together.",
      language: "English",
      level: "Intermediate",
      topic: "Daily Life",
      currentParticipants: 8,
      maxParticipants: 15,
      duration: "60 min",
      isLive: true,
      isFeatured: false,
      tags: ["conversation", "pronunciation", "daily-life"],
      moderator: {
        id: "mod-1",
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
        avatarAlt:
          "Professional headshot of Asian woman with long black hair in white blouse",
      },
      participants: [
        {
          id: "p1",
          avatar:
            "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
          avatarAlt:
            "Professional headshot of Asian man with short black hair in navy suit",
        },
        {
          id: "p2",
          avatar:
            "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
          avatarAlt:
            "Professional headshot of young man with brown hair in casual shirt",
        },
      ],

      features: ["noise-suppression", "chat"],
    },
    {
      id: "2",
      title: "Chinese Business Language",
      description:
        "Learn professional Chinese vocabulary and business communication skills. Perfect for career development.",
      language: "Chinese",
      level: "Advanced",
      topic: "Business",
      currentParticipants: 12,
      maxParticipants: 20,
      duration: "90 min",
      isLive: true,
      isFeatured: true,
      tags: ["business", "professional", "vocabulary"],
      moderator: {
        id: "mod-2",
        name: "David Wang",
        avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
        avatarAlt:
          "Professional headshot of Asian man with glasses in white shirt",
      },
      participants: [
        {
          id: "p3",
          avatar:
            "https://images.unsplash.com/photo-1582903165064-c0f584740d9a",
          avatarAlt:
            "Professional headshot of Hispanic woman with curly brown hair in red blazer",
        },
      ],

      features: ["screen-sharing", "breakout-rooms", "whiteboard"],
    },
    {
      id: "3",
      title: "Spanish Culture Exchange",
      description:
        "Explore Spanish-speaking cultures while practicing conversation. Share traditions, food, and customs from different countries.",
      language: "Spanish",
      level: "Beginner",
      topic: "Culture",
      currentParticipants: 6,
      maxParticipants: 12,
      duration: "45 min",
      isLive: true,
      isFeatured: false,
      tags: ["culture", "traditions", "exchange"],
      moderator: {
        id: "mod-3",
        name: "Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
        avatarAlt:
          "Professional headshot of middle-aged woman with blonde hair in navy blazer",
      },
      participants: [],
      features: ["chat", "screen-sharing"],
    },
    {
      id: "4",
      title: "French Pronunciation Workshop",
      description:
        "Master French pronunciation with native speakers. Focus on difficult sounds and accent improvement.",
      language: "French",
      level: "Intermediate",
      topic: "Education",
      currentParticipants: 15,
      maxParticipants: 15,
      duration: "75 min",
      isLive: true,
      isFeatured: false,
      tags: ["pronunciation", "accent", "workshop"],
      moderator: {
        id: "mod-4",
        name: "Pierre Dubois",
        avatar: "https://images.unsplash.com/photo-1609770653328-a4d1dd377970",
        avatarAlt:
          "Professional headshot of young man with beard in casual shirt",
      },
      participants: [
        {
          id: "p4",
          avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
          avatarAlt:
            "Professional headshot of Asian woman with long black hair in white blouse",
        },
        {
          id: "p5",
          avatar:
            "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
          avatarAlt:
            "Professional headshot of Asian man with short black hair in navy suit",
        },
      ],

      features: ["noise-suppression", "recording"],
    },
    {
      id: "5",
      title: "German Tech Talk",
      description:
        "Discuss technology trends and innovations in German. Great for IT professionals and tech enthusiasts.",
      language: "German",
      level: "Advanced",
      topic: "Technology",
      currentParticipants: 9,
      maxParticipants: 18,
      duration: "120 min",
      isLive: true,
      isFeatured: true,
      tags: ["technology", "innovation", "professional"],
      moderator: {
        id: "mod-5",
        name: "Klaus Mueller",
        avatar: "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
        avatarAlt:
          "Professional headshot of young man with brown hair in casual shirt",
      },
      participants: [
        {
          id: "p6",
          avatar:
            "https://images.unsplash.com/photo-1582903165064-c0f584740d9a",
          avatarAlt:
            "Professional headshot of Hispanic woman with curly brown hair in red blazer",
        },
      ],

      features: [
        "screen-sharing",
        "breakout-rooms",
        "noise-suppression",
        "whiteboard",
      ],
    },
    {
      id: "6",
      title: "Japanese Anime & Pop Culture",
      description:
        "Discuss Japanese anime, manga, and pop culture while practicing Japanese conversation skills.",
      language: "Japanese",
      level: "Beginner",
      topic: "Entertainment",
      currentParticipants: 11,
      maxParticipants: 16,
      duration: "60 min",
      isLive: true,
      isFeatured: false,
      tags: ["anime", "culture", "entertainment"],
      moderator: {
        id: "mod-6",
        name: "Yuki Tanaka",
        avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
        avatarAlt:
          "Professional headshot of Asian man with glasses in white shirt",
      },
      participants: [
        {
          id: "p7",
          avatar:
            "https://images.unsplash.com/photo-1609770653328-a4d1dd377970",
          avatarAlt:
            "Professional headshot of young man with beard in casual shirt",
        },
        {
          id: "p8",
          avatar:
            "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
          avatarAlt:
            "Professional headshot of middle-aged woman with blonde hair in navy blazer",
        },
      ],

      features: ["chat", "screen-sharing"],
    },
  ]);

  // Filter and search rooms
  const filteredRooms = rooms?.filter((room) => {
    // Search filter
    if (
      searchQuery &&
      !room?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
      !room?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
      !room?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    ) {
      return false;
    }

    // Language filter
    if (
      filters?.language !== "all" &&
      room?.language?.toLowerCase() !== filters?.language
    ) {
      return false;
    }

    // Level filter
    if (
      filters?.level !== "all" &&
      room?.level?.toLowerCase() !== filters?.level
    ) {
      return false;
    }

    // Topic filter
    if (
      filters?.topic !== "all" &&
      room?.topic?.toLowerCase()?.replace(" ", "-") !== filters?.topic
    ) {
      return false;
    }

    // Room type filters
    if (filters?.roomTypes?.length > 0) {
      if (filters?.roomTypes?.includes("live") && !room?.isLive) return false;
      if (filters?.roomTypes?.includes("featured") && !room?.isFeatured)
        return false;
      if (filters?.roomTypes?.includes("moderated") && !room?.moderator)
        return false;
    }

    // Participant range filter
    if (filters?.participantRange) {
      const ranges = {
        small: [2, 5],
        medium: [6, 15],
        large: [16, 50],
      };
      const [min, max] = ranges[filters?.participantRange];
      if (room?.maxParticipants < min || room?.maxParticipants > max)
        return false;
    }

    // Features filter
    if (filters?.features?.length > 0) {
      if (
        !filters?.features?.every((feature) =>
          room?.features?.includes(feature)
        )
      ) {
        return false;
      }
    }

    return true;
  });

  // Sort rooms
  const sortedRooms = [...filteredRooms]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case "participants":
        return b?.currentParticipants - a?.currentParticipants;
      // case "level":
      //   const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      //   return levelOrder?.[a?.level] - levelOrder?.[b?.level];
      case "language":
        return a?.language?.localeCompare(b?.language);
      case "popular":
      default:
        return (
          (b?.isFeatured ? 1 : 0) - (a?.isFeatured ? 1 : 0) ||
          b?.currentParticipants - a?.currentParticipants
        );
    }
  });

  const handleJoinRoom = (roomId) => {
    if (roomId === "random") {
      const availableRooms = rooms?.filter(
        (room) => room?.currentParticipants < room?.maxParticipants
      );
      if (availableRooms?.length > 0) {
        const randomRoom =
          availableRooms?.[Math.floor(Math.random() * availableRooms?.length)];
        console.log("Joining random room:", randomRoom?.title);
      }
    } else {
      const room = rooms?.find((r) => r?.id === roomId);
      if (room && room?.currentParticipants < room?.maxParticipants) {
        console.log("Joining room:", room?.title);
        // Update participant count
        setRooms((prev) =>
          prev?.map((r) =>
            r?.id === roomId
              ? { ...r, currentParticipants: r?.currentParticipants + 1 }
              : r
          )
        );
      }
    }
  };

  const handleCreateRoom = (roomData) => {
    const newRoom = {
      ...roomData,
      participants: [],
    };
    setRooms((prev) => [newRoom, ...prev]);
    console.log("Room created:", newRoom?.title);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      language: "all",
      level: "all",
      topic: "all",
      sortBy: "popular",
      roomTypes: [],
      participantRange: null,
      features: [],
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-cultural-gradient text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon name="Radio" size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold font-accent">
                    Live Rooms
                  </h1>
                  <p className="text-xl text-white/90 mt-2">
                    Join conversations happening right now
                  </p>
                </div>
              </div>

              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                Connect with language learners worldwide in real-time voice and
                video conversations. Practice speaking, share cultures, and
                build lasting friendships.
              </p>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Create Room
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  iconName="Shuffle"
                  iconPosition="left"
                  onClick={() => handleJoinRoom("random")}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Random Join
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-background border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-1">
                {[
                  { id: "all", label: "All Rooms", icon: "Grid3X3" },
                  { id: "featured", label: "Featured", icon: "Star" },
                  { id: "stats", label: "Statistics", icon: "BarChart3" },
                ]?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setCurrentView(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentView === tab?.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-64 pl-10"
                  />

                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>

                {/* Filter Toggle */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            {showFilters && (
              <aside className="w-80 flex-shrink-0">
                <RoomFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </aside>
            )}

            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
              {currentView === "all" && (
                <>
                  {/* Quick Join Section */}
                  <QuickJoinSection
                    onJoinRoom={handleJoinRoom}
                    onCreateRoom={() => setIsCreateModalOpen(true)}
                  />

                  {/* Results Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {searchQuery
                          ? `Search Results for "${searchQuery}"`
                          : "All Rooms"}
                      </h2>
                      <p className="text-muted-foreground">
                        {sortedRooms?.length} room
                        {sortedRooms?.length !== 1 ? "s" : ""} available
                      </p>
                    </div>

                    {/* View Options */}
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Grid3X3" />
                      <Button variant="ghost" size="sm" iconName="List" />
                    </div>
                  </div>

                  {/* Rooms Grid */}
                  {sortedRooms?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {sortedRooms?.map((room) => (
                        <RoomCard
                          key={room?.id}
                          room={room}
                          onJoinRoom={handleJoinRoom}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon
                          name="Search"
                          size={24}
                          className="text-muted-foreground"
                        />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No rooms found
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Try adjusting your search or filters to find more rooms.
                      </p>
                      <div className="flex items-center justify-center space-x-3">
                        <Button variant="outline" onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                        <Button
                          onClick={() => setIsCreateModalOpen(true)}
                          iconName="Plus"
                          iconPosition="left"
                        >
                          Create Room
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {currentView === "featured" && (
                <FeaturedRooms onJoinRoom={handleJoinRoom} />
              )}

              {currentView === "stats" && <RoomStats />}
            </div>
          </div>
        </section>

        {/* Bottom Navigation for Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
          <div className="flex items-center justify-between">
            <Link
              to="/discover"
              className="flex flex-col items-center space-y-1 text-muted-foreground"
            >
              <Icon name="Compass" size={20} />
              <span className="text-xs">Discover</span>
            </Link>

            <Link
              to="/messages"
              className="flex flex-col items-center space-y-1 text-muted-foreground"
            >
              <Icon name="MessageCircle" size={20} />
              <span className="text-xs">Messages</span>
            </Link>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
            >
              <Icon name="Plus" size={24} className="text-primary-foreground" />
            </button>

            <Link
              to="/community-feed"
              className="flex flex-col items-center space-y-1 text-muted-foreground"
            >
              <Icon name="Users" size={20} />
              <span className="text-xs">Community</span>
            </Link>

            <Link
              to="/profile-management"
              className="flex flex-col items-center space-y-1 text-muted-foreground"
            >
              <Icon name="User" size={20} />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </main>
      {/* Create Room Modal */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  );
};

export default LiveRooms;
