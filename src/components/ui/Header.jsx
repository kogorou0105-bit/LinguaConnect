import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: "/discover", label: "Discover", icon: "Compass" },
    { path: "/messages", label: "Messages", icon: "MessageCircle" },
    { path: "/community-feed", label: "Community", icon: "Users" },
    { path: "/live-rooms", label: "Live Rooms", icon: "Radio" },
  ];

  const secondaryItems = [
    { path: "/profile-management", label: "Profile", icon: "User" },
    { path: "/settings", label: "Settings", icon: "Settings" },
    { path: "/help", label: "Help", icon: "HelpCircle" },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-cultural-gradient rounded-xl flex items-center justify-center shadow-cultural group-hover:scale-105 transition-transform duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <path
                    d="M5 6L5.5 8L7 8.5L5.5 9L5 11L4.5 9L3 8.5L4.5 8L5 6Z"
                    fill="currentColor"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cultural-energy rounded-full cultural-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground font-accent">
                LinguaConnect
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Learn Languages, Build Friendships
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActivePath(item?.path)
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Live Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cultural-trust/20 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
            <span className="text-xs font-medium text-success">
              2,847 online
            </span>
          </div>

          {/* Desktop Secondary Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="relative"
            >
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cultural-cta rounded-full"></div>
            </Button>

            {/* More Menu */}
            <div className="relative group">
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-2">
            {/* Live Status for Mobile */}
            <div className="flex items-center justify-center gap-2 py-2 mb-4 bg-cultural-trust/10 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full cultural-pulse"></div>
              <span className="text-sm font-medium text-success">
                2,847 people online now
              </span>
            </div>

            {/* Primary Navigation */}
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-border my-4"></div>

            {/* Secondary Navigation */}
            {secondaryItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
