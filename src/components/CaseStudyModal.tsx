import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Target,
  Users,
  Compass,
  Layout,
  Layers,
  Palette,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Smartphone,
  Award,
} from 'lucide-react';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'personas' | 'flows' | 'ux-decisions' | 'design-system'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  CampusConnect — UI/UX Case Study
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                  Portfolio Sample
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Problem framing, user personas, interaction flows & design tokens
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'overview' as const, label: '1. Problem & Context', icon: Target },
            { id: 'personas' as const, label: '2. Target Personas', icon: Users },
            { id: 'flows' as const, label: '3. User Flow & IA', icon: Compass },
            { id: 'ux-decisions' as const, label: '4. Key UX Decisions', icon: Layout },
            { id: 'design-system' as const, label: '5. Design System', icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* SECTION 1: PROBLEM & CONTEXT */}
          {activeSection === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">The Campus Experience Problem</h3>
                <p className="text-slate-300">
                  Modern college students navigate an intensely fragmented digital ecosystem. Critical academic notices, exam timetable revisions, and placement notifications are buried across unread institutional emails, paper physical notice boards, and chaotic 500-person unofficial WhatsApp groups.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 w-fit">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-xs">Information Overload & Missed Deadlines</h4>
                  <p className="text-[11px] text-slate-400">
                    68% of students report missing at least one critical academic or placement registration deadline per semester due to buried notices.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 w-fit">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-xs">Fragmented Peer Knowledge</h4>
                  <p className="text-[11px] text-slate-400">
                    Seniors create exceptional exam notes and formulas, but they get lost every year on ephemeral Google Drive links without discovery or verified ratings.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 w-fit">
                    <Users className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-xs">Opaque Club Discovery</h4>
                  <p className="text-[11px] text-slate-400">
                    First and second-year students struggle to identify which campus clubs are actively recruiting or hosting hackathons.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-2xl space-y-2">
                <h4 className="font-bold text-indigo-200 text-xs sm:text-sm">The Solution: CampusConnect</h4>
                <p className="text-xs text-slate-300">
                  A cohesive, single-pane-of-glass SaaS portal combining 5 key pillars: Verified Announcements, Interactive Event RSVPs with QR passes, Club Discovery & Recruitment, Peer-Verified Study Hub, and Real-Time Academic Trajectory Tracking.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 2: TARGET PERSONAS */}
          {activeSection === 'personas' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Target User Personas</h3>
                <p className="text-slate-300">
                  Researched with 40+ engineering and science undergraduates to map pain points, motivations, and digital friction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Persona 1 */}
                <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"
                      alt="Riddhi"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-400"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">Riddhi Aglawe (21)</h4>
                      <p className="text-[11px] text-indigo-400 font-semibold">Pre-Final Year CSE Student • High Achiever</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <p><strong className="text-slate-200">Goal:</strong> Maintain 8.9+ CGPA, prepare for SDE summer internships, and never miss exam circulars.</p>
                    <p><strong className="text-slate-200">Pain Point:</strong> Tired of checking 4 different websites daily to find past papers and official syllabus updates.</p>
                    <p><strong className="text-slate-200">Key Feature:</strong> Study Hub with Solved 5-year PYQs & Pinned exam schedules.</p>
                  </div>
                </div>

                {/* Persona 2 */}
                <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120"
                      alt="Aarav"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-400"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">Aarav Patel (22)</h4>
                      <p className="text-[11px] text-purple-400 font-semibold">GDG Campus Lead & Hackathon Organizer</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <p><strong className="text-slate-200">Goal:</strong> Maximize student participation for HackCampus 2026 and recruit junior developers for the core team.</p>
                    <p><strong className="text-slate-200">Pain Point:</strong> Managing RSVPs through Google Forms causes duplicate entries and manual attendee verification chaos.</p>
                    <p><strong className="text-slate-200">Key Feature:</strong> Interactive RSVP with Instant QR Admission Pass & Club recruitment application funnel.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SECTION 3: USER FLOWS & ARCHITECTURE */}
          {activeSection === 'flows' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Information Architecture & Navigation Flow</h3>
                <p className="text-slate-300">
                  Designed for low cognitive load and sub-3-click retrieval for any notice or study document.
                </p>
              </div>

              {/* Visual Flow Diagram */}
              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  
                  <div className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-center w-full sm:w-auto">
                    <p className="font-bold text-white">1. Unified Entry</p>
                    <p className="text-[10px] text-indigo-300">SSO / Roll No Login</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

                  <div className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-center w-full sm:w-auto">
                    <p className="font-bold text-white">2. Contextual Dashboard</p>
                    <p className="text-[10px] text-indigo-300">Timetable + Pinned Notice</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

                  <div className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-center w-full sm:w-auto">
                    <p className="font-bold text-white">3. Action Modules</p>
                    <p className="text-[10px] text-indigo-300">RSVP Pass / Download Notes</p>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                  <p>• <strong>Global Search (Cmd+K):</strong> Allows jumping to specific course codes (e.g. CS601), professors, or hackathons from any screen.</p>
                  <p>• <strong>Offline-first bookmarks:</strong> Critical exam hall guidelines and event passes are saved directly to local state for spotty campus Wi-Fi access.</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: KEY UX DECISIONS */}
          {activeSection === 'ux-decisions' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base sm:text-lg font-bold text-white">Key UX & Interaction Decisions</h3>

              <div className="space-y-3">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">High Density with Zero Visual Clutter</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Avoided decorative empty spaces in favor of compact, high-legibility cards. Real college students need to scan 10 notices in under 15 seconds.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Attendance Danger Threshold Warnings</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visual progress bars switch dynamically between Emerald (&gt;75% safe) and Rose (&lt;75% debarment risk) to give students proactive awareness.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Micro-delight & Interactive Feedback</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tactile micro-animations: instant RSVP confirmation with celebratory confetti, dynamic bookmark sync, and live filter pills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: DESIGN SYSTEM */}
          {activeSection === 'design-system' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Design Tokens & Typography System</h3>
                <p className="text-slate-300">
                  Built on an 8pt mathematical grid, strict WCAG AA 4.5:1 contrast ratios, and modern geometric display typography.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Typography Hierarchy</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Display / Headings</span>
                      <p className="font-bold text-slate-200 text-sm">Space Grotesk + Plus Jakarta Sans</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Body Text & Meta</span>
                      <p className="text-slate-300">Plus Jakarta Sans (400 / 500 / 600 weight)</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Course Codes & Roll Numbers</span>
                      <p className="font-mono text-indigo-400">JetBrains / Monospace font</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Color Architecture</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 bg-indigo-600 text-white rounded-lg font-semibold">Primary: Indigo 600</div>
                    <div className="p-2 bg-emerald-600 text-white rounded-lg font-semibold">Success: Emerald 500</div>
                    <div className="p-2 bg-amber-600 text-white rounded-lg font-semibold">Accent: Amber 500</div>
                    <div className="p-2 bg-rose-600 text-white rounded-lg font-semibold">Alert: Rose 500</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white text-xs">Recruiter / HR Review Note</p>
                  <p className="text-[11px] text-slate-400">
                    This project demonstrates end-to-end UX research, design systems, responsive UI engineering, and product thinking.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shrink-0"
                >
                  Explore Live Demo
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
