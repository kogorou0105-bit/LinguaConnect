import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Header from "../../components/ui/Header";
import FilterPanel from "./components/FilterPanel";
import UserCard from "./components/UserCard";
import MatchModal from "./components/MatchModal";
import QuickActions from "./components/QuickActions";
import EmptyState from "./components/EmptyState";

const Discover = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [filters, setFilters] = useState({
    targetLanguage: "",
    nativeLanguage: "",
    proficiencyLevel: "",
    timezone: "",
    topics: [],
    goals: [],
    ageRange: { min: 18, max: 65 },
    onlineOnly: false,
    verifiedOnly: false,
    hasVideo: false,
  });

  // Mock current user data
  const currentUser = {
    id: "current-user",
    name: "You",
    profileImage:
      "https://images.unsplash.com/photo-1676618228406-5513fe6a194a",
    profileImageAlt:
      "Professional headshot of young man with brown hair in casual blue shirt smiling at camera",
  };

  // Mock users data
  const mockUsers = [
    {
      id: "user-1",
      name: "Sophie Chen",
      age: 24,
      location: "Beijing, China",
      profileImage:
        "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
      profileImageAlt:
        "Professional portrait of young Asian woman with long black hair wearing white blouse smiling warmly",
      nativeLanguage: "Chinese",
      targetLanguage: "English",
      proficiencyLevel: "Intermediate",
      compatibilityScore: 92,
      onlineStatus: "online",
      lastSeen: new Date(),
      isVerified: true,
      timezone: "UTC+8 (CST - Beijing)",
      preferredTime: "Evenings (7-10 PM)",
      bio: `Hello! I'm Sophie, a university student studying international business. I love exploring different cultures through food and music. I'm passionate about improving my English conversation skills and would love to help you with Chinese in return. Let's practice together!`,
      interests: ["Travel", "Cooking", "Music", "Photography", "Movies", "Art"],
      mutualInterests: ["Travel", "Music", "Movies"],
      learningGoals: [
        "Conversation Practice",
        "Business Communication",
        "Cultural Exchange",
      ],
      icebreakers: [
        "I just tried making dumplings for the first time - what's your favorite dish to cook?",
        "I'm planning a trip to your country next year, any must-visit places you'd recommend?",
      ],
    },
    {
      id: "user-2",
      name: "Marco Rodriguez",
      age: 28,
      location: "Madrid, Spain",
      profileImage:
        "https://images.unsplash.com/photo-1646324799589-4eaa88a9a82a",
      profileImageAlt:
        "Friendly portrait of Hispanic man with dark hair and beard wearing casual gray sweater outdoors",
      nativeLanguage: "Spanish",
      targetLanguage: "English",
      proficiencyLevel: "Advanced",
      compatibilityScore: 87,
      onlineStatus: "away",
      lastSeen: new Date(Date.now() - 300000),
      isVerified: true,
      timezone: "UTC+1 (CET - Madrid)",
      preferredTime: "Afternoons (2-6 PM)",
      bio: `¡Hola! I'm Marco, a software engineer who loves technology and outdoor adventures. I enjoy hiking, playing guitar, and discovering new coffee shops. I'm looking to perfect my English pronunciation and learn about different cultures. Happy to teach Spanish!`,
      interests: [
        "Technology",
        "Hiking",
        "Guitar",
        "Coffee",
        "Programming",
        "Travel",
      ],
      mutualInterests: ["Technology", "Travel"],
      learningGoals: [
        "Pronunciation Improvement",
        "Technical English",
        "Conversation Practice",
      ],
      icebreakers: [
        "I just discovered this amazing coffee brewing method - are you into coffee too?",
        "What's the most beautiful hiking spot in your area?",
      ],
    },
    {
      id: "user-3",
      name: "Yuki Tanaka",
      age: 22,
      location: "Tokyo, Japan",
      profileImage:
        "https://images.unsplash.com/photo-1577379407722-901604bcd745",
      profileImageAlt:
        "Cheerful portrait of young Japanese woman with shoulder-length black hair wearing light pink sweater",
      nativeLanguage: "Japanese",
      targetLanguage: "English",
      proficiencyLevel: "Beginner",
      compatibilityScore: 78,
      onlineStatus: "online",
      lastSeen: new Date(),
      isVerified: false,
      timezone: "UTC+9 (JST - Tokyo)",
      preferredTime: "Mornings (8-11 AM)",
      bio: `Konnichiwa! I'm Yuki, an art student who loves anime, manga, and traditional Japanese culture. I'm just starting my English learning journey and looking for patient conversation partners. I'd be happy to share Japanese culture and language with you!`,
      interests: [
        "Anime",
        "Art",
        "Manga",
        "Traditional Culture",
        "Drawing",
        "Tea Ceremony",
      ],
      mutualInterests: ["Art"],
      learningGoals: [
        "Basic Conversation",
        "Pronunciation",
        "Cultural Exchange",
      ],
      icebreakers: [
        "I'm working on a new manga-style drawing - do you enjoy any Japanese art forms?",
        "What's your favorite anime or do you know any Japanese traditions?",
      ],
    },
    {
      id: "user-4",
      name: "Emma Thompson",
      age: 26,
      location: "London, UK",
      profileImage:
        "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      profileImageAlt:
        "Professional headshot of blonde woman with blue eyes wearing navy blazer smiling confidently",
      nativeLanguage: "English",
      targetLanguage: "French",
      proficiencyLevel: "Intermediate",
      compatibilityScore: 85,
      onlineStatus: "busy",
      lastSeen: new Date(Date.now() - 600000),
      isVerified: true,
      timezone: "UTC+0 (GMT - London)",
      preferredTime: "Evenings (6-9 PM)",
      bio: `Hello there! I'm Emma, a marketing professional with a passion for languages and travel. I'm currently learning French and would love to practice with native speakers. I can help you with British English and share insights about UK culture!`,
      interests: [
        "Marketing",
        "Travel",
        "Wine",
        "Literature",
        "Theater",
        "History",
      ],
      mutualInterests: ["Travel", "Literature"],
      learningGoals: [
        "French Conversation",
        "Business French",
        "Cultural Understanding",
      ],
      icebreakers: [
        "I just read an amazing French novel - do you have any book recommendations?",
        "I'm planning to visit France soon, what's your favorite French city?",
      ],
    },
    {
      id: "user-5",
      name: "Ahmed Hassan",
      age: 30,
      location: "Cairo, Egypt",
      profileImage:
        "https://images.unsplash.com/photo-1606070348308-8f4ed2f9a06d",
      profileImageAlt:
        "Warm portrait of Middle Eastern man with dark hair and friendly smile wearing white shirt",
      nativeLanguage: "Arabic",
      targetLanguage: "English",
      proficiencyLevel: "Advanced",
      compatibilityScore: 81,
      onlineStatus: "online",
      lastSeen: new Date(),
      isVerified: true,
      timezone: "UTC+2 (EET - Cairo)",
      preferredTime: "Afternoons (3-7 PM)",
      bio: `Ahlan wa sahlan! I'm Ahmed, a history teacher who loves sharing stories about ancient civilizations and modern Middle Eastern culture. I enjoy photography, exploring historical sites, and learning about different cultures. Let's exchange languages and stories!`,
      interests: [
        "History",
        "Photography",
        "Architecture",
        "Culture",
        "Teaching",
        "Archaeology",
      ],
      mutualInterests: ["History", "Photography"],
      learningGoals: [
        "Academic English",
        "Cultural Exchange",
        "Teaching Skills",
      ],
      icebreakers: [
        "I just visited an amazing historical site - do you enjoy learning about ancient history?",
        "What's the most interesting historical fact about your country?",
      ],
    },
  ];

  const [users, setUsers] = useState(mockUsers);

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.targetLanguage) count++;
    if (filters?.nativeLanguage) count++;
    if (filters?.proficiencyLevel) count++;
    if (filters?.timezone) count++;
    if (filters?.topics?.length > 0) count++;
    if (filters?.goals?.length > 0) count++;
    if (filters?.onlineOnly) count++;
    if (filters?.verifiedOnly) count++;
    if (filters?.hasVideo) count++;
    if (filters?.ageRange?.min !== 18 || filters?.ageRange?.max !== 65) count++;
    return count;
  };

  const handleConnect = (userId) => {
    const user = users?.find((u) => u?.id === userId);
    if (user) {
      // Simulate match probability (80% chance for demonstration)
      const isMatch = Math.random() > 0.2;

      if (isMatch) {
        setMatchedUser(user);
        setShowMatchModal(true);
      }

      // Move to next user
      setCurrentUserIndex((prev) => prev + 1);
    }
  };

  const handlePass = () => {
    setCurrentUserIndex((prev) => prev + 1);
  };

  const handleSuperLike = (userId) => {
    const user = users?.find((u) => u?.id === userId);
    if (user) {
      // Super likes have higher match probability (95%)
      const isMatch = Math.random() > 0.05;

      if (isMatch) {
        setMatchedUser(user);
        setShowMatchModal(true);
      }

      setCurrentUserIndex((prev) => prev + 1);
    }
  };

  const handleStartChat = (userId) => {
    navigate("/messages", { state: { startChatWith: userId } });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setCurrentUserIndex(0);

    // Simulate API call
    setTimeout(() => {
      setUsers([...mockUsers]?.sort(() => Math.random() - 0.5));
      setIsLoading(false);
    }, 1500);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);

    // Simulate filtered results
    setTimeout(() => {
      let filteredUsers = [...mockUsers];

      // Apply filters (simplified for demo)
      if (newFilters?.onlineOnly) {
        filteredUsers = filteredUsers?.filter(
          (user) => user?.onlineStatus === "online"
        );
      }

      if (newFilters?.verifiedOnly) {
        filteredUsers = filteredUsers?.filter((user) => user?.isVerified);
      }

      if (newFilters?.targetLanguage) {
        filteredUsers = filteredUsers?.filter((user) =>
          user?.nativeLanguage
            ?.toLowerCase()
            ?.includes(newFilters?.targetLanguage?.toLowerCase())
        );
      }

      setUsers(filteredUsers);
      setCurrentUserIndex(0);
      setIsLoading(false);
    }, 1000);
  };

  const getCurrentUser = () => {
    return users?.[currentUserIndex];
  };

  const hasMoreUsers = () => {
    return currentUserIndex < users?.length;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showMatchModal) return;

      switch (e?.key) {
        case "ArrowLeft":
          if (hasMoreUsers()) handlePass(getCurrentUser()?.id);
          break;
        case "ArrowRight":
          if (hasMoreUsers()) handleConnect(getCurrentUser()?.id);
          break;
        case "ArrowUp":
          if (hasMoreUsers()) handleSuperLike(getCurrentUser()?.id);
          break;
        case "f":
        case "F":
          setIsFilterOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentUserIndex, users, showMatchModal]);

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <div className="pt-16">
        <QuickActions
          onFilterToggle={() => setIsFilterOpen(true)}
          onRefresh={handleRefresh}
          activeFiltersCount={getActiveFiltersCount()}
          isLoading={isLoading}
        />

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-md mx-auto">
              {isLoading ? (
                <EmptyState type="loading" />
              ) : hasMoreUsers() ? (
                <UserCard
                  user={getCurrentUser()}
                  onConnect={handleConnect}
                  onPass={handlePass}
                  onSuperLike={handleSuperLike}
                />
              ) : users?.length === 0 ? (
                <EmptyState
                  type="no-matches"
                  onAction={() => setIsFilterOpen(true)}
                />
              ) : (
                <EmptyState type="end-of-stack" onAction={handleRefresh} />
              )}
            </div>

            {/* Keyboard Shortcuts Hint */}
            {hasMoreUsers() && !isLoading && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hidden lg:block">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs">
                      ←
                    </kbd>
                    <span>Pass</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs">
                      ↑
                    </kbd>
                    <span>Super Like</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs">
                      →
                    </kbd>
                    <span>Like</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 bg-white/20 rounded text-xs">
                      F
                    </kbd>
                    <span>Filters</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>
      {/* Match Modal */}
      <MatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        matchedUser={matchedUser}
        currentUser={currentUser}
        onStartChat={handleStartChat}
      />
    </div>
  );
};

export default Discover;
