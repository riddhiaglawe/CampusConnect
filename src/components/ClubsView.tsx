import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  Bookmark,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  X,
  Sparkles,
  Award,
  ChevronRight,
  Send,
  Github,
  Linkedin,
  Instagram,
  Globe,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ClubSociety, ClubCategory, StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface ClubsViewProps {
  clubs?: ClubSociety[];
  profile?: StudentProfile;
  onToggleJoinClub?: (clubId: string) => void;
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  selectedClub?: ClubSociety | null;
  onOpenClub?: (club: ClubSociety | null) => void;
}

export const ClubsView: React.FC<ClubsViewProps> = ({
  clubs = [],
  profile = INITIAL_STUDENT_PROFILE,
  onToggleJoinClub = (_clubId: string) => {},
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  selectedClub = null,
  onOpenClub = (_club: ClubSociety | null) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const clubsList = clubs || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterRecruitingOnly, setFilterRecruitingOnly] = useState(false);
  const [applyingClub, setApplyingClub] = useState<ClubSociety | null>(null);
  const [appliedRole, setAppliedRole] = useState('');
  const [applicationStatement, setApplicationStatement] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Entrepreneurship', 'Social Impact'];

  const filteredClubs = useMemo(() => {
    return clubsList.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.leadName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || club.category === selectedCategory;
      const matchesRecruiting = !filterRecruitingOnly || club.isRecruiting;
      return matchesSearch && matchesCategory && matchesRecruiting;
    });
  }, [clubsList, searchQuery, selectedCategory, filterRecruitingOnly]);

  const handleJoinAction = (clubId: string, isCurrentlyJoined: boolean) => {
    if (!isCurrentlyJoined) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
    onToggleJoinClub(clubId);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setHasApplied(true);
    setTimeout(() => {
      setHasApplied(false);
      setApplyingClub(null);
      setAppliedRole('');
      setApplicationStatement('');
    }, 2200);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Student Clubs & Societies
              </h1>
              <p className="text-xs text-slate-400">
                Discover technical chapters, cultural guilds, entrepreneurship cells, and open recruitments
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
              placeholder="Search clubs, acronyms, leads..."
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

          <button
            onClick={() => setFilterRecruitingOnly(!filterRecruitingOnly)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 shrink-0 ${
              filterRecruitingOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hiring Now</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? clubs.length
              : clubs.filter((c) => c.category === cat).length;
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

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => {
          const isJoined = (currentProfile.joinedClubIds || []).includes(club.id);
          const isBookmarked = (currentProfile.bookmarkedItemIds?.clubs || []).includes(club.id);

          return (
            <div
              key={club.id}
              onClick={() => onOpenClub(club)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:shadow-indigo-950/40 flex flex-col justify-between group"
            >
              {/* Top Banner */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={club.banner}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Recruitment Pill */}
                {club.isRecruiting && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/90 text-slate-950 rounded-full flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                      Recruiting Core
                    </span>
                  </div>
                )}

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark('clubs', club.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-amber-400 transition-colors shadow-lg"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between relative">
                
                {/* Logo & Category Header */}
                <div className="flex items-start justify-between -mt-10 mb-1">
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-900 bg-slate-800 shadow-md"
                  />
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
                    {club.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {club.name}
                    </h3>
                  </div>
                  <p className="text-xs text-indigo-400 font-semibold">{club.tagline}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {club.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Members: <strong className="text-slate-200">{club.memberCount}+</strong></span>
                    <span className="text-slate-400">Est. {club.establishedYear}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 truncate">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{club.meetingSchedule}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinAction(club.id, isJoined);
                    }}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      isJoined
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Member (Joined)</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Join Society</span>
                      </>
                    )}
                  </button>

                  {club.isRecruiting && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setApplyingClub(club);
                      }}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Club Detail Modal */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative">
            
            <button
              onClick={() => onOpenClub(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Header */}
            <div className="relative h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden rounded-t-3xl">
              <img src={selectedClub.banner} alt={selectedClub.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* Club Identity */}
            <div className="flex items-start gap-4 -mt-12 relative z-10">
              <img
                src={selectedClub.logo}
                alt={selectedClub.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-900 bg-slate-800 shadow-xl"
              />
              <div className="min-w-0 flex-1 pt-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded">
                    {selectedClub.category}
                  </span>
                  {selectedClub.isRecruiting && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded">
                      Open Applications
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                  {selectedClub.name}
                </h2>
                <p className="text-xs text-indigo-400 font-semibold">{selectedClub.tagline}</p>
              </div>
            </div>

            {/* About Paragraph */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Society</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                {selectedClub.fullAbout}
              </p>
            </div>

            {/* Executive Lead Card */}
            <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedClub.leadAvatar}
                  alt={selectedClub.leadName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <p className="text-xs font-bold text-white">{selectedClub.leadName}</p>
                  <p className="text-[11px] text-indigo-400">{selectedClub.leadRole}</p>
                  <p className="text-[10px] text-slate-400">{selectedClub.leadEmail}</p>
                </div>
              </div>
              <a
                href={`mailto:${selectedClub.leadEmail}`}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Lead</span>
              </a>
            </div>

            {/* Meeting Schedule & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] block">Weekly Sessions</span>
                <span className="font-semibold text-slate-200">{selectedClub.meetingSchedule}</span>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="text-slate-500 text-[10px] block">Permanent Office / Lab</span>
                <span className="font-semibold text-slate-200">{selectedClub.location}</span>
              </div>
            </div>

            {/* Achievements & Highlights */}
            {selectedClub.highlights && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Achievements</h4>
                <div className="space-y-2">
                  {selectedClub.highlights.map((hl, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200">{hl.title} ({hl.year})</p>
                        <p className="text-[11px] text-slate-400">{hl.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => onToggleBookmark('clubs', selectedClub.id)}
                className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    (currentProfile.bookmarkedItemIds?.clubs || []).includes(selectedClub.id)
                      ? 'fill-amber-400 text-amber-400'
                      : ''
                  }`}
                />
              </button>

              <div className="flex items-center gap-2">
                {selectedClub.isRecruiting && (
                  <button
                    onClick={() => {
                      onOpenClub(null);
                      setApplyingClub(selectedClub);
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Apply for Executive Role
                  </button>
                )}

                <button
                  onClick={() => handleJoinAction(selectedClub.id, (currentProfile.joinedClubIds || []).includes(selectedClub.id))}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                    (currentProfile.joinedClubIds || []).includes(selectedClub.id)
                      ? 'bg-slate-800 text-rose-300 hover:bg-rose-500/20'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                  }`}
                >
                  {(currentProfile.joinedClubIds || []).includes(selectedClub.id) ? 'Leave Club' : 'Join Society'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Recruitment Application Modal */}
      {applyingClub && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative shadow-2xl">
            <button
              onClick={() => setApplyingClub(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                Executive Recruitment 2026
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">
                Apply to {applyingClub.name}
              </h3>
              <p className="text-xs text-slate-400">
                Join the leadership & tech organizing team.
              </p>
            </div>

            {hasApplied ? (
              <div className="p-8 text-center space-y-3 bg-slate-950 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Application Submitted!</h4>
                <p className="text-xs text-slate-400">
                  The executive panel will review your statement and schedule a screening chat.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Target Role
                  </label>
                  <select
                    required
                    value={appliedRole}
                    onChange={(e) => setAppliedRole(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">-- Choose Position --</option>
                    {applyingClub.recruitmentRoles?.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Why do you want to join and what skills do you bring?
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={applicationStatement}
                    onChange={(e) => setApplicationStatement(e.target.value)}
                    placeholder="Briefly describe your previous experience, relevant projects, and vision for the club..."
                    className="w-full p-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Your student profile (CGPA {profile.cgpa}, CSE Sem {profile.semester}) will be attached automatically.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Club Application</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
