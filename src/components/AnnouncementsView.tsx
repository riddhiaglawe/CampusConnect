import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Search,
  Pin,
  Bookmark,
  Calendar,
  User,
  Filter,
  CheckCircle2,
  Clock,
  ArrowDownToLine,
  FileText,
  Share2,
  X,
  Flame,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Announcement, AnnouncementCategory, StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface AnnouncementsViewProps {
  announcements?: Announcement[];
  profile?: StudentProfile;
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  onToggleRead?: (id: string) => void;
  selectedAnnouncement?: Announcement | null;
  onOpenAnnouncement?: (announcement: Announcement | null) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements = [],
  profile = INITIAL_STUDENT_PROFILE,
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  onToggleRead = (_id: string) => {},
  selectedAnnouncement = null,
  onOpenAnnouncement = (_announcement: Announcement | null) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const announcementsList = announcements || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', 'Academic', 'Placement', 'Campus Life', 'Administrative', 'Urgent Alert'];

  const filteredAnnouncements = useMemo(() => {
    return announcementsList.filter((ann) => {
      const matchesSearch =
        ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ann.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || ann.category === selectedCategory;
      const matchesPriority =
        priorityFilter === 'all' || ann.priority === priorityFilter;
      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [announcementsList, searchQuery, selectedCategory, priorityFilter]);

  const pinnedNotices = filteredAnnouncements.filter((a) => a.isPinned);
  const regularNotices = filteredAnnouncements.filter((a) => !a.isPinned);

  const handleShare = (ann: Announcement) => {
    navigator.clipboard.writeText(`[CampusConnect Notice] ${ann.title}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                College Announcements
              </h1>
              <p className="text-xs text-slate-400">
                Official notices, examination schedules, placement updates & campus alerts
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? announcements.length
              : announcements.filter((a) => a.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.2 text-[10px] rounded-full ${
                  isActive ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pinned Announcements Section */}
      {pinnedNotices.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Pin className="w-3.5 h-3.5" />
            <span>Pinned High-Priority Notices</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotices.map((ann) => {
              const isBookmarked = (currentProfile.bookmarkedItemIds?.announcements || []).includes(ann.id);
              return (
                <div
                  key={ann.id}
                  onClick={() => onOpenAnnouncement(ann)}
                  className="bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border-2 border-indigo-500/30 hover:border-indigo-500/60 rounded-2xl p-5 cursor-pointer transition-all shadow-lg hover:shadow-indigo-950/50 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded flex items-center gap-1">
                          <Pin className="w-3 h-3" /> Pinned
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">
                          {ann.category}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark('announcements', ann.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
                        title="Save notice"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {ann.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate max-w-[150px]">{ann.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{ann.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Notices List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>All Recent Notices ({filteredAnnouncements.length})</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] normal-case text-slate-400">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium</option>
              <option value="low">Standard</option>
            </select>
          </div>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
            <Megaphone className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No announcements match your filter</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search keywords.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {regularNotices.map((ann) => {
              const isBookmarked = (currentProfile.bookmarkedItemIds?.announcements || []).includes(ann.id);
              return (
                <div
                  key={ann.id}
                  onClick={() => onOpenAnnouncement(ann)}
                  className={`p-4 bg-slate-900/80 hover:bg-slate-900 border rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                    !ann.read
                      ? 'border-indigo-500/40 bg-indigo-950/10 shadow-sm'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                        ann.category === 'Urgent Alert'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : ann.category === 'Academic'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : ann.category === 'Placement'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {ann.category}
                      </span>

                      {ann.priority === 'high' && (
                        <span className="px-1.5 py-0.2 text-[9px] font-bold bg-rose-500 text-white rounded">
                          Urgent
                        </span>
                      )}

                      {!ann.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      )}

                      <span className="text-[11px] text-slate-500 ml-auto sm:ml-0">
                        {ann.date} • {ann.time}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {ann.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {ann.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <span className="text-xs text-slate-400 sm:hidden">{ann.author}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark('announcements', ann.id);
                        }}
                        className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Bookmark"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleRead(ann.id);
                        }}
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title={ann.read ? 'Mark as unread' : 'Mark as read'}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${ann.read ? 'text-emerald-400' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Announcement Modal View */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150 relative">
            
            <button
              onClick={() => onOpenAnnouncement(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  {selectedAnnouncement.category}
                </span>
                {selectedAnnouncement.isPinned && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned Alert
                  </span>
                )}
                <span className="text-xs text-slate-400">
                  Target: {selectedAnnouncement.targetAudience}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {selectedAnnouncement.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-slate-300">{selectedAnnouncement.author}</span>
                  <span className="text-slate-500">({selectedAnnouncement.authorRole})</span>
                </div>
                <span>•</span>
                <span>{selectedAnnouncement.date} at {selectedAnnouncement.time}</span>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              {selectedAnnouncement.content}
            </div>

            {/* Attached Documents */}
            {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Official Attachments ({selectedAnnouncement.attachments.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedAnnouncement.attachments.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate">{att.name}</p>
                          <p className="text-[10px] text-slate-400">{att.size} • {att.type}</p>
                        </div>
                      </div>
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Simulated download: ${att.name}`);
                        }}
                        className="p-1.5 text-indigo-400 hover:text-white hover:bg-indigo-600 rounded-lg transition-colors"
                        title="Download Document"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark('announcements', selectedAnnouncement.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 ${
                    (currentProfile.bookmarkedItemIds?.announcements || []).includes(selectedAnnouncement.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>
                    {(currentProfile.bookmarkedItemIds?.announcements || []).includes(selectedAnnouncement.id)
                      ? 'Bookmarked'
                      : 'Save for later'}
                  </span>
                </button>

                <button
                  onClick={() => handleShare(selectedAnnouncement)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied Notice!' : 'Share'}</span>
                </button>
              </div>

              <button
                onClick={() => onOpenAnnouncement(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
