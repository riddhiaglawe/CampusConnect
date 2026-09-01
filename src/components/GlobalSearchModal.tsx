import React, { useState, useEffect } from 'react';
import {
  Search,
  Megaphone,
  Calendar,
  BookOpen,
  Users,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  Announcement,
  CampusEvent,
  ClubSociety,
  StudyResource,
  AppTab,
} from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  events: CampusEvent[];
  clubs: ClubSociety[];
  resources: StudyResource[];
  onSelectTab: (tab: AppTab) => void;
  onOpenAnnouncement: (a: Announcement) => void;
  onOpenEvent: (e: CampusEvent) => void;
  onOpenClub: (c: ClubSociety) => void;
  onOpenResource: (r: StudyResource) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  announcements,
  events,
  clubs,
  resources,
  onSelectTab,
  onOpenAnnouncement,
  onOpenEvent,
  onOpenClub,
  onOpenResource,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAnnouncements = query.trim()
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.content.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredEvents = query.trim()
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 3)
    : [];

  const filteredResources = query.trim()
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subject.toLowerCase().includes(query.toLowerCase()) ||
          r.subjectCode.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredClubs = query.trim()
    ? clubs.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.acronym.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasResults =
    filteredAnnouncements.length > 0 ||
    filteredEvents.length > 0 ||
    filteredResources.length > 0 ||
    filteredClubs.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search campus notices, hackathons, subjects (CS601), notes, clubs..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
          {!query.trim() ? (
            <div className="space-y-4 py-2">
              <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                Quick Jump Destinations
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { tab: 'announcements' as AppTab, label: 'Notices', icon: Megaphone },
                  { tab: 'events' as AppTab, label: 'Hackathons', icon: Calendar },
                  { tab: 'resources' as AppTab, label: 'Notes Hub', icon: BookOpen },
                  { tab: 'clubs' as AppTab, label: 'Clubs', icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => {
                        onSelectTab(item.tab);
                        onClose();
                      }}
                      className="p-3 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors flex items-center gap-2 text-slate-300"
                    >
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Mid-Term Exams', 'HackCampus 2026', 'CS601 Distributed Systems', 'GDG Campus', 'PyTorch Lab', 'Attendance'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center text-slate-400">
              <p className="font-semibold text-slate-300">No results found for "{query}"</p>
              <p className="text-[11px] text-slate-500 mt-1">Try searching for subject codes, hackathons, or faculty names.</p>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Announcements Results */}
              {filteredAnnouncements.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Announcements
                  </span>
                  {filteredAnnouncements.map((ann) => (
                    <div
                      key={ann.id}
                      onClick={() => {
                        onOpenAnnouncement(ann);
                        onClose();
                      }}
                      className="p-2.5 bg-slate-950/60 hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Megaphone className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="text-slate-200 group-hover:text-indigo-300 font-semibold truncate">
                          {ann.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{ann.date}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Events Results */}
              {filteredEvents.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Events & Workshops
                  </span>
                  {filteredEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => {
                        onOpenEvent(evt);
                        onClose();
                      }}
                      className="p-2.5 bg-slate-950/60 hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-slate-200 group-hover:text-indigo-300 font-semibold truncate">
                          {evt.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-400 shrink-0">{evt.displayDate}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Resources Results */}
              {filteredResources.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Study Notes & PYQs
                  </span>
                  {filteredResources.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => {
                        onOpenResource(res);
                        onClose();
                      }}
                      className="p-2.5 bg-slate-950/60 hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-slate-200 group-hover:text-indigo-300 font-semibold truncate">
                          {res.title} ({res.subjectCode})
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 shrink-0">{res.fileSize}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Clubs Results */}
              {filteredClubs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Societies & Clubs
                  </span>
                  {filteredClubs.map((club) => (
                    <div
                      key={club.id}
                      onClick={() => {
                        onOpenClub(club);
                        onClose();
                      }}
                      className="p-2.5 bg-slate-950/60 hover:bg-slate-800 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Users className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-slate-200 group-hover:text-indigo-300 font-semibold truncate">
                          {club.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{club.category}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono text-indigo-400">CampusConnect Omnisearch</span>
        </div>

      </div>
    </div>
  );
};
