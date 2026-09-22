export type UserRole = 'super_admin' | 'admin' | 'editor' | 'teacher';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  banglaName: string;
  shortName: string;
  eiin: string;
  establishedYear: string;
  tagline: string;
  logoUrl: string;
  faviconUrl?: string;
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  officeHours: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  mapEmbedUrl?: string;
  copyrightText: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  banglaLabel?: string;
  url: string;
  parentId?: string | null;
  icon?: string;
  displayOrder: number;
  isVisible: boolean;
  openNewTab?: boolean;
  children?: NavigationItem[];
}

export type SectionType = 
  | 'hero' 
  | 'notice_board' 
  | 'leadership' 
  | 'teachers' 
  | 'about' 
  | 'programs' 
  | 'news' 
  | 'events' 
  | 'statistics' 
  | 'performance' 
  | 'achievements' 
  | 'student_life'
  | 'gallery' 
  | 'quick_access' 
  | 'contact';

export interface HomepageSection {
  id: string;
  sectionKey: SectionType;
  title: string;
  subtitle?: string;
  displayOrder: number;
  isVisible: boolean;
  settings?: Record<string, any>;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Notice {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: 'Academic' | 'Exam' | 'Admission' | 'Event' | 'General' | 'Urgent';
  attachmentUrl?: string;
  imageUrl?: string;
  publishDate: string;
  expiryDate?: string;
  isPublished: boolean;
  isPinned: boolean;
  isImportant: boolean;
  viewsCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  banglaName?: string;
  photoUrl: string;
  designation: string;
  subject: string;
  qualification: string;
  email: string;
  phone: string;
  joiningDate: string;
  bio?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  photoUrl: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  bio?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  banglaName?: string;
  photoUrl?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  className: string;
  section: string;
  rollNumber: number;
  session: string;
  admissionDate: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianPhone: string;
  email?: string;
  address: string;
  bloodGroup: string;
  status: 'Active' | 'Inactive' | 'Passed' | 'Transferred';
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'review' | 'published';
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  imageUrl: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface GalleryAlbum {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  category: 'Campus' | 'Classroom' | 'Sports' | 'Cultural' | 'Events' | 'Science' | 'Students' | 'Teachers';
  isPublished: boolean;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  albumId: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption: string;
  altText?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  description: string;
  classRange: string;
  subjects: string[];
  imageUrl: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ResultSubject {
  id: string;
  subject: string;
  marks: number;
  grade: string;
  gradePoint: number;
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  roll: number;
  examName: string;
  examYear: number;
  totalMarks: number;
  gpa: number;
  grade: string;
  published: boolean;
  subjects: ResultSubject[];
}

export interface PerformanceStatistic {
  id: string;
  year: number;
  examName: string;
  passRate: number;
  averageGpa: number;
  aPlusRate: number;
  totalExaminees: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number;
  imageUrl: string;
  studentName?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface LeadershipMessage {
  id: string;
  name: string;
  designation: string;
  photoUrl: string;
  message: string;
  qualification: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
  replyText?: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  studentName: string;
  banglaName?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  classApplied: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  email?: string;
  address: string;
  previousSchool?: string;
  photoUrl?: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  notes?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  fileUrl: string;
  fileType: string;
  fileSize: number; // in bytes
  altText: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'PUBLISH' | 'UNPUBLISH';
  entityType: string;
  entityId?: string;
  details: string;
  createdAt: string;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage?: string;
  content: string;
  status: 'published' | 'draft';
  updatedAt: string;
}
