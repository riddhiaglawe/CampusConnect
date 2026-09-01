import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Calendar,
  Clock,
  BookOpen,
  Megaphone,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  ChevronRight,
  GraduationCap,
  MapPin,
  FileText,
  Download,
  Flame,
  Award,
} from 'lucide-react';
import {
  StudentProfile,
  Announcement,
  CampusEvent,
  ClubSociety,
  StudyResource,
  ClassScheduleItem,
  DeadlineItem,
  AppTab,
} from '../types';
import {
  INITIAL_STUDENT_PROFILE,
  MOCK_SCHEDULE,
  MOCK_DEADLINES,
  MOCK_CLUBS,
} from '../data/mockCampusData';

interface DashboardViewProps {
  profile?: StudentProfile;
  announcements?: Announcement[];
  events?: CampusEvent[];
  clubs?: ClubSociety[];
  resources?: StudyResource[];
  schedule?: ClassScheduleItem[];
  deadlines?: DeadlineItem[];
  onSelectTab: (tab: AppTab) => void;
  onOpenAnnouncement?: (announcement: Announcement) => void;
  onOpenEvent?: (event: CampusEvent) => void;
  onOpenResource?: (resource: StudyResource) => void;
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  onToggleDeadlineStatus?: (id: string) => void;
  onToggleRsvp?: (eventId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile = INITIAL_STUDENT_PROFILE,
  announcements = [],
  events = [],
  clubs = MOCK_CLUBS,
  resources = [],
  schedule = MOCK_SCHEDULE,
  deadlines = MOCK_DEADLINES,
  onSelectTab = (_tab: AppTab) => {},
  onOpenAnnouncement = (_announcement: Announcement) => {},
  onOpenEvent = (_event: CampusEvent) => {},
  onOpenResource = (_resource: StudyResource) => {},
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  onToggleDeadlineStatus = (_id: string) => {},
  onToggleRsvp = (_eventId: string) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const announcementsList = announcements || [];
  const eventsList = events || [];
  const resourcesList = resources || [];
  const scheduleList = schedule || MOCK_SCHEDULE;
  const deadlinesList = deadlines || MOCK_DEADLINES;

  const urgentAnnouncement = announcementsList.find((a) => a.priority === 'high' || a.isPinned);
  const registeredEvents = eventsList.filter((e) => currentProfile?.registeredEventIds?.includes(e.id));
  const upcomingEvents = eventsList.slice(0, 2);
  const topResources = resourcesList.slice(0, 3);
  const pendingDeadlines = deadlinesList.filter((d) => d.status === 'pending');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900/90 via-slate-900 to-indigo-950/80 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Spring 2026 • Week 8
              </span>
              <span className="text-xs text-slate-400">Tuesday, Sep 01</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {(currentProfile?.name || 'Student').split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You have <span className="text-indigo-300 font-semibold">{scheduleList.length} scheduled sessions</span> today and{' '}
              <span className="text-amber-300 font-semibold">{pendingDeadlines.length} pending submissions</span> this week. Mid-term exam schedules are out!
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onSelectTab('resources')}
              id="dash-quick-notes-btn"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse Notes Hub</span>
            </button>
            <button
              onClick={() => onSelectTab('events')}
              id="dash-quick-events-btn"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Upcoming Hackathons</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* CGPA Metric */}
        <div 
          onClick={() => onSelectTab('profile')}
          className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Cumulative GPA</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{profile.cgpa}</span>
            <span className="text-xs font-semibold text-emerald-400">/ 10.0</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Top 5% in CSE Department</p>
        </div>

        {/* Attendance Health */}
        <div 
          onClick={() => onSelectTab('profile')}
          className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Attendance Rate</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{profile.attendancePercent}%</span>
            <span className="text-[11px] text-emerald-400 font-medium">Safe (&gt;75%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div
              className="bg-emerald-400 h-1.5 rounded-full"
              style={{ width: `${profile.attendancePercent}%` }}
            />
          </div>
        </div>

        {/* Registered Events */}
        <div 
          onClick={() => onSelectTab('events')}
          className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Event RSVPs</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{profile.registeredEventIds.length}</span>
            <span className="text-xs text-amber-400 font-medium">Confirmed Passes</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">HackCampus 2026 next</p>
        </div>

        {/* Active Clubs */}
        <div 
          onClick={() => onSelectTab('clubs')}
          className="p-4 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">Societies Joined</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{profile.joinedClubIds.length}</span>
            <span className="text-xs text-purple-400 font-medium">Active Member</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">GDG Campus, ACM, E-Cell</p>
        </div>

      </div>

      {/* Main Grid: Today's Schedule & Urgent Announcement Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Today's Class Timetable */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Today's Class Schedule</h2>
            </div>
            <span className="text-xs text-indigo-400 font-medium">Semester 6 • CSE</span>
          </div>

          <div className="space-y-2.5">
            {scheduleList.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/50'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-300 rounded font-mono">
                        {item.code}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        item.type === 'Lab' 
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' 
                          : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      }`}>
                        {item.type}
                      </span>
                      {item.isCurrent && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 text-slate-950 rounded-full animate-pulse">
                          In Session
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.subject}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        {item.faculty}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {item.room}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs font-extrabold text-indigo-300 font-mono">
                      {item.startTime}
                    </p>
                    <p className="text-[10px] text-slate-400">to {item.endTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Urgent Notice & Assignment Deadlines */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Urgent Announcement Alert Card */}
          {urgentAnnouncement && (
            <div className="bg-gradient-to-br from-rose-950/30 to-slate-900 border border-rose-500/30 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                  <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
                  <span>Important Notice</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-rose-500/20 text-rose-300 rounded-full">
                  {urgentAnnouncement.category}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 leading-snug">
                {urgentAnnouncement.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                {urgentAnnouncement.summary}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-rose-950/60 text-xs">
                <span className="text-slate-400 text-[11px]">{urgentAnnouncement.date}</span>
                <button
                  onClick={() => onOpenAnnouncement(urgentAnnouncement)}
                  className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 text-xs"
                >
                  <span>Read Notice</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Upcoming Deadlines & Tasks */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Upcoming Submissions</h3>
              </div>
              <span className="text-xs font-medium text-slate-400">{deadlinesList.length} total</span>
            </div>

            <div className="space-y-2">
              {deadlinesList.map((dl) => (
                <div
                  key={dl.id}
                  className={`p-3 rounded-xl border transition-colors flex items-start justify-between gap-3 ${
                    dl.status === 'submitted'
                      ? 'bg-slate-950/50 border-slate-800/60 opacity-60'
                      : 'bg-slate-800/60 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      onClick={() => onToggleDeadlineStatus(dl.id)}
                      className={`mt-0.5 p-1 rounded-md transition-colors ${
                        dl.status === 'submitted'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title={dl.status === 'submitted' ? 'Mark pending' : 'Mark completed'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${
                        dl.status === 'submitted' ? 'line-through text-slate-400' : 'text-slate-200'
                      }`}>
                        {dl.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{dl.course}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      dl.priority === 'urgent'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {dl.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Featured Hackathons & Recommended Study Packs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* Left 6 Cols: Upcoming Events Spotlight */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white">Upcoming Campus Events</h2>
            </div>
            <button
              onClick={() => onSelectTab('events')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden group transition-all flex flex-col justify-between"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-amber-300 rounded border border-amber-500/30">
                    {evt.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark('events', evt.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        profile.bookmarkedItemIds.events.includes(evt.id)
                          ? 'fill-amber-400 text-amber-400'
                          : ''
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] text-indigo-400 font-semibold">{evt.displayDate}</p>
                    <h3 className="text-xs font-bold text-white line-clamp-2 mt-0.5">
                      {evt.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{evt.venue}</span>
                    <button
                      onClick={() => onOpenEvent(evt)}
                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Study Resources Quick Hub */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h2 className="text-base font-bold text-white">Popular Study Packs & Notes</h2>
            </div>
            <button
              onClick={() => onSelectTab('resources')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {topResources.map((res) => (
              <div
                key={res.id}
                onClick={() => onOpenResource(res)}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-800 text-slate-300 rounded">
                        {res.fileFormat}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        ★ {res.rating} ({res.reviewsCount})
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 truncate mt-0.5">
                      {res.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {res.subject} • {res.downloadsCount.toLocaleString()} downloads
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 group-hover:text-indigo-400">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
