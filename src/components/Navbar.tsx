import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Bell,
  Bookmark,
  Sparkles,
  User,
  SlidersHorizontal,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BookOpen,
  Users,
  X,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react';
import { AppTab, StudentProfile, CampusNotification } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface NavbarProps {
  currentTab?: AppTab;
  activeTab?: AppTab;
  onSelectTab: (tab: AppTab) => void;
  profile?: StudentProfile;
  notifications?: CampusNotification[];
  unreadNotificationsCount?: number;
  onMarkNotificationRead?: (id: string) => void;
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsRead?: () => void;
  onClearAllNotifications?: () => void;
  onOpenSearch: () => void;
  onOpenCaseStudy: () => void;
  onLogout: () => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  profile = INITIAL_STUDENT_PROFILE,
  notifications = [],
  unreadNotificationsCount,
  onMarkNotificationRead,
  onMarkNotificationAsRead,
  onMarkAllNotificationsRead,
  onClearAllNotifications,
  onOpenSearch,
  onOpenCaseStudy,
  onLogout,
  savedCount = 0,
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const effectiveProfile = profile || INITIAL_STUDENT_PROFILE;
  const effectiveTab = activeTab || currentTab || 'dashboard';
  const notifsList = notifications || [];

  const handleMarkRead = (id: string) => {
    if (onMarkNotificationRead) onMarkNotificationRead(id);
    else if (onMarkNotificationAsRead) onMarkNotificationAsRead(id);
  };

  const handleMarkAllRead = () => {
    if (onMarkAllNotificationsRead) onMarkAllNotificationsRead();
    else if (onClearAllNotifications) onClearAllNotifications();
  };

  const unreadCount =
    unreadNotificationsCount !== undefined
      ? unreadNotificationsCount
      : notifsList.filter((n) => !n.read && !n.isRead).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotifIcon = (cat: CampusNotification['category']) => {
    switch (cat) {
      case 'academic':
        return <GraduationCap className="w-4 h-4 text-blue-400" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-400" />;
      case 'club':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'resource':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'alert':
      default:
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Institution */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading text-lg font-bold text-white tracking-tight">
                    Campus<span className="text-indigo-400">Connect</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">
                    SBJIT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">Apex Institute Portal</p>
              </div>
            </button>
          </div>

          {/* Center Search Bar Trigger */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <button
              onClick={onOpenSearch}
              id="global-search-trigger"
              className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-800/80 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/60 rounded-xl transition-all duration-150 shadow-inner group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs sm:text-sm">Search notices, events, notes, clubs...</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-slate-900/80 border border-slate-700 rounded-md">
                <span>⌘</span>
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Icon */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              title="Search"
              id="mobile-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* UX Case Study Trigger Button */}
            <button
              onClick={onOpenCaseStudy}
              id="ux-case-study-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all shadow-sm hover:shadow-indigo-500/10"
              title="View UI/UX Case Study, Personas & System Architecture"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="hidden sm:inline">About this UX</span>
              <span className="sm:hidden">UX</span>
            </button>

            {/* Bookmarks Quick Link */}
            <button
              onClick={() => onSelectTab('bookmarks')}
              id="nav-bookmarks-btn"
              className={`relative p-2 rounded-lg transition-colors ${
                effectiveTab === 'bookmarks'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Saved Items & Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Notification Popover Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                id="notification-bell-btn"
                className={`relative p-2 rounded-lg transition-colors ${
                  showNotifDropdown
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Panel */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">Campus Alerts</h4>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {notifsList.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications right now.
                      </div>
                    ) : (
                      notifsList.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            handleMarkRead(notif.id);
                            if (notif.linkTab) {
                              onSelectTab(notif.linkTab);
                            }
                            setShowNotifDropdown(false);
                          }}
                          className={`p-3.5 flex items-start gap-3 hover:bg-slate-800/60 cursor-pointer transition-colors ${
                            !notif.read && !notif.isRead ? 'bg-indigo-950/20' : ''
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                            {getNotifIcon(notif.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <p className="text-xs font-semibold text-slate-200 truncate">
                                {notif.title}
                              </p>
                              <span className="text-[10px] text-slate-500 shrink-0">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                          {!notif.read && !notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-950/60 border-t border-slate-800 text-center">
                    <button
                      onClick={() => {
                        onSelectTab('announcements');
                        setShowNotifDropdown(false);
                      }}
                      className="text-xs text-slate-400 hover:text-indigo-400 font-medium transition-colors"
                    >
                      View all college announcements →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                id="user-profile-menu-btn"
                className="flex items-center gap-2 p-1 pl-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-full transition-all duration-150"
              >
                <div className="text-left hidden lg:block pr-1">
                  <p className="text-xs font-semibold text-slate-200 leading-tight">
                    {(effectiveProfile.name || 'Student').split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400">{effectiveProfile.branchShort || 'CSE'} • Sem {effectiveProfile.semester || 6}</p>
                </div>
                <img
                  src={effectiveProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                  alt={effectiveProfile.name || 'Student'}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pr-1 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in duration-150">
                  <div className="p-4 border-b border-slate-800 bg-slate-800/30">
                    <p className="text-xs font-semibold text-white">{effectiveProfile.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{effectiveProfile.email}</p>
                    <div className="mt-2 flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded font-mono">
                        {effectiveProfile.rollNo}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-medium">
                        CGPA {effectiveProfile.cgpa}
                      </span>
                    </div>
                  </div>

                  <div className="p-1.5 text-xs text-slate-300">
                    <button
                      onClick={() => {
                        onSelectTab('profile');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      <span>My Student Profile & ID</span>
                    </button>
                    <button
                      onClick={() => {
                        onSelectTab('bookmarks');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-left"
                    >
                      <Bookmark className="w-4 h-4 text-amber-400" />
                      <span>Saved Bookmarks ({savedCount})</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenCaseStudy();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span>UX Design Documentation</span>
                    </button>
                  </div>

                  <div className="p-1.5 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out / Switch Demo</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
