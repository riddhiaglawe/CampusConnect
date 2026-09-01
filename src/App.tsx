/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AppTab,
  StudentProfile,
  Announcement,
  CampusEvent,
  ClubSociety,
  StudyResource,
  CampusNotification,
} from './types';
import {
  mockStudentProfile,
  mockAnnouncements,
  mockEvents,
  mockClubs,
  mockStudyResources,
  mockNotifications,
} from './data/mockCampusData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/LandingView';
import { DashboardView } from './components/DashboardView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { EventsView } from './components/EventsView';
import { ClubsView } from './components/ClubsView';
import { ResourcesView } from './components/ResourcesView';
import { ProfileView } from './components/ProfileView';
import { BookmarksView } from './components/BookmarksView';
import { CaseStudyModal } from './components/CaseStudyModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

export default function App() {
  // Authentication / Session State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');

  // Application Data States
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [events, setEvents] = useState<CampusEvent[]>(mockEvents);
  const [clubs, setClubs] = useState<ClubSociety[]>(mockClubs);
  const [resources, setResources] = useState<StudyResource[]>(mockStudyResources);
  const [notifications, setNotifications] = useState<CampusNotification[]>(mockNotifications);

  // Global Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  // Selected Item Detail Modals State
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [selectedClub, setSelectedClub] = useState<ClubSociety | null>(null);
  const [selectedResource, setSelectedResource] = useState<StudyResource | null>(null);

  // 1. Bookmark Toggle Handler
  const handleToggleBookmark = (
    category: 'announcements' | 'events' | 'resources' | 'clubs',
    id: string
  ) => {
    setProfile((prev) => {
      const currentList = prev.bookmarkedItemIds[category];
      const isAlready = currentList.includes(id);
      const updatedList = isAlready
        ? currentList.filter((item) => item !== id)
        : [...currentList, id];

      return {
        ...prev,
        bookmarkedItemIds: {
          ...prev.bookmarkedItemIds,
          [category]: updatedList,
        },
      };
    });
  };

  // 2. RSVP Event Handler
  const handleToggleRsvp = (eventId: string) => {
    setProfile((prev) => {
      const isRegistered = prev.registeredEventIds.includes(eventId);
      const updatedRegistered = isRegistered
        ? prev.registeredEventIds.filter((id) => id !== eventId)
        : [...prev.registeredEventIds, eventId];

      return {
        ...prev,
        registeredEventIds: updatedRegistered,
      };
    });

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const isRegistered = profile.registeredEventIds.includes(eventId);
          return {
            ...evt,
            registeredCount: isRegistered
              ? evt.registeredCount - 1
              : evt.registeredCount + 1,
          };
        }
        return evt;
      })
    );
  };

  // 3. Join / Leave Society Handler
  const handleToggleJoinClub = (clubId: string) => {
    setProfile((prev) => {
      const isJoined = prev.joinedClubIds.includes(clubId);
      const updatedClubs = isJoined
        ? prev.joinedClubIds.filter((id) => id !== clubId)
        : [...prev.joinedClubIds, clubId];

      return {
        ...prev,
        joinedClubIds: updatedClubs,
      };
    });

    setClubs((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const isJoined = profile.joinedClubIds.includes(clubId);
          return {
            ...c,
            memberCount: isJoined ? c.memberCount - 1 : c.memberCount + 1,
          };
        }
        return c;
      })
    );
  };

  // 4. Upload Resource Handler
  const handleUploadResource = (newRes: StudyResource) => {
    setResources((prev) => [newRes, ...prev]);
  };

  // 5. Profile Update Handler
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // 6. Notification Handlers
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Calculated Counters
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const urgentAnnouncementsCount = announcements.filter((a) => a.isUrgent).length;
  const totalSavedCount =
    profile.bookmarkedItemIds.announcements.length +
    profile.bookmarkedItemIds.events.length +
    profile.bookmarkedItemIds.resources.length +
    profile.bookmarkedItemIds.clubs.length;

  // Render Landing Page if logged out
  if (!isAuthenticated) {
    return (
      <>
        <LandingView
          onStudentLogin={() => {
            setIsAuthenticated(true);
            setActiveTab('dashboard');
          }}
          onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        />
        <CaseStudyModal
          isOpen={isCaseStudyOpen}
          onClose={() => setIsCaseStudyOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        currentTab={activeTab}
        profile={profile}
        savedCount={totalSavedCount}
        unreadNotificationsCount={unreadNotifsCount}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationAsRead}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsRead={handleClearAllNotifications}
        onClearAllNotifications={handleClearAllNotifications}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Desktop Navigation Sidebar & Mobile Bottom Bar */}
        <Sidebar
          activeTab={activeTab}
          currentTab={activeTab}
          onSelectTab={setActiveTab}
          urgentAnnouncementsCount={urgentAnnouncementsCount}
          unreadAnnouncementsCount={urgentAnnouncementsCount}
          upcomingEventsCount={events.length}
          bookmarkedCount={totalSavedCount}
          profile={profile}
          onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              announcements={announcements}
              events={events}
              resources={resources}
              onSelectTab={setActiveTab}
              onOpenAnnouncement={(ann) => {
                setSelectedAnnouncement(ann);
                setActiveTab('announcements');
              }}
              onOpenEvent={(evt) => {
                setSelectedEvent(evt);
                setActiveTab('events');
              }}
              onOpenResource={(res) => {
                setSelectedResource(res);
                setActiveTab('resources');
              }}
              onToggleBookmark={handleToggleBookmark}
              onToggleRsvp={handleToggleRsvp}
            />
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              bookmarkedIds={profile.bookmarkedItemIds.announcements}
              onToggleBookmark={(id) => handleToggleBookmark('announcements', id)}
              selectedAnnouncement={selectedAnnouncement}
              onOpenAnnouncement={setSelectedAnnouncement}
            />
          )}

          {/* TAB 3: EVENTS & WORKSHOPS */}
          {activeTab === 'events' && (
            <EventsView
              events={events}
              profile={profile}
              onToggleRsvp={handleToggleRsvp}
              onToggleBookmark={handleToggleBookmark}
              selectedEvent={selectedEvent}
              onOpenEvent={setSelectedEvent}
            />
          )}

          {/* TAB 4: CLUBS & SOCIETIES */}
          {activeTab === 'clubs' && (
            <ClubsView
              clubs={clubs}
              profile={profile}
              onToggleJoinClub={handleToggleJoinClub}
              onToggleBookmark={handleToggleBookmark}
              selectedClub={selectedClub}
              onOpenClub={setSelectedClub}
            />
          )}

          {/* TAB 5: STUDY HUB & RESOURCES */}
          {activeTab === 'resources' && (
            <ResourcesView
              resources={resources}
              profile={profile}
              onToggleBookmark={handleToggleBookmark}
              onUploadResource={handleUploadResource}
              selectedResource={selectedResource}
              onOpenResource={setSelectedResource}
            />
          )}

          {/* TAB 6: STUDENT PROFILE & ID CARD */}
          {activeTab === 'profile' && (
            <ProfileView
              profile={profile}
              events={events}
              clubs={clubs}
              resources={resources}
              onUpdateProfile={handleUpdateProfile}
              onOpenEvent={(evt) => {
                setSelectedEvent(evt);
                setActiveTab('events');
              }}
              onOpenClub={(c) => {
                setSelectedClub(c);
                setActiveTab('clubs');
              }}
            />
          )}

          {/* TAB 7: SAVED BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <BookmarksView
              profile={profile}
              announcements={announcements}
              events={events}
              clubs={clubs}
              resources={resources}
              onToggleBookmark={handleToggleBookmark}
              onOpenAnnouncement={(ann) => {
                setSelectedAnnouncement(ann);
                setActiveTab('announcements');
              }}
              onOpenEvent={(evt) => {
                setSelectedEvent(evt);
                setActiveTab('events');
              }}
              onOpenClub={(c) => {
                setSelectedClub(c);
                setActiveTab('clubs');
              }}
              onOpenResource={(res) => {
                setSelectedResource(res);
                setActiveTab('resources');
              }}
              onSelectTab={setActiveTab}
            />
          )}

        </main>
      </div>

      {/* Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        announcements={announcements}
        events={events}
        clubs={clubs}
        resources={resources}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
        onOpenAnnouncement={(ann) => {
          setSelectedAnnouncement(ann);
          setActiveTab('announcements');
          setIsSearchOpen(false);
        }}
        onOpenEvent={(evt) => {
          setSelectedEvent(evt);
          setActiveTab('events');
          setIsSearchOpen(false);
        }}
        onOpenClub={(c) => {
          setSelectedClub(c);
          setActiveTab('clubs');
          setIsSearchOpen(false);
        }}
        onOpenResource={(res) => {
          setSelectedResource(res);
          setActiveTab('resources');
          setIsSearchOpen(false);
        }}
      />

      {/* Case Study / "About this project" Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

    </div>
  );
}

