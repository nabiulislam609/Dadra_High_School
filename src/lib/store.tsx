import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SiteSettings, 
  HomepageSection, 
  NavigationItem, 
  HeroSlide, 
  Notice, 
  Teacher, 
  Staff, 
  Student, 
  NewsItem, 
  EventItem, 
  GalleryAlbum, 
  GalleryImage, 
  AcademicProgram, 
  StudentResult, 
  PerformanceStatistic, 
  Achievement, 
  LeadershipMessage, 
  ContactMessage, 
  AdmissionApplication, 
  MediaItem, 
  CMSPage,
  ActivityLog,
  AdminUser,
  UserRole
} from '../types';

import {
  initialSiteSettings,
  initialHomepageSections,
  initialNavigation,
  initialHeroSlides,
  initialNotices,
  initialLeadership,
  initialTeachers,
  initialStaff,
  initialStudents,
  initialAcademicPrograms,
  initialPerformanceStats,
  initialStudentResults,
  initialNews,
  initialEvents,
  initialAchievements,
  initialGalleryAlbums,
  initialGalleryImages,
  initialContactMessages,
  initialAdmissions,
  initialMedia,
  initialCMSPages
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface CMSContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  homepageSections: HomepageSection[];
  updateHomepageSections: (sections: HomepageSection[]) => void;
  toggleSectionVisibility: (id: string) => void;
  reorderSection: (id: string, direction: 'up' | 'down') => void;

  navigation: NavigationItem[];
  addNavigationItem: (item: Omit<NavigationItem, 'id'>) => void;
  updateNavigationItem: (id: string, updates: Partial<NavigationItem>) => void;
  deleteNavigationItem: (id: string) => void;

  heroSlides: HeroSlide[];
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  toggleHeroSlide: (id: string) => void;

  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  updateNotice: (id: string, updates: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  togglePublishNotice: (id: string) => void;
  togglePinNotice: (id: string) => void;

  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  togglePublishTeacher: (id: string) => void;

  staff: Staff[];
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;

  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  bulkImportStudents: (newStudents: Student[]) => void;

  news: NewsItem[];
  addNews: (newsItem: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, updates: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  events: EventItem[];
  addEvent: (eventItem: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  galleryAlbums: GalleryAlbum[];
  galleryImages: GalleryImage[];
  addAlbum: (album: Omit<GalleryAlbum, 'id' | 'createdAt'>) => void;
  updateAlbum: (id: string, updates: Partial<GalleryAlbum>) => void;
  deleteAlbum: (id: string) => void;
  addImage: (image: Omit<GalleryImage, 'id' | 'createdAt'>) => void;
  deleteImage: (id: string) => void;

  academicPrograms: AcademicProgram[];
  addAcademicProgram: (prog: Omit<AcademicProgram, 'id'>) => void;
  updateAcademicProgram: (id: string, updates: Partial<AcademicProgram>) => void;
  deleteAcademicProgram: (id: string) => void;

  studentResults: StudentResult[];
  addStudentResult: (res: Omit<StudentResult, 'id'>) => void;
  updateStudentResult: (id: string, updates: Partial<StudentResult>) => void;
  deleteStudentResult: (id: string) => void;

  performanceStats: PerformanceStatistic[];
  addPerformanceStat: (stat: Omit<PerformanceStatistic, 'id'>) => void;
  updatePerformanceStat: (id: string, updates: Partial<PerformanceStatistic>) => void;
  deletePerformanceStat: (id: string) => void;

  achievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, updates: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  leadership: LeadershipMessage[];
  addLeadership: (lead: Omit<LeadershipMessage, 'id'>) => void;
  updateLeadership: (id: string, updates: Partial<LeadershipMessage>) => void;
  deleteLeadership: (id: string) => void;

  contactMessages: ContactMessage[];
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status'], replyText?: string) => void;
  deleteContactMessage: (id: string) => void;

  admissionApplications: AdmissionApplication[];
  submitAdmissionApplication: (app: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'status' | 'createdAt'>) => string;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], notes?: string) => void;
  deleteAdmissionApplication: (id: string) => void;

  media: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => void;
  deleteMediaItem: (id: string) => void;

  cmsPages: CMSPage[];
  updateCMSPage: (slug: string, updates: Partial<CMSPage>) => void;

  activityLogs: ActivityLog[];
  logActivity: (action: ActivityLog['action'], entityType: string, details: string) => void;

  adminUser: AdminUser | null;
  loginAdmin: (email: string, role?: UserRole) => boolean;
  logoutAdmin: () => void;

  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  resetToDefaultData: () => void;
}

const CMSContext = createContext<CMSContextType | null>(null);

const STORAGE_PREFIX = 'dadra_hs_';

function getStoredItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => getStoredItem('site_settings', initialSiteSettings));
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(() => getStoredItem('homepage_sections', initialHomepageSections));
  const [navigation, setNavigation] = useState<NavigationItem[]>(() => getStoredItem('navigation', initialNavigation));
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => getStoredItem('hero_slides', initialHeroSlides));
  const [notices, setNotices] = useState<Notice[]>(() => getStoredItem('notices', initialNotices));
  const [teachers, setTeachers] = useState<Teacher[]>(() => getStoredItem('teachers', initialTeachers));
  const [staff, setStaff] = useState<Staff[]>(() => getStoredItem('staff', initialStaff));
  const [students, setStudents] = useState<Student[]>(() => getStoredItem('students', initialStudents));
  const [news, setNews] = useState<NewsItem[]>(() => getStoredItem('news', initialNews));
  const [events, setEvents] = useState<EventItem[]>(() => getStoredItem('events', initialEvents));
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(() => getStoredItem('gallery_albums', initialGalleryAlbums));
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => getStoredItem('gallery_images', initialGalleryImages));
  const [academicPrograms, setAcademicPrograms] = useState<AcademicProgram[]>(() => getStoredItem('academic_programs', initialAcademicPrograms));
  const [studentResults, setStudentResults] = useState<StudentResult[]>(() => getStoredItem('student_results', initialStudentResults));
  const [performanceStats, setPerformanceStats] = useState<PerformanceStatistic[]>(() => getStoredItem('performance_stats', initialPerformanceStats));
  const [achievements, setAchievements] = useState<Achievement[]>(() => getStoredItem('achievements', initialAchievements));
  const [leadership, setLeadership] = useState<LeadershipMessage[]>(() => getStoredItem('leadership', initialLeadership));
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => getStoredItem('contact_messages', initialContactMessages));
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>(() => getStoredItem('admissions', initialAdmissions));
  const [media, setMedia] = useState<MediaItem[]>(() => getStoredItem('media', initialMedia));
  const [cmsPages, setCmsPages] = useState<CMSPage[]>(() => getStoredItem('cms_pages', initialCMSPages));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => getStoredItem('activity_logs', [
    {
      id: 'log-init',
      userId: 'admin-1',
      userName: 'Principal / Admin Desk',
      action: 'LOGIN',
      entityType: 'AUTH',
      details: 'Administrator session active',
      createdAt: new Date().toISOString()
    }
  ]));

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredItem('admin_user', {
    id: 'usr-1',
    name: 'Md. Rafiqul Islam (Headmaster)',
    email: 'admin@dadrahighschool.edu.bd',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }));

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => { setStoredItem('site_settings', siteSettings); }, [siteSettings]);
  useEffect(() => { setStoredItem('homepage_sections', homepageSections); }, [homepageSections]);
  useEffect(() => { setStoredItem('navigation', navigation); }, [navigation]);
  useEffect(() => { setStoredItem('hero_slides', heroSlides); }, [heroSlides]);
  useEffect(() => { setStoredItem('notices', notices); }, [notices]);
  useEffect(() => { setStoredItem('teachers', teachers); }, [teachers]);
  useEffect(() => { setStoredItem('staff', staff); }, [staff]);
  useEffect(() => { setStoredItem('students', students); }, [students]);
  useEffect(() => { setStoredItem('news', news); }, [news]);
  useEffect(() => { setStoredItem('events', events); }, [events]);
  useEffect(() => { setStoredItem('gallery_albums', galleryAlbums); }, [galleryAlbums]);
  useEffect(() => { setStoredItem('gallery_images', galleryImages); }, [galleryImages]);
  useEffect(() => { setStoredItem('academic_programs', academicPrograms); }, [academicPrograms]);
  useEffect(() => { setStoredItem('student_results', studentResults); }, [studentResults]);
  useEffect(() => { setStoredItem('performance_stats', performanceStats); }, [performanceStats]);
  useEffect(() => { setStoredItem('achievements', achievements); }, [achievements]);
  useEffect(() => { setStoredItem('leadership', leadership); }, [leadership]);
  useEffect(() => { setStoredItem('contact_messages', contactMessages); }, [contactMessages]);
  useEffect(() => { setStoredItem('admissions', admissionApplications); }, [admissionApplications]);
  useEffect(() => { setStoredItem('media', media); }, [media]);
  useEffect(() => { setStoredItem('cms_pages', cmsPages); }, [cmsPages]);
  useEffect(() => { setStoredItem('activity_logs', activityLogs); }, [activityLogs]);
  useEffect(() => { setStoredItem('admin_user', adminUser); }, [adminUser]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const logActivity = (action: ActivityLog['action'], entityType: string, details: string) => {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now(),
      userId: adminUser?.id || 'sys-anon',
      userName: adminUser?.name || 'Administrator',
      action,
      entityType,
      details,
      createdAt: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
    logActivity('UPDATE', 'SITE_SETTINGS', 'Updated school site settings');
    showToast('School settings successfully updated!');
  };

  const updateHomepageSections = (sections: HomepageSection[]) => {
    setHomepageSections(sections);
    logActivity('UPDATE', 'HOMEPAGE_SECTIONS', 'Reordered or updated homepage sections');
    showToast('Homepage layout order saved!');
  };

  const toggleSectionVisibility = (id: string) => {
    setHomepageSections(prev => prev.map(s => {
      if (s.id === id) {
        const nextVis = !s.isVisible;
        logActivity(nextVis ? 'PUBLISH' : 'UNPUBLISH', 'SECTION', `${s.title} visibility toggled to ${nextVis ? 'Visible' : 'Hidden'}`);
        return { ...s, isVisible: nextVis };
      }
      return s;
    }));
    showToast('Section visibility toggled');
  };

  const reorderSection = (id: string, direction: 'up' | 'down') => {
    setHomepageSections(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;

      // re-index displayOrder
      const reindexed = copy.map((sec, idx) => ({ ...sec, displayOrder: idx + 1 }));
      logActivity('UPDATE', 'HOMEPAGE_SECTIONS', `Moved section ${temp.title} ${direction}`);
      return reindexed;
    });
    showToast('Homepage section moved');
  };

  const addNavigationItem = (item: Omit<NavigationItem, 'id'>) => {
    const id = 'nav-' + Date.now();
    setNavigation(prev => [...prev, { ...item, id }]);
    logActivity('CREATE', 'NAVIGATION', `Added menu item: ${item.label}`);
    showToast('Menu item added successfully');
  };

  const updateNavigationItem = (id: string, updates: Partial<NavigationItem>) => {
    setNavigation(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    logActivity('UPDATE', 'NAVIGATION', `Updated menu item ID: ${id}`);
    showToast('Navigation menu updated');
  };

  const deleteNavigationItem = (id: string) => {
    setNavigation(prev => prev.filter(item => item.id !== id));
    logActivity('DELETE', 'NAVIGATION', `Deleted navigation item: ${id}`);
    showToast('Menu item removed');
  };

  const addHeroSlide = (slide: Omit<HeroSlide, 'id'>) => {
    const id = 'slide-' + Date.now();
    setHeroSlides(prev => [...prev, { ...slide, id }]);
    logActivity('CREATE', 'HERO_SLIDE', `Created hero slide: ${slide.title}`);
    showToast('Hero slide created');
  };

  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logActivity('UPDATE', 'HERO_SLIDE', `Updated hero slide ID: ${id}`);
    showToast('Hero slide updated');
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
    logActivity('DELETE', 'HERO_SLIDE', `Deleted hero slide: ${id}`);
    showToast('Hero slide deleted');
  };

  const toggleHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
    showToast('Hero slide status toggled');
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'createdAt'>) => {
    const id = 'not-' + Date.now();
    const newNotice: Notice = {
      ...notice,
      id,
      createdAt: new Date().toISOString()
    };
    setNotices(prev => [newNotice, ...prev]);
    logActivity('CREATE', 'NOTICE', `Published notice: ${notice.title}`);
    showToast('Notice created successfully');
  };

  const updateNotice = (id: string, updates: Partial<Notice>) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
    logActivity('UPDATE', 'NOTICE', `Updated notice: ${updates.title || id}`);
    showToast('Notice updated');
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    logActivity('DELETE', 'NOTICE', `Deleted notice ID: ${id}`);
    showToast('Notice deleted');
  };

  const togglePublishNotice = (id: string) => {
    setNotices(prev => prev.map(n => {
      if (n.id === id) {
        const next = !n.isPublished;
        logActivity(next ? 'PUBLISH' : 'UNPUBLISH', 'NOTICE', `${n.title} is now ${next ? 'Published' : 'Unpublished'}`);
        return { ...n, isPublished: next };
      }
      return n;
    }));
    showToast('Notice publication state updated');
  };

  const togglePinNotice = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
    showToast('Notice pin status toggled');
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const id = 't-' + Date.now();
    setTeachers(prev => [...prev, { ...teacher, id }]);
    logActivity('CREATE', 'TEACHER', `Added teacher: ${teacher.name}`);
    showToast('Teacher added successfully');
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    logActivity('UPDATE', 'TEACHER', `Updated teacher: ${updates.name || id}`);
    showToast('Teacher profile updated');
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    logActivity('DELETE', 'TEACHER', `Removed teacher ID: ${id}`);
    showToast('Teacher removed');
  };

  const togglePublishTeacher = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, isPublished: !t.isPublished } : t));
    showToast('Teacher publish status toggled');
  };

  const addStaff = (item: Omit<Staff, 'id'>) => {
    const id = 'st-' + Date.now();
    setStaff(prev => [...prev, { ...item, id }]);
    logActivity('CREATE', 'STAFF', `Added staff: ${item.name}`);
    showToast('Staff member added');
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logActivity('UPDATE', 'STAFF', `Updated staff: ${updates.name || id}`);
    showToast('Staff member updated');
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
    logActivity('DELETE', 'STAFF', `Removed staff member ID: ${id}`);
    showToast('Staff member deleted');
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const id = 'stu-' + Date.now();
    setStudents(prev => [ { ...student, id }, ...prev ]);
    logActivity('CREATE', 'STUDENT', `Enrolled student: ${student.name} (${student.studentId})`);
    showToast('Student enrolled successfully');
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logActivity('UPDATE', 'STUDENT', `Updated student profile: ${updates.name || id}`);
    showToast('Student information updated');
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    logActivity('DELETE', 'STUDENT', `Removed student record ID: ${id}`);
    showToast('Student record deleted');
  };

  const bulkImportStudents = (newStudents: Student[]) => {
    setStudents(prev => [...newStudents, ...prev]);
    logActivity('CREATE', 'STUDENT_BULK', `Bulk imported ${newStudents.length} student records`);
    showToast(`Successfully imported ${newStudents.length} students!`);
  };

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const id = 'news-' + Date.now();
    setNews(prev => [{ ...item, id }, ...prev]);
    logActivity('CREATE', 'NEWS', `Added article: ${item.title}`);
    showToast('News article created');
  };

  const updateNews = (id: string, updates: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
    logActivity('UPDATE', 'NEWS', `Updated news article: ${updates.title || id}`);
    showToast('News article updated');
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    logActivity('DELETE', 'NEWS', `Deleted news article ID: ${id}`);
    showToast('News article deleted');
  };

  const addEvent = (item: Omit<EventItem, 'id'>) => {
    const id = 'ev-' + Date.now();
    setEvents(prev => [{ ...item, id }, ...prev]);
    logActivity('CREATE', 'EVENT', `Scheduled event: ${item.title}`);
    showToast('Event created');
  };

  const updateEvent = (id: string, updates: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    logActivity('UPDATE', 'EVENT', `Updated event: ${updates.title || id}`);
    showToast('Event updated');
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    logActivity('DELETE', 'EVENT', `Deleted event: ${id}`);
    showToast('Event deleted');
  };

  const addAlbum = (album: Omit<GalleryAlbum, 'id' | 'createdAt'>) => {
    const id = 'alb-' + Date.now();
    setGalleryAlbums(prev => [...prev, { ...album, id, createdAt: new Date().toISOString() }]);
    logActivity('CREATE', 'GALLERY_ALBUM', `Created gallery album: ${album.name}`);
    showToast('Gallery album created');
  };

  const updateAlbum = (id: string, updates: Partial<GalleryAlbum>) => {
    setGalleryAlbums(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logActivity('UPDATE', 'GALLERY_ALBUM', `Updated album ID: ${id}`);
    showToast('Album updated');
  };

  const deleteAlbum = (id: string) => {
    setGalleryAlbums(prev => prev.filter(a => a.id !== id));
    setGalleryImages(prev => prev.filter(img => img.albumId !== id));
    logActivity('DELETE', 'GALLERY_ALBUM', `Deleted album and photos ID: ${id}`);
    showToast('Album and images deleted');
  };

  const addImage = (image: Omit<GalleryImage, 'id' | 'createdAt'>) => {
    const id = 'img-' + Date.now();
    setGalleryImages(prev => [...prev, { ...image, id, createdAt: new Date().toISOString() }]);
    logActivity('CREATE', 'GALLERY_IMAGE', `Added photo: ${image.caption}`);
    showToast('Photo added to album');
  };

  const deleteImage = (id: string) => {
    setGalleryImages(prev => prev.filter(i => i.id !== id));
    logActivity('DELETE', 'GALLERY_IMAGE', `Deleted photo ID: ${id}`);
    showToast('Photo deleted');
  };

  const addAcademicProgram = (prog: Omit<AcademicProgram, 'id'>) => {
    const id = 'prog-' + Date.now();
    setAcademicPrograms(prev => [...prev, { ...prog, id }]);
    logActivity('CREATE', 'PROGRAM', `Created academic program: ${prog.name}`);
    showToast('Academic program added');
  };

  const updateAcademicProgram = (id: string, updates: Partial<AcademicProgram>) => {
    setAcademicPrograms(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logActivity('UPDATE', 'PROGRAM', `Updated program: ${updates.name || id}`);
    showToast('Program updated');
  };

  const deleteAcademicProgram = (id: string) => {
    setAcademicPrograms(prev => prev.filter(p => p.id !== id));
    logActivity('DELETE', 'PROGRAM', `Deleted program ID: ${id}`);
    showToast('Program removed');
  };

  const addStudentResult = (res: Omit<StudentResult, 'id'>) => {
    const id = 'res-' + Date.now();
    setStudentResults(prev => [{ ...res, id }, ...prev]);
    logActivity('CREATE', 'RESULT', `Published result for Student: ${res.studentName} (${res.studentId})`);
    showToast('Student result uploaded and saved');
  };

  const updateStudentResult = (id: string, updates: Partial<StudentResult>) => {
    setStudentResults(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    logActivity('UPDATE', 'RESULT', `Updated result ID: ${id}`);
    showToast('Result updated');
  };

  const deleteStudentResult = (id: string) => {
    setStudentResults(prev => prev.filter(r => r.id !== id));
    logActivity('DELETE', 'RESULT', `Deleted result ID: ${id}`);
    showToast('Result deleted');
  };

  const addPerformanceStat = (stat: Omit<PerformanceStatistic, 'id'>) => {
    const id = 'perf-' + Date.now();
    setPerformanceStats(prev => [...prev, { ...stat, id }]);
    logActivity('CREATE', 'PERF_STAT', `Added performance record for year ${stat.year}`);
    showToast('Performance statistic added');
  };

  const updatePerformanceStat = (id: string, updates: Partial<PerformanceStatistic>) => {
    setPerformanceStats(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logActivity('UPDATE', 'PERF_STAT', `Updated performance record ID: ${id}`);
    showToast('Performance statistic updated');
  };

  const deletePerformanceStat = (id: string) => {
    setPerformanceStats(prev => prev.filter(s => s.id !== id));
    logActivity('DELETE', 'PERF_STAT', `Deleted performance record ID: ${id}`);
    showToast('Performance statistic deleted');
  };

  const addAchievement = (ach: Omit<Achievement, 'id'>) => {
    const id = 'ach-' + Date.now();
    setAchievements(prev => [...prev, { ...ach, id }]);
    logActivity('CREATE', 'ACHIEVEMENT', `Added achievement: ${ach.title}`);
    showToast('Achievement recorded');
  };

  const updateAchievement = (id: string, updates: Partial<Achievement>) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    logActivity('UPDATE', 'ACHIEVEMENT', `Updated achievement: ${updates.title || id}`);
    showToast('Achievement updated');
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
    logActivity('DELETE', 'ACHIEVEMENT', `Deleted achievement ID: ${id}`);
    showToast('Achievement removed');
  };

  const addLeadership = (lead: Omit<LeadershipMessage, 'id'>) => {
    const id = 'lead-' + Date.now();
    setLeadership(prev => [...prev, { ...lead, id }]);
    logActivity('CREATE', 'LEADERSHIP', `Added leadership message for: ${lead.name}`);
    showToast('Leadership message added');
  };

  const updateLeadership = (id: string, updates: Partial<LeadershipMessage>) => {
    setLeadership(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    logActivity('UPDATE', 'LEADERSHIP', `Updated leadership message for: ${updates.name || id}`);
    showToast('Leadership message updated');
  };

  const deleteLeadership = (id: string) => {
    setLeadership(prev => prev.filter(l => l.id !== id));
    logActivity('DELETE', 'LEADERSHIP', `Deleted leadership message ID: ${id}`);
    showToast('Leadership message deleted');
  };

  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const id = 'msg-' + Date.now();
    const newMsg: ContactMessage = {
      ...msg,
      id,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    setContactMessages(prev => [newMsg, ...prev]);
    showToast('Thank you! Your message has been received by our office.');
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status'], replyText?: string) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, status, replyText: replyText || m.replyText } : m));
    logActivity('UPDATE', 'CONTACT_MESSAGE', `Message ${id} status set to ${status}`);
    showToast(`Message marked as ${status}`);
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
    logActivity('DELETE', 'CONTACT_MESSAGE', `Deleted message ID: ${id}`);
    showToast('Message deleted');
  };

  const submitAdmissionApplication = (app: Omit<AdmissionApplication, 'id' | 'applicationNumber' | 'status' | 'createdAt'>): string => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const appNum = `DHS-ADM-${year}-${randomNum}`;
    const newApp: AdmissionApplication = {
      ...app,
      id: 'adm-' + Date.now(),
      applicationNumber: appNum,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setAdmissionApplications(prev => [newApp, ...prev]);
    showToast(`Application submitted! Your tracking ID is: ${appNum}`);
    return appNum;
  };

  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status'], notes?: string) => {
    setAdmissionApplications(prev => prev.map(a => a.id === id ? { ...a, status, notes: notes || a.notes } : a));
    logActivity('UPDATE', 'ADMISSION', `Application ${id} status updated to ${status}`);
    showToast(`Admission status updated to ${status}`);
  };

  const deleteAdmissionApplication = (id: string) => {
    setAdmissionApplications(prev => prev.filter(a => a.id !== id));
    logActivity('DELETE', 'ADMISSION', `Deleted admission application ID: ${id}`);
    showToast('Application deleted');
  };

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'createdAt'>) => {
    const id = 'med-' + Date.now();
    setMedia(prev => [{ ...item, id, createdAt: new Date().toISOString() }, ...prev]);
    logActivity('CREATE', 'MEDIA', `Uploaded media: ${item.filename}`);
    showToast('Media uploaded to library');
  };

  const deleteMediaItem = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    logActivity('DELETE', 'MEDIA', `Deleted media ID: ${id}`);
    showToast('Media deleted');
  };

  const updateCMSPage = (slug: string, updates: Partial<CMSPage>) => {
    setCmsPages(prev => prev.map(p => p.slug === slug ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    logActivity('UPDATE', 'PAGE', `Updated CMS page: ${slug}`);
    showToast(`Page '${slug}' content updated`);
  };

  const loginAdmin = (email: string, role: UserRole = 'super_admin'): boolean => {
    const user: AdminUser = {
      id: 'usr-' + Date.now(),
      name: role === 'super_admin' ? 'Headmaster (Super Admin)' : 'Staff Editor',
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    setAdminUser(user);
    logActivity('LOGIN', 'AUTH', `User logged in as ${role}: ${email}`);
    showToast(`Welcome back, ${user.name}!`);
    return true;
  };

  const logoutAdmin = () => {
    if (adminUser) {
      logActivity('LOGOUT', 'AUTH', `User logged out: ${adminUser.email}`);
    }
    setAdminUser(null);
    showToast('You have been logged out of the admin console.', 'info');
  };

  const resetToDefaultData = () => {
    setSiteSettings(initialSiteSettings);
    setHomepageSections(initialHomepageSections);
    setNavigation(initialNavigation);
    setHeroSlides(initialHeroSlides);
    setNotices(initialNotices);
    setTeachers(initialTeachers);
    setStaff(initialStaff);
    setStudents(initialStudents);
    setNews(initialNews);
    setEvents(initialEvents);
    setGalleryAlbums(initialGalleryAlbums);
    setGalleryImages(initialGalleryImages);
    setAcademicPrograms(initialAcademicPrograms);
    setStudentResults(initialStudentResults);
    setPerformanceStats(initialPerformanceStats);
    setAchievements(initialAchievements);
    setLeadership(initialLeadership);
    setContactMessages(initialContactMessages);
    setAdmissionApplications(initialAdmissions);
    setMedia(initialMedia);
    setCmsPages(initialCMSPages);
    showToast('All school and website data has been reset to default values!', 'info');
  };

  return (
    <CMSContext.Provider value={{
      siteSettings,
      updateSiteSettings,
      homepageSections,
      updateHomepageSections,
      toggleSectionVisibility,
      reorderSection,
      navigation,
      addNavigationItem,
      updateNavigationItem,
      deleteNavigationItem,
      heroSlides,
      addHeroSlide,
      updateHeroSlide,
      deleteHeroSlide,
      toggleHeroSlide,
      notices,
      addNotice,
      updateNotice,
      deleteNotice,
      togglePublishNotice,
      togglePinNotice,
      teachers,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      togglePublishTeacher,
      staff,
      addStaff,
      updateStaff,
      deleteStaff,
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      bulkImportStudents,
      news,
      addNews,
      updateNews,
      deleteNews,
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      galleryAlbums,
      galleryImages,
      addAlbum,
      updateAlbum,
      deleteAlbum,
      addImage,
      deleteImage,
      academicPrograms,
      addAcademicProgram,
      updateAcademicProgram,
      deleteAcademicProgram,
      studentResults,
      addStudentResult,
      updateStudentResult,
      deleteStudentResult,
      performanceStats,
      addPerformanceStat,
      updatePerformanceStat,
      deletePerformanceStat,
      achievements,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      leadership,
      addLeadership,
      updateLeadership,
      deleteLeadership,
      contactMessages,
      submitContactMessage,
      updateMessageStatus,
      deleteContactMessage,
      admissionApplications,
      submitAdmissionApplication,
      updateAdmissionStatus,
      deleteAdmissionApplication,
      media,
      addMediaItem,
      deleteMediaItem,
      cmsPages,
      updateCMSPage,
      activityLogs,
      logActivity,
      adminUser,
      loginAdmin,
      logoutAdmin,
      toasts,
      showToast,
      removeToast,
      resetToDefaultData
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMSStore = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMSStore must be used within a CMSProvider');
  }
  return context;
};
