export type AppTab = 
  | 'dashboard' 
  | 'announcements' 
  | 'events' 
  | 'clubs' 
  | 'resources' 
  | 'profile' 
  | 'bookmarks';

export type UserRole = 'student' | 'faculty' | 'recruiter_demo';

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  email: string;
  department: string;
  branchShort: string;
  semester: number;
  cgpa: number;
  attendancePercent: number;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  academicYear: string;
  phone: string;
  linkedin: string;
  github: string;
  skills: string[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
    color: string;
  }[];
  attendanceBreakdown: {
    subject: string;
    code: string;
    attended: number;
    total: number;
    percent: number;
    faculty: string;
  }[];
  cgpaHistory: {
    semester: string;
    gpa: number;
    credits: number;
  }[];
  joinedClubIds: string[];
  registeredEventIds: string[];
  bookmarkedItemIds: {
    announcements: string[];
    events: string[];
    resources: string[];
    clubs: string[];
  };
}

export interface ClassScheduleItem {
  id: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  startTime: string;
  endTime: string;
  day: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  isCurrent?: boolean;
}

export type AnnouncementCategory = 
  | 'Academic' 
  | 'Placement' 
  | 'Campus Life' 
  | 'Administrative' 
  | 'Urgent Alert';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: AnnouncementCategory;
  date: string;
  time: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  isPinned: boolean;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  targetAudience: string;
}

export type EventCategory = 
  | 'Hackathon' 
  | 'Workshop' 
  | 'Cultural Fest' 
  | 'Guest Lecture' 
  | 'Sports' 
  | 'Career Fair';

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  isOnline: boolean;
  meetingLink?: string;
  organizer: string;
  organizerClubId?: string;
  maxSeats: number;
  registeredCount: number;
  bannerUrl: string;
  tags: string[];
  eligibility: string;
  entryFee: string;
  prizes?: string;
  speakers?: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  timeline?: {
    time: string;
    activity: string;
  }[];
}

export type ClubCategory = 
  | 'Technical' 
  | 'Cultural' 
  | 'Sports' 
  | 'Entrepreneurship' 
  | 'Social Impact';

export interface ClubSociety {
  id: string;
  name: string;
  acronym: string;
  tagline: string;
  category: ClubCategory;
  description: string;
  fullAbout: string;
  logo: string;
  banner: string;
  memberCount: number;
  establishedYear: number;
  leadName: string;
  leadRole: string;
  leadAvatar: string;
  leadEmail: string;
  isRecruiting: boolean;
  recruitmentRoles?: string[];
  meetingSchedule: string;
  location: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  highlights: {
    title: string;
    description: string;
    year: string;
  }[];
  upcomingEventIds: string[];
}

export type ResourceType = 
  | 'Lecture Notes' 
  | 'Previous Exam Papers' 
  | 'Lab Manual' 
  | 'Cheatsheet' 
  | 'Reference E-Book';

export interface StudyResource {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  department: string;
  semester: number;
  type: ResourceType;
  fileFormat: 'PDF' | 'ZIP' | 'DOCX' | 'PPTX';
  fileSize: string;
  pageCount?: number;
  downloadsCount: number;
  rating: number;
  reviewsCount: number;
  authorStudent: string;
  authorVerified: boolean;
  uploadDate: string;
  description: string;
  tags: string[];
  previewKeyTopics: string[];
}

export interface CampusNotification {
  id: string;
  title: string;
  message: string;
  category: 'academic' | 'event' | 'club' | 'alert' | 'resource';
  timestamp: string;
  read: boolean;
  linkTab: AppTab;
  targetId?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  dueTime: string;
  priority: 'urgent' | 'upcoming' | 'normal';
  status: 'pending' | 'submitted';
  type: 'Assignment' | 'Quiz' | 'Project Submission' | 'Fee Payment';
}
