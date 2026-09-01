import React from 'react';
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  Users,
  BookOpen,
  User,
  Bookmark,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { AppTab, StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface SidebarProps {
  currentTab?: AppTab;
  activeTab?: AppTab;
  onSelectTab: (tab: AppTab) => void;
  unreadAnnouncementsCount?: number;
  urgentAnnouncementsCount?: number;
  upcomingEventsCount?: number;
  bookmarkedCount?: number;
  profile?: StudentProfile;
  onOpenCaseStudy: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  unreadAnnouncementsCount = 0,
  urgentAnnouncementsCount = 0,
  upcomingEventsCount = 0,
  bookmarkedCount = 0,
  profile = INITIAL_STUDENT_PROFILE,
  onOpenCaseStudy,
}) => {
  const current = activeTab || currentTab || 'dashboard';
  const effectiveProfile = profile || INITIAL_STUDENT_PROFILE;
  const announcementsBadgeCount = urgentAnnouncementsCount || unreadAnnouncementsCount || 0;

  const navItems = [
    {
      id: 'dashboard' as AppTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'announcements' as AppTab,
      label: 'Announcements',
      icon: Megaphone,
      badge: announcementsBadgeCount > 0 ? announcementsBadgeCount : null,
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      id: 'events' as AppTab,
      label: 'Events & Workshops',
      icon: CalendarDays,
      badge: upcomingEventsCount > 0 ? upcomingEventsCount : null,
      badgeColor: 'bg-indigo-500 text-white',
    },
    {
      id: 'clubs' as AppTab,
      label: 'Clubs & Societies',
      icon: Users,
      badge: null,
    },
    {
      id: 'resources' as AppTab,
      label: 'Study Hub & Notes',
      icon: BookOpen,
      badge: 'New',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'bookmarks' as AppTab,
      label: 'Saved & Bookmarks',
      icon: Bookmark,
      badge: bookmarkedCount > 0 ? bookmarkedCount : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      id: 'profile' as AppTab,
      label: 'Student Profile',
      icon: User,
      badge: null,
    },
  ];

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-slate-900/60 border-r border-slate-800 p-4 space-y-6 min-h-[calc(100vh-4rem)]">
        
        {/* Quick Student Mini Pill */}
        <div className="p-3 bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/60 rounded-2xl">
          <div className="flex items-center gap-3">
            <img
              src={effectiveProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
              alt={effectiveProfile.name || 'Student'}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{effectiveProfile.name}</p>
              <p className="text-[11px] text-slate-400 truncate">
                {effectiveProfile.branchShort || 'CSE'} • Sem {effectiveProfile.semester || 6}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Student
                </span>
              </div>
            </div>
          </div>

          {/* Quick Attendance Health Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-700/50">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Overall Attendance</span>
              <span className="font-bold text-slate-200">{effectiveProfile.attendancePercent || 90}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${effectiveProfile.attendancePercent || 90}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex-1 space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Campus Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                id={`sidebar-tab-${item.id}`}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      item.badgeColor || 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* UI/UX Portfolio Badge Card */}
        <div className="p-3.5 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/20 rounded-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-200">UI/UX Case Study</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Explore problem research, user personas, design tokens, and UX rationale.
          </p>
          <button
            onClick={onOpenCaseStudy}
            id="sidebar-ux-docs-btn"
            className="w-full py-1.5 px-3 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Design System</span>
            <span>→</span>
          </button>
        </div>

        {/* Institutional Footer */}
        <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-800/80">
          <p>CampusConnect v2.4 • SBJIT</p>
          <p className="text-[9px] mt-0.5 text-slate-400">Designed for modern student engagement</p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        {[
          { id: 'dashboard' as AppTab, label: 'Home', icon: LayoutDashboard },
          { id: 'announcements' as AppTab, label: 'Notices', icon: Megaphone, badge: unreadAnnouncementsCount },
          { id: 'events' as AppTab, label: 'Events', icon: CalendarDays },
          { id: 'resources' as AppTab, label: 'Notes', icon: BookOpen },
          { id: 'clubs' as AppTab, label: 'Clubs', icon: Users },
          { id: 'profile' as AppTab, label: 'Profile', icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              id={`mobile-tab-${item.id}`}
              className={`relative flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="absolute top-0 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-900" />
              ) : null}
            </button>
          );
        })}
      </nav>
    </>
  );
};
