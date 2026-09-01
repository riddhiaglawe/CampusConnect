import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Search,
  MapPin,
  Clock,
  Users,
  Ticket,
  CheckCircle2,
  Bookmark,
  Share2,
  X,
  ExternalLink,
  Award,
  Sparkles,
  QrCode,
  CalendarPlus,
  Video,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CampusEvent, EventCategory, StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface EventsViewProps {
  events?: CampusEvent[];
  profile?: StudentProfile;
  onToggleRSVP?: (eventId: string) => void;
  onToggleRsvp?: (eventId: string) => void;
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  selectedEvent?: CampusEvent | null;
  onOpenEvent?: (event: CampusEvent | null) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events = [],
  profile = INITIAL_STUDENT_PROFILE,
  onToggleRSVP,
  onToggleRsvp,
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  selectedEvent = null,
  onOpenEvent = (_event: CampusEvent | null) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const eventsList = events || [];
  const handleToggle = onToggleRSVP || onToggleRsvp || ((_eventId: string) => {});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showMyRSVPsOnly, setShowMyRSVPsOnly] = useState(false);
  const [viewingTicketForEvent, setViewingTicketForEvent] = useState<CampusEvent | null>(null);

  const categories = ['All', 'Hackathon', 'Workshop', 'Cultural Fest', 'Guest Lecture', 'Sports', 'Career Fair'];

  const filteredEvents = useMemo(() => {
    return eventsList.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (evt.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'All' || evt.category === selectedCategory;
      const matchesRSVP = !showMyRSVPsOnly || (currentProfile.registeredEventIds || []).includes(evt.id);
      return matchesSearch && matchesCategory && matchesRSVP;
    });
  }, [eventsList, searchQuery, selectedCategory, showMyRSVPsOnly, currentProfile.registeredEventIds]);

  const handleRSVPAction = (eventId: string, isAlreadyRSVPed: boolean) => {
    if (!isAlreadyRSVPed) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
    handleToggle(eventId);
  };

  const handleAddToCalendar = (evt: CampusEvent) => {
    const title = encodeURIComponent(evt.title);
    const details = encodeURIComponent(`${evt.description}\n\nVenue: ${evt.venue}\nOrganizer: ${evt.organizer}`);
    const location = encodeURIComponent(evt.venue);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Campus Events & Workshops
              </h1>
              <p className="text-xs text-slate-400">
                Hackathons, technical deep-dives, cultural fests & masterclasses with digital passes
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, speakers, topics..."
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
            onClick={() => setShowMyRSVPsOnly(!showMyRSVPsOnly)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 shrink-0 ${
              showMyRSVPsOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">My Passes</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? events.length
              : events.filter((e) => e.category === cat).length;
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isRegistered = (currentProfile.registeredEventIds || []).includes(evt.id);
          const isBookmarked = (currentProfile.bookmarkedItemIds?.events || []).includes(evt.id);
          const seatsLeft = evt.maxSeats - evt.registeredCount;
          const isAlmostFull = seatsLeft < 50;

          return (
            <div
              key={evt.id}
              onClick={() => onOpenEvent(evt)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:shadow-indigo-950/40 flex flex-col justify-between group"
            >
              {/* Event Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={evt.bannerUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-bold bg-slate-900/90 backdrop-blur-md text-amber-300 border border-amber-500/30 rounded-lg shadow-lg">
                    {evt.category}
                  </span>
                  {evt.isOnline && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-500/80 text-white rounded-md flex items-center gap-1">
                      <Video className="w-3 h-3" /> Online
                    </span>
                  )}
                </div>

                {/* Bookmark Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark('events', evt.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-amber-400 hover:bg-slate-900 transition-colors shadow-lg"
                  title="Bookmark event"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>

                {/* Date overlay banner */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{evt.displayDate}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded">
                    {evt.time}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evt.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Venue & Organizer */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate text-slate-500">By {evt.organizer}</span>
                    <span className={`font-semibold ${isAlmostFull ? 'text-rose-400' : 'text-slate-400'}`}>
                      {evt.registeredCount}/{evt.maxSeats} filled
                    </span>
                  </div>
                </div>

                {/* RSVP and Ticket Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  {isRegistered ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewingTicketForEvent(evt);
                        }}
                        className="flex-1 py-2 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Pass</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRSVPAction(evt.id, true);
                        }}
                        className="py-2 px-2.5 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 text-xs rounded-xl border border-slate-700 transition-colors"
                        title="Cancel RSVP"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRSVPAction(evt.id, false);
                      }}
                      className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>RSVP Free Pass</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Event Modal View */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8 animate-in zoom-in-95 duration-150 relative">
            
            <button
              onClick={() => onOpenEvent(null)}
              className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Event Header Banner */}
            <div className="relative h-48 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden rounded-t-3xl">
              <img
                src={selectedEvent.bannerUrl}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-md">
                  {selectedEvent.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 leading-tight">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs">
              <div>
                <p className="text-slate-500 font-medium">Date & Time</p>
                <p className="font-bold text-slate-200 mt-0.5">{selectedEvent.displayDate}</p>
                <p className="text-[11px] text-slate-400">{selectedEvent.time}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Venue Location</p>
                <p className="font-bold text-slate-200 mt-0.5">{selectedEvent.venue}</p>
                <p className="text-[11px] text-indigo-400">{selectedEvent.isOnline ? 'Hybrid Stream' : 'On-Campus'}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Entry & Seats</p>
                <p className="font-bold text-emerald-400 mt-0.5">{selectedEvent.entryFee}</p>
                <p className="text-[11px] text-slate-400">{selectedEvent.registeredCount}/{selectedEvent.maxSeats} spots booked</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About this Event</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedEvent.description}
              </p>
              {selectedEvent.prizes && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-xs text-amber-200">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold">Prize & Perks: </span>
                    {selectedEvent.prizes}
                  </div>
                </div>
              )}
            </div>

            {/* Speakers / Guests */}
            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Keynote Speakers & Jury</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedEvent.speakers.map((sp, idx) => (
                    <div key={idx} className="p-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center gap-3">
                      <img src={sp.avatar} alt={sp.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/30" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{sp.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{sp.role}</p>
                        <p className="text-[10px] text-indigo-400 font-semibold">{sp.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda / Timeline */}
            {selectedEvent.timeline && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Event Schedule</h4>
                <div className="space-y-1.5">
                  {selectedEvent.timeline.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <span className="font-mono text-indigo-300 font-semibold">{item.time}</span>
                      <span className="text-slate-300">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleAddToCalendar(selectedEvent)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Google Calendar</span>
                </button>
                <button
                  onClick={() => onToggleBookmark('events', selectedEvent.id)}
                  className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 border border-slate-700 rounded-xl transition-colors"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      (currentProfile.bookmarkedItemIds?.events || []).includes(selectedEvent.id)
                        ? 'fill-amber-400 text-amber-400'
                        : ''
                    }`}
                  />
                </button>
              </div>

              <div className="w-full sm:w-auto">
                {(currentProfile.registeredEventIds || []).includes(selectedEvent.id) ? (
                  <button
                    onClick={() => {
                      onOpenEvent(null);
                      setViewingTicketForEvent(selectedEvent);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Digital Ticket Pass</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRSVPAction(selectedEvent.id, false)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register Now (Free)</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Digital Ticket Pass Modal */}
      {viewingTicketForEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setViewingTicketForEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mb-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Event Admission Pass</h3>
              <p className="text-xs text-slate-400">Scan at entrance check-in desk</p>
            </div>

            {/* Ticket Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded">
                    {viewingTicketForEvent.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">{viewingTicketForEvent.title}</h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-800/80 py-3">
                <div>
                  <p className="text-slate-500 text-[10px]">Attendee</p>
                  <p className="font-bold text-slate-200">{currentProfile.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{currentProfile.rollNo}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px]">Venue</p>
                  <p className="font-bold text-slate-200 truncate">{viewingTicketForEvent.venue}</p>
                  <p className="text-[10px] text-amber-400 font-medium">{viewingTicketForEvent.displayDate}</p>
                </div>
              </div>

              {/* Simulated QR Code */}
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl">
                <div className="w-32 h-32 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-6 gap-1 w-full h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i % 2 === 0 || i % 5 === 0) && i % 7 !== 0 ? 'bg-indigo-400' : 'bg-slate-900'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-800 font-bold mt-2">
                  PASS-SBJIT-{viewingTicketForEvent.id.toUpperCase()}-{currentProfile.rollNo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('Pass saved to offline wallet!');
                  setViewingTicketForEvent(null);
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Save Ticket Pass
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
