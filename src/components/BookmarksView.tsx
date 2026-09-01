import React, { useState } from 'react';
import {
  Bookmark,
  Megaphone,
  Calendar,
  BookOpen,
  Users,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  Announcement,
  CampusEvent,
  ClubSociety,
  StudyResource,
  StudentProfile,
  AppTab,
} from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface BookmarksViewProps {
  profile?: StudentProfile;
  announcements?: Announcement[];
  events?: CampusEvent[];
  clubs?: ClubSociety[];
  resources?: StudyResource[];
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  onOpenAnnouncement?: (announcement: Announcement) => void;
  onOpenEvent?: (event: CampusEvent) => void;
  onOpenClub?: (club: ClubSociety) => void;
  onOpenResource?: (resource: StudyResource) => void;
  onSelectTab: (tab: AppTab) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  profile = INITIAL_STUDENT_PROFILE,
  announcements = [],
  events = [],
  clubs = [],
  resources = [],
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  onOpenAnnouncement = (_announcement: Announcement) => {},
  onOpenEvent = (_event: CampusEvent) => {},
  onOpenClub = (_club: ClubSociety) => {},
  onOpenResource = (_resource: StudyResource) => {},
  onSelectTab = (_tab: AppTab) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const bookmarkIds = currentProfile?.bookmarkedItemIds || INITIAL_STUDENT_PROFILE.bookmarkedItemIds;

  const [activeCategory, setActiveCategory] = useState<'all' | 'announcements' | 'events' | 'resources' | 'clubs'>('all');

  const savedAnnouncements = (announcements || []).filter((a) =>
    (bookmarkIds?.announcements || []).includes(a.id)
  );
  const savedEvents = (events || []).filter((e) =>
    (bookmarkIds?.events || []).includes(e.id)
  );
  const savedResources = (resources || []).filter((r) =>
    (bookmarkIds?.resources || []).includes(r.id)
  );
  const savedClubs = (clubs || []).filter((c) =>
    (bookmarkIds?.clubs || []).includes(c.id)
  );

  const totalSaved =
    savedAnnouncements.length +
    savedEvents.length +
    savedResources.length +
    savedClubs.length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Saved Items & Bookmarks
            </h1>
            <p className="text-xs text-slate-400">
              Quick access to your pinned notices, upcoming event agendas, and study notes
            </p>
          </div>
        </div>

        <span className="px-3 py-1.5 text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 rounded-xl">
          {totalSaved} items bookmarked
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all' as const, label: 'All Items', count: totalSaved },
          { id: 'announcements' as const, label: 'Notices', count: savedAnnouncements.length },
          { id: 'events' as const, label: 'Events & Workshops', count: savedEvents.length },
          { id: 'resources' as const, label: 'Study Hub Notes', count: savedResources.length },
          { id: 'clubs' as const, label: 'Clubs', count: savedClubs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeCategory === tab.id
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-slate-300 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {totalSaved === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No saved bookmarks yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any notice, hackathon, study pack, or club to save it here for fast reference.
          </p>
          <button
            onClick={() => onSelectTab('resources')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
          >
            Browse Study Resources
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Saved Announcements */}
          {(activeCategory === 'all' || activeCategory === 'announcements') && savedAnnouncements.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Megaphone className="w-4 h-4 text-rose-400" />
                <span>Saved Announcements ({savedAnnouncements.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => onOpenAnnouncement(ann)}
                    className="p-4 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="min-w-0 space-y-1">
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-300 rounded">
                        {ann.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                        {ann.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{ann.summary}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark('announcements', ann.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Events */}
          {(activeCategory === 'all' || activeCategory === 'events') && savedEvents.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Saved Events & Workshops ({savedEvents.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => onOpenEvent(evt)}
                    className="p-4 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={evt.bannerUrl} alt={evt.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 rounded">
                          {evt.category}
                        </span>
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate mt-0.5">
                          {evt.title}
                        </h4>
                        <p className="text-[10px] text-slate-400">{evt.displayDate}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark('events', evt.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Study Resources */}
          {(activeCategory === 'all' || activeCategory === 'resources') && savedResources.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Saved Notes & Cheatsheets ({savedResources.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => onOpenResource(res)}
                    className="p-4 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-800 text-indigo-300 rounded font-mono">
                          {res.subjectCode}
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-semibold bg-emerald-500/10 text-emerald-300 rounded">
                          {res.type}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                        {res.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{res.fileSize} • {res.downloadsCount} downloads</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark('resources', res.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Clubs */}
          {(activeCategory === 'all' || activeCategory === 'clubs') && savedClubs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Saved Clubs & Chapters ({savedClubs.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedClubs.map((club) => (
                  <div
                    key={club.id}
                    onClick={() => onOpenClub(club)}
                    className="p-4 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate">
                          {club.name}
                        </h4>
                        <p className="text-[10px] text-indigo-400">{club.tagline}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark('clubs', club.id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
