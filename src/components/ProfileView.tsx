import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  TrendingUp,
  Mail,
  Phone,
  Linkedin,
  Github,
  Edit3,
  QrCode,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Users,
  Plus,
  X,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentProfile, CampusEvent, ClubSociety, StudyResource } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface ProfileViewProps {
  profile?: StudentProfile;
  events?: CampusEvent[];
  clubs?: ClubSociety[];
  resources?: StudyResource[];
  onUpdateProfile?: (updated: Partial<StudentProfile>) => void;
  onOpenEvent?: (event: CampusEvent) => void;
  onOpenClub?: (club: ClubSociety) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile = INITIAL_STUDENT_PROFILE,
  events = [],
  clubs = [],
  resources = [],
  onUpdateProfile = (_updated: Partial<StudentProfile>) => {},
  onOpenEvent = (_event: CampusEvent) => {},
  onOpenClub = (_club: ClubSociety) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const eventsList = events || [];
  const clubsList = clubs || [];
  const resourcesList = resources || [];

  const [activeSubTab, setActiveSubTab] = useState<'academics' | 'idcard' | 'activities' | 'skills'>('academics');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentProfile?.bio || INITIAL_STUDENT_PROFILE.bio);
  const [newSkill, setNewSkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(currentProfile?.skills || INITIAL_STUDENT_PROFILE.skills);

  const registeredEvents = eventsList.filter((e) => currentProfile?.registeredEventIds?.includes(e.id));
  const joinedClubs = clubsList.filter((c) => currentProfile?.joinedClubIds?.includes(c.id));

  const handleSaveBio = () => {
    onUpdateProfile({ bio: bioText });
    setIsEditingBio(false);
    confetti({ particleCount: 40, spread: 40, origin: { y: 0.8 } });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      const updated = [...skillsList, newSkill.trim()];
      setSkillsList(updated);
      onUpdateProfile({ skills: updated });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skillsList.filter((s) => s !== skillToRemove);
    setSkillsList(updated);
    onUpdateProfile({ skills: updated });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Profile Header & Cover Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <img
            src={currentProfile.coverUrl || INITIAL_STUDENT_PROFILE.coverUrl}
            alt="Campus Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            {currentProfile.academicYear || INITIAL_STUDENT_PROFILE.academicYear}
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={currentProfile.avatarUrl || INITIAL_STUDENT_PROFILE.avatarUrl}
                alt={currentProfile.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-900 bg-slate-800 shadow-2xl"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentProfile.name}
                  </h1>
                  <span className="p-1 rounded-full bg-indigo-500/20 text-indigo-400" title="Verified Student">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-xs text-indigo-400 font-semibold">
                  {currentProfile.department} • Semester {currentProfile.semester}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  Roll No: {currentProfile.rollNo} • SBJIT
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditingBio(!isEditingBio)}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingBio ? 'Cancel' : 'Edit Bio'}</span>
              </button>
            </div>
          </div>

          {/* Bio Section */}
          {isEditingBio ? (
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 space-y-3">
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveBio}
                  className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
                >
                  Save Bio
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {currentProfile.bio}
            </p>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px] block">Overall CGPA</span>
              <span className="text-lg font-extrabold text-white">{currentProfile.cgpa}</span>
              <span className="text-[10px] text-emerald-400 block">Grade A+ Distinguished</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px] block">Semester Attendance</span>
              <span className="text-lg font-extrabold text-emerald-400">{currentProfile.attendancePercent}%</span>
              <span className="text-[10px] text-slate-400 block">Required: &gt;75%</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px] block">Events & Passes</span>
              <span className="text-lg font-extrabold text-amber-400">{(currentProfile.registeredEventIds || []).length}</span>
              <span className="text-[10px] text-slate-400 block">Confirmed tickets</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-500 text-[11px] block">Active Societies</span>
              <span className="text-lg font-extrabold text-purple-400">{(currentProfile.joinedClubIds || []).length}</span>
              <span className="text-[10px] text-slate-400 block">Core Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'academics' as const, label: 'Academic Trajectory & Attendance', icon: GraduationCap },
          { id: 'idcard' as const, label: 'Digital Student ID Card', icon: QrCode },
          { id: 'activities' as const, label: 'My Passes & Joined Clubs', icon: Award },
          { id: 'skills' as const, label: 'Skills & Badges Showcase', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACADEMICS & ATTENDANCE */}
      {activeSubTab === 'academics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 7 Cols: Subject-Wise Attendance Breakdown */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Course Attendance Breakdown</h3>
                <p className="text-xs text-slate-400">Institutional mandatory criteria: 75% for exam eligibility</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full">
                {currentProfile.attendancePercent}% Aggregate
              </span>
            </div>

            <div className="space-y-3">
              {(currentProfile.attendanceBreakdown || []).map((item, idx) => {
                const isSafe = item.percent >= 75;
                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-800 text-indigo-300 rounded">
                            {item.code}
                          </span>
                          <h4 className="text-xs font-bold text-slate-200">{item.subject}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{item.faculty}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-extrabold ${isSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.percent}%
                        </span>
                        <p className="text-[10px] text-slate-500">{item.attended}/{item.total} lectures</p>
                      </div>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSafe ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-rose-500'
                        }`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: GPA Progression History */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Semester GPA Trajectory</h3>
              </div>
              <span className="text-xs text-indigo-400 font-bold">Current: {currentProfile.cgpa}</span>
            </div>

            <div className="space-y-2.5">
              {(currentProfile.cgpaHistory || []).map((hist, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-white">{hist.semester}</p>
                    <p className="text-[10px] text-slate-500">{hist.credits} Credits Earned</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-indigo-300">{hist.gpa}</span>
                    <span className="text-[10px] text-slate-500"> / 10.0</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-xs text-indigo-200">
              <span className="font-bold">Academic Honors: </span>
              Eligible for Chancellor Academic Distinction Medal for 2027 Convocation.
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DIGITAL STUDENT ID CARD */}
      {activeSubTab === 'idcard' && (
        <div className="max-w-md mx-auto bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">SBJIT TECH</h4>
                <p className="text-[10px] text-indigo-300">Apex Institute of Engineering</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">
              VALID STUDENT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={currentProfile.avatarUrl || INITIAL_STUDENT_PROFILE.avatarUrl}
              alt={currentProfile.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-400"
            />
            <div className="space-y-1 min-w-0">
              <h3 className="text-base font-extrabold text-white truncate">{currentProfile.name}</h3>
              <p className="text-xs text-indigo-300 font-semibold">{currentProfile.department}</p>
              <p className="text-xs text-slate-300 font-mono">ID: {currentProfile.rollNo}</p>
              <p className="text-[10px] text-slate-400">DOB: 14 Aug 2004 • Blood: O+ve</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 text-[10px] block">Session</span>
              <span className="font-semibold text-slate-200">2023 - 2027</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Library Barcode</span>
              <span className="font-mono text-indigo-300 font-bold">LIB-23CS048-A</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl">
            <div className="w-32 h-32 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-6 gap-1 w-full h-full">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i % 3 === 0 || i % 4 === 0) ? 'bg-indigo-400' : 'bg-slate-900'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-800 font-bold mt-2">
              VERIFIED-STUDENT-GATE-ACCESS
            </span>
          </div>

          <p className="text-[10px] text-center text-slate-400">
            Official digital identity card recognized for library access, hostel entry & mid-term examinations.
          </p>
        </div>
      )}

      {/* TAB 3: MY PASSES & JOINED CLUBS */}
      {activeSubTab === 'activities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Registered Event Passes */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Registered Event Passes ({registeredEvents.length})</h3>
              <span className="text-xs text-indigo-400">Confirmed</span>
            </div>

            <div className="space-y-3">
              {registeredEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onOpenEvent(evt)}
                  className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={evt.bannerUrl} alt={evt.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/20 text-amber-300 rounded">
                        {evt.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate mt-1">
                        {evt.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{evt.displayDate} • {evt.venue}</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Joined Clubs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Joined Societies ({joinedClubs.length})</h3>
              <span className="text-xs text-purple-400">Active</span>
            </div>

            <div className="space-y-3">
              {joinedClubs.map((club) => (
                <div
                  key={club.id}
                  onClick={() => onOpenClub(club)}
                  className="p-3.5 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-500/20 text-purple-300 rounded">
                        {club.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 truncate mt-1">
                        {club.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">{club.meetingSchedule}</p>
                    </div>
                  </div>

                  <span className="text-xs text-indigo-400 font-bold">View →</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: SKILLS & BADGES */}
      {activeSubTab === 'skills' && (
        <div className="space-y-6">
          
          {/* Earned Badges Row */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">Earned Badges & Honors</h3>
              </div>
              <span className="text-xs text-slate-400">{(currentProfile.badges || []).length} unlocked</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(currentProfile.badges || []).map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 inline-block">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{b.description}</p>
                  <span className="text-[10px] text-indigo-400 font-medium block pt-1">
                    Awarded: {b.earnedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Management */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Technical & Design Skills</h3>
              <span className="text-xs text-slate-400">{skillsList.length} skills listed</span>
            </div>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill (e.g. Next.js, Rust, Figma)..."
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 group"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
