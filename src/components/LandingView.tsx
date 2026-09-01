import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Calendar,
  BookOpen,
  Users,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Star,
  Zap,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { UserRole } from '../types';

interface LandingViewProps {
  onLogin?: (role: UserRole) => void;
  onStudentLogin?: () => void;
  onOpenCaseStudy: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onLogin,
  onStudentLogin,
  onOpenCaseStudy,
}) => {
  const [email, setEmail] = useState('riddhiaglawe.cse23@sbjit.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);

  const triggerLogin = (role: UserRole = selectedRole) => {
    if (onLogin) {
      onLogin(role);
    } else if (onStudentLogin) {
      onStudentLogin();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerLogin(selectedRole);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white tracking-tight">
                Campus<span className="text-indigo-400">Connect</span>
              </span>
              <span className="text-[10px] ml-2 px-1.5 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded">
                v2.4
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCaseStudy}
              id="landing-ux-study-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>UI/UX Case Study</span>
            </button>
            <button
              onClick={() => triggerLogin('student')}
              id="landing-quick-explore-btn"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <span>Instant Demo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Key Stats */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-300">
                Official Student Portal & Ecosystem • SBJIT
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              One unified digital hub for everything <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200">Campus Life</span>.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Ditch scattered WhatsApp groups and outdated notice boards. CampusConnect seamlessly unites verified college announcements, interactive event RSVPs, student clubs, peer-verified study resources, and academic attendance tracking into a responsive interface.
            </p>

            {/* Key Feature Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Live Notices</p>
                  <p className="text-[11px] text-slate-400">Filtered & Pinned</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Events & RSVPs</p>
                  <p className="text-[11px] text-slate-400">QR Digital Passes</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Notes Hub</p>
                  <p className="text-[11px] text-slate-400">PYQs & Cheatsheets</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Active Clubs</p>
                  <p className="text-[11px] text-slate-400">Recruiting & Meetups</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">CGPA & Timetable</p>
                  <p className="text-[11px] text-slate-400">Live attendance health</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Portfolio Showcase</p>
                  <p className="text-[11px] text-slate-400">Detailed UX specs</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Selector */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Quick Demo Profiles:</span>
              <button
                onClick={() => triggerLogin('student')}
                id="demo-login-student"
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Riddhi (CSE 3rd Year)</span>
              </button>
              <button
                onClick={() => triggerLogin('recruiter_demo')}
                id="demo-login-recruiter"
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Recruiter / HR Reviewer Mode</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Login / Portal Access Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Student Portal Sign In</h2>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                    Spring 2026 Session
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Access course schedule, exam notices, clubs, and study materials.
                </p>
              </div>

              {/* Role Toggle Selector */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/80 border border-slate-800 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('student');
                    setEmail('riddhiaglawe.cse23@sbjit.edu.in');
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'student'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('faculty');
                    setEmail('prof.sharma.cse@sbjit.edu.in');
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'faculty'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Faculty
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('recruiter_demo');
                    setEmail('recruiter.guest@campusconnect.demo');
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedRole === 'recruiter_demo'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Recruiter
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Institutional Email / Roll Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="username@sbjit.edu.in"
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                      Forgot?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 py-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-emerald-400 text-[11px] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Single Sign-On (SSO)
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  id="submit-login-btn"
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enter CampusConnect Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Instant Access Guarantee */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
                <p className="text-[11px] text-slate-400">
                  Pre-configured with authentic student data (Courses, Notices, RSVPs, Study Packs).
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Landing Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>CampusConnect • Apex Institute of Engineering & Technology</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCaseStudy}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              UI/UX Research & Documentation
            </button>
            <span>WCAG AA Compliant</span>
            <span>Spring 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
