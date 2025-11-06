import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Messages from "./pages/messages";
import CommunityFeed from "./pages/community-feed";
import ProfileManagement from "./pages/profile-management";
import Discover from "./pages/discover";
import LiveRooms from "./pages/live-rooms";
import Header from "./components/ui/Header";
const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Discover />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/community-feed" element={<CommunityFeed />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/live-rooms" element={<LiveRooms />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
