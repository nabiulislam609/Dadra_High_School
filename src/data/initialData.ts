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
  CMSPage 
} from '../types';

export const initialSiteSettings: SiteSettings = {
  id: 'site-settings-1',
  siteName: 'Dadra High School',
  banglaName: 'দাদরা উচ্চ বিদ্যালয়',
  shortName: 'DHS',
  eiin: '121850',
  establishedYear: '1972',
  tagline: 'Excellence in Education, Character and Leadership',
  logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80',
  faviconUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=64&q=80',
  address: 'Village & Post: Dadra, Upazila: Joypurhat Sadar, District: Joypurhat, Rajshahi Division, Bangladesh',
  phone: '+880 1712-345678',
  email: 'info@dadrahighschool.edu.bd',
  emergencyPhone: '+880 1711-987654',
  officeHours: 'Saturday - Thursday: 9:00 AM - 4:00 PM',
  facebookUrl: 'https://facebook.com/dadrahighschool',
  youtubeUrl: 'https://youtube.com/@dadrahighschool',
  instagramUrl: 'https://instagram.com/dadrahighschool',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.123456789!2d89.0123!3d25.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzI0LjIiTiA4OcKwMDAnNDQuMyJF!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd',
  copyrightText: '© 2026 Dadra High School, Joypurhat. All Rights Reserved. Approved by BISE Rajshahi.',
  metaTitle: 'Dadra High School - Joypurhat | Premier Secondary Education in Bangladesh',
  metaDescription: 'Official website of Dadra High School (EIIN 121850), Joypurhat Sadar. Fostering academic excellence, moral integrity, and technological skills since 1972.'
};

export const initialHomepageSections: HomepageSection[] = [
  { id: 'sec-hero', sectionKey: 'hero', title: 'Hero Banner Slider', subtitle: 'Dynamic homepage hero slider', displayOrder: 1, isVisible: true },
  { id: 'sec-notice', sectionKey: 'notice_board', title: 'Notice Board & Announcements', subtitle: 'Official notices, circulars and board schedules', displayOrder: 2, isVisible: true },
  { id: 'sec-leadership', sectionKey: 'leadership', title: 'Leadership Messages', subtitle: 'Words of inspiration from Headmaster and Chairman', displayOrder: 3, isVisible: true },
  { id: 'sec-about', sectionKey: 'about', title: 'About Our School', subtitle: 'More than five decades of academic distinction', displayOrder: 4, isVisible: true },
  { id: 'sec-programs', sectionKey: 'programs', title: 'Academic Programs', subtitle: 'Science, Humanities, Business Studies and Junior Secondary', displayOrder: 5, isVisible: true },
  { id: 'sec-teachers', sectionKey: 'teachers', title: 'Faculty & Mentors', subtitle: 'Meet our experienced, caring and dedicated educators', displayOrder: 6, isVisible: true },
  { id: 'sec-statistics', sectionKey: 'statistics', title: 'Key Statistics', subtitle: 'Our impact in numbers', displayOrder: 7, isVisible: true },
  { id: 'sec-performance', sectionKey: 'performance', title: 'Academic Performance & Results', subtitle: 'Consistent top rankings in BISE Rajshahi SSC examinations', displayOrder: 8, isVisible: true },
  { id: 'sec-news', sectionKey: 'news', title: 'Latest News & Stories', subtitle: 'Campus happenings, achievements and announcements', displayOrder: 9, isVisible: true },
  { id: 'sec-events', sectionKey: 'events', title: 'Upcoming Events & Calendar', subtitle: 'Sports, cultural festivals and science fairs', displayOrder: 10, isVisible: true },
  { id: 'sec-achievements', sectionKey: 'achievements', title: 'Pride & Achievements', subtitle: 'Honors earned by our brilliant students', displayOrder: 11, isVisible: true },
  { id: 'sec-student-life', sectionKey: 'student_life', title: 'Student Life & Facilities', subtitle: 'Modern labs, enriched library, playground and scout activities', displayOrder: 12, isVisible: true },
  { id: 'sec-gallery', sectionKey: 'gallery', title: 'Campus Moments & Gallery', subtitle: 'Snapshots from school events, classrooms and celebrations', displayOrder: 13, isVisible: true },
  { id: 'sec-quick-access', sectionKey: 'quick_access', title: 'Quick Services Portal', subtitle: 'Direct links to student results, admission and syllabus', displayOrder: 14, isVisible: true },
  { id: 'sec-contact', sectionKey: 'contact', title: 'Get In Touch', subtitle: 'Visit our campus in Joypurhat or send an inquiry', displayOrder: 15, isVisible: true }
];

export const initialNavigation: NavigationItem[] = [
  { id: 'nav-1', label: 'Home', banglaLabel: 'প্রচ্ছদ', url: '/', displayOrder: 1, isVisible: true },
  { 
    id: 'nav-2', 
    label: 'About', 
    banglaLabel: 'আমাদের সম্পর্কে', 
    url: '/about', 
    displayOrder: 2, 
    isVisible: true,
    children: [
      { id: 'nav-2-1', label: 'About School', url: '/about', displayOrder: 1, isVisible: true },
      { id: 'nav-2-2', label: 'History & Heritage', url: '/history', displayOrder: 2, isVisible: true },
      { id: 'nav-2-3', label: 'Leadership', url: '/leadership', displayOrder: 3, isVisible: true },
    ]
  },
  { 
    id: 'nav-3', 
    label: 'Academic', 
    banglaLabel: 'একাডেমিক', 
    url: '/academic', 
    displayOrder: 3, 
    isVisible: true,
    children: [
      { id: 'nav-3-1', label: 'Curriculum & Programs', url: '/academic', displayOrder: 1, isVisible: true },
      { id: 'nav-3-2', label: 'Academic Results', url: '/results', displayOrder: 2, isVisible: true },
      { id: 'nav-3-3', label: 'Achievements', url: '/achievements', displayOrder: 3, isVisible: true },
    ]
  },
  { id: 'nav-4', label: 'Teachers', banglaLabel: 'শিক্ষকমণ্ডলী', url: '/teachers', displayOrder: 4, isVisible: true },
  { id: 'nav-5', label: 'Students', banglaLabel: 'শিক্ষার্থী', url: '/students', displayOrder: 5, isVisible: true },
  { id: 'nav-6', label: 'Notices', banglaLabel: 'নোটিশ বোর্ড', url: '/notices', displayOrder: 6, isVisible: true },
  { id: 'nav-7', label: 'News', banglaLabel: 'সংবাদ', url: '/news', displayOrder: 7, isVisible: true },
  { id: 'nav-8', label: 'Events', banglaLabel: 'ইভেন্টস', url: '/events', displayOrder: 8, isVisible: true },
  { id: 'nav-9', label: 'Gallery', banglaLabel: 'ফটো গ্যালারি', url: '/gallery', displayOrder: 9, isVisible: true },
  { id: 'nav-10', label: 'Admission', banglaLabel: 'ভর্তি তথ্য', url: '/admission', displayOrder: 10, isVisible: true },
  { id: 'nav-11', label: 'Contact', banglaLabel: 'যোগাযোগ', url: '/contact', displayOrder: 11, isVisible: true }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Nurturing Bright Minds with Modern Education & Values',
    subtitle: 'Dadra High School has been inspiring rural and urban students to attain highest academic excellence in Joypurhat since 1972.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'Online Admission 2026',
    buttonUrl: '/admission',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'slide-2',
    title: 'Outstanding SSC Board Results & Science Education',
    subtitle: 'State-of-the-art computer labs, hands-on physics and chemistry facilities empowering the innovators of tomorrow.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'Check Academic Results',
    buttonUrl: '/results',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'slide-3',
    title: 'Co-Curricular Excellence, Scouts & Sports Glory',
    subtitle: 'Championing inter-district football, cricket, Bangladesh Scouts, red crescent, and national debate competitions.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'Explore Campus Life',
    buttonUrl: '/gallery',
    displayOrder: 3,
    isActive: true
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'not-1',
    title: 'Special Guideline for SSC Examination Candidates 2026',
    slug: 'special-guideline-ssc-examination-2026',
    shortDescription: 'Instructions regarding admit card collection, reporting time, and examination materials for SSC 2026 under Rajshahi Board.',
    content: 'All candidates appearing in the Secondary School Certificate (SSC) Examination 2026 are hereby notified that Admit Cards and Registration Cards will be distributed from the Headmaster’s office between 10:00 AM and 2:00 PM. Students must clear all school dues before collecting their examination credentials. Please strictly adhere to BISE Rajshahi examination center regulations.',
    category: 'Exam',
    attachmentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    publishDate: '2026-09-18',
    isPublished: true,
    isPinned: true,
    isImportant: true,
    viewsCount: 342,
    createdAt: '2026-09-18T09:00:00Z'
  },
  {
    id: 'not-2',
    title: 'Admission Open for Classes VI to IX - Academic Session 2027',
    slug: 'admission-open-session-2027',
    shortDescription: 'Online application procedure, seat vacancy details, and admission test schedule for classes 6, 7, 8, and 9.',
    content: 'Online admission applications are now open for prospective students seeking entry into Class 6, 7, 8, and 9. Parents are advised to submit the online form through our school portal or obtain a physical application form from the administrative desk.',
    category: 'Admission',
    publishDate: '2026-09-15',
    isPublished: true,
    isPinned: true,
    isImportant: false,
    viewsCount: 512,
    createdAt: '2026-09-15T10:30:00Z'
  },
  {
    id: 'not-3',
    title: 'Schedule for 2nd Mid-Term Examination 2026',
    slug: 'second-mid-term-exam-schedule-2026',
    shortDescription: 'Detailed subject-wise examination timetable for Class 6 to Class 10.',
    content: 'The 2nd Mid-Term Examination will commence from October 15, 2026. The examination will take place in two shifts: Morning Shift (9:30 AM - 12:30 PM) and Afternoon Shift (1:30 PM - 4:30 PM). Detailed routine is available on the bulletin board and download link.',
    category: 'Academic',
    publishDate: '2026-09-10',
    isPublished: true,
    isPinned: false,
    isImportant: true,
    viewsCount: 289,
    createdAt: '2026-09-10T14:15:00Z'
  },
  {
    id: 'not-4',
    title: 'Parent-Teacher Meeting & Quarterly Progress Review',
    slug: 'parent-teacher-meeting-quarterly-review',
    shortDescription: 'Mandatory parent-teacher conference for discussing student behavioral and academic progress.',
    content: 'A comprehensive Parent-Teacher Meeting will be held on Saturday, September 28, 2026 at the School Auditorium. All guardians are respectfully requested to attend to discuss their ward’s academic performance.',
    category: 'General',
    publishDate: '2026-09-05',
    isPublished: true,
    isPinned: false,
    isImportant: false,
    viewsCount: 198,
    createdAt: '2026-09-05T11:00:00Z'
  }
];

export const initialLeadership: LeadershipMessage[] = [
  {
    id: 'lead-1',
    name: 'Md. Rafiqul Islam',
    designation: 'Headmaster',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    qualification: 'M.Sc (Mathematics), B.Ed (First Class), Rajshahi University',
    message: 'Welcome to Dadra High School. Since our founding in 1972, we have strived to impart not only scholastic excellence but deep moral grounding, discipline, and technological literacy. Our mission is to empower young minds from all walks of life to dream ambitiously and contribute meaningfully to the progress of Bangladesh.',
    displayOrder: 1,
    isPublished: true
  },
  {
    id: 'lead-2',
    name: 'Alhaj Md. Abdus Sattar',
    designation: 'Chairman, School Managing Committee',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    qualification: 'B.A (Hons), M.A, Social Worker & Education Philanthropist',
    message: 'Education is the most potent catalyst for social transformation. As Chairman of the Managing Committee, I am immensely proud of the collective accomplishments of our faculty and students. We remain committed to expanding physical facilities, computer laboratories, and extracurricular opportunities.',
    displayOrder: 2,
    isPublished: true
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't-1',
    employeeId: 'DHS-T-01',
    name: 'Md. Rafiqul Islam',
    banglaName: 'মোঃ রফিকুল ইসলাম',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    designation: 'Headmaster & Senior Math Teacher',
    subject: 'Higher Mathematics & Physics',
    qualification: 'M.Sc (Math), B.Ed',
    email: 'headmaster@dadrahighschool.edu.bd',
    phone: '+880 1712-112233',
    joiningDate: '1998-03-01',
    bio: 'Dedicated teacher with over 28 years of pedagogical leadership in secondary education.',
    displayOrder: 1,
    isPublished: true
  },
  {
    id: 't-2',
    employeeId: 'DHS-T-02',
    name: 'Mrs. Selina Akhter',
    banglaName: 'সেলিনা আক্তার',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    designation: 'Assistant Headmistress',
    subject: 'English Language & Literature',
    qualification: 'M.A in English, B.Ed',
    email: 'selina.akhter@dadrahighschool.edu.bd',
    phone: '+880 1713-223344',
    joiningDate: '2004-07-15',
    bio: 'Passionate about English communicative proficiency, public speaking, and creative writing.',
    displayOrder: 2,
    isPublished: true
  },
  {
    id: 't-3',
    employeeId: 'DHS-T-03',
    name: 'Kazi Mahbubur Rahman',
    banglaName: 'কাজী মাহবুবুর রহমান',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    designation: 'Senior Teacher (Science)',
    subject: 'General Science & Chemistry',
    qualification: 'M.Sc in Chemistry',
    email: 'kazi.mahbub@dadrahighschool.edu.bd',
    phone: '+880 1714-334455',
    joiningDate: '2008-01-10',
    bio: 'Mentor for the school science club and annual science fair exhibits.',
    displayOrder: 3,
    isPublished: true
  },
  {
    id: 't-4',
    employeeId: 'DHS-T-04',
    name: 'Shirin Sultana',
    banglaName: 'শিরিন সুলতানা',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    designation: 'Senior Teacher (Bangla)',
    subject: 'Bangla First & Second Paper',
    qualification: 'M.A in Bangla Literature, B.Ed',
    email: 'shirin.s@dadrahighschool.edu.bd',
    phone: '+880 1715-445566',
    joiningDate: '2011-09-01',
    bio: 'Promoter of cultural heritage, recitation, and Bengali theater in school.',
    displayOrder: 4,
    isPublished: true
  },
  {
    id: 't-5',
    employeeId: 'DHS-T-05',
    name: 'Md. Anisur Rahman',
    banglaName: 'মোঃ আনিসুর রহমান',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    designation: 'Teacher (ICT & Computer)',
    subject: 'Information & Communication Technology',
    qualification: 'B.Sc in Computer Science & Engineering',
    email: 'anisur.ict@dadrahighschool.edu.bd',
    phone: '+880 1716-556677',
    joiningDate: '2016-02-15',
    bio: 'Specialist in digital classrooms, multimedia content creation, and basic coding for teens.',
    displayOrder: 5,
    isPublished: true
  },
  {
    id: 't-6',
    employeeId: 'DHS-T-06',
    name: 'Tania Parveen',
    banglaName: 'তানিয়া পারভীন',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    designation: 'Teacher (Social Sciences)',
    subject: 'Bangladesh & Global Studies',
    qualification: 'M.S.S in Sociology',
    email: 'tania.parveen@dadrahighschool.edu.bd',
    phone: '+880 1717-667788',
    joiningDate: '2018-05-02',
    bio: 'Engaging teacher who helps students connect historical lessons with modern civic duties.',
    displayOrder: 6,
    isPublished: true
  }
];

export const initialStaff: Staff[] = [
  {
    id: 'st-1',
    employeeId: 'DHS-S-01',
    name: 'Md. Nazrul Islam',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    designation: 'Head Clerk & Accountant',
    department: 'Administration',
    email: 'accounts@dadrahighschool.edu.bd',
    phone: '+880 1718-778899',
    displayOrder: 1,
    isPublished: true
  },
  {
    id: 'st-2',
    employeeId: 'DHS-S-02',
    name: 'Mst. Rabeya Begum',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    designation: 'Librarian & Documentation Officer',
    department: 'Library',
    email: 'library@dadrahighschool.edu.bd',
    phone: '+880 1719-889900',
    displayOrder: 2,
    isPublished: true
  }
];

export const initialStudents: Student[] = [
  {
    id: 'stu-1',
    studentId: 'DHS-2026-1001',
    name: 'Sadia Jahan',
    banglaName: 'সাদিয়া জাহান',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    dateOfBirth: '2010-04-12',
    gender: 'Female',
    className: 'Class 10',
    section: 'A (Science)',
    rollNumber: 1,
    session: '2025-2026',
    admissionDate: '2021-01-10',
    fatherName: 'Md. Jahangir Alam',
    motherName: 'Nasrin Sultana',
    guardianName: 'Md. Jahangir Alam',
    guardianPhone: '+880 1720-112233',
    email: 'sadia.jahan@gmail.com',
    address: 'Dadra Purba Para, Joypurhat Sadar',
    bloodGroup: 'A+',
    status: 'Active'
  },
  {
    id: 'stu-2',
    studentId: 'DHS-2026-1002',
    name: 'Tanvir Ahmed',
    banglaName: 'তানভীর আহমেদ',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    dateOfBirth: '2010-08-25',
    gender: 'Male',
    className: 'Class 10',
    section: 'A (Science)',
    rollNumber: 2,
    session: '2025-2026',
    admissionDate: '2021-01-10',
    fatherName: 'Mominul Haque',
    motherName: 'Rokeya Khatun',
    guardianName: 'Mominul Haque',
    guardianPhone: '+880 1721-223344',
    email: 'tanvir.ahmed@gmail.com',
    address: 'Dadra Bazar, Joypurhat',
    bloodGroup: 'B+',
    status: 'Active'
  },
  {
    id: 'stu-3',
    studentId: 'DHS-2026-0901',
    name: 'Ayesha Siddika',
    banglaName: 'আয়েশা সিদ্দিকা',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    dateOfBirth: '2011-02-14',
    gender: 'Female',
    className: 'Class 9',
    section: 'B (Humanities)',
    rollNumber: 1,
    session: '2025-2026',
    admissionDate: '2022-01-12',
    fatherName: 'Abdul Mannan',
    motherName: 'Kulsum Begum',
    guardianName: 'Abdul Mannan',
    guardianPhone: '+880 1722-334455',
    address: 'Kalyanpur, Joypurhat Sadar',
    bloodGroup: 'O+',
    status: 'Active'
  },
  {
    id: 'stu-4',
    studentId: 'DHS-2026-0801',
    name: 'Mahir Faisal',
    banglaName: 'মাহির ফয়সাল',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    dateOfBirth: '2012-07-09',
    gender: 'Male',
    className: 'Class 8',
    section: 'A',
    rollNumber: 5,
    session: '2025-2026',
    admissionDate: '2023-01-08',
    fatherName: 'Firoz Mahmud',
    motherName: 'Shamima Akter',
    guardianName: 'Firoz Mahmud',
    guardianPhone: '+880 1723-445566',
    address: 'Dadra Paschim Para, Joypurhat',
    bloodGroup: 'AB+',
    status: 'Active'
  }
];

export const initialAcademicPrograms: AcademicProgram[] = [
  {
    id: 'prog-1',
    name: 'Secondary Science Group',
    description: 'Comprehensive curriculum focusing on Physics, Chemistry, Biology, Higher Mathematics, and ICT to prepare future medical, engineering, and tech leaders.',
    classRange: 'Class 9 - Class 10',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Higher Math', 'Bangla', 'English', 'ICT', 'BGS'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    icon: 'FlaskConical',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'prog-2',
    name: 'Secondary Business Studies',
    description: 'Building solid foundation in Accounting, Finance & Banking, and Business Entrepreneurship for modern commerce and administrative careers.',
    classRange: 'Class 9 - Class 10',
    subjects: ['Accounting', 'Business Entrepreneurship', 'Finance & Banking', 'General Science', 'Bangla', 'English', 'ICT'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    icon: 'TrendingUp',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'prog-3',
    name: 'Secondary Humanities Group',
    description: 'Cultivating critical thinking, historical perspective, geography, and civic leadership through rich humanities subjects.',
    classRange: 'Class 9 - Class 10',
    subjects: ['History of Bangladesh', 'Geography & Environment', 'Civics & Citizenship', 'Economics', 'Bangla', 'English'],
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    icon: 'BookOpen',
    displayOrder: 3,
    isActive: true
  },
  {
    id: 'prog-4',
    name: 'Junior Secondary Education',
    description: 'Foundational secondary stage fostering conceptual clarity, language fluency, mathematical reasoning, and sportsmanship.',
    classRange: 'Class 6 - Class 8',
    subjects: ['Bangla', 'English', 'Mathematics', 'General Science', 'BGS', 'ICT', 'Religion & Moral Edu'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    icon: 'GraduationCap',
    displayOrder: 4,
    isActive: true
  }
];

export const initialPerformanceStats: PerformanceStatistic[] = [
  { id: 'perf-1', year: 2021, examName: 'SSC Examination', passRate: 96.8, averageGpa: 4.45, aPlusRate: 28.5, totalExaminees: 172 },
  { id: 'perf-2', year: 2022, examName: 'SSC Examination', passRate: 98.1, averageGpa: 4.62, aPlusRate: 34.2, totalExaminees: 184 },
  { id: 'perf-3', year: 2023, examName: 'SSC Examination', passRate: 97.6, averageGpa: 4.58, aPlusRate: 32.8, totalExaminees: 195 },
  { id: 'perf-4', year: 2024, examName: 'SSC Examination', passRate: 99.0, averageGpa: 4.75, aPlusRate: 41.5, totalExaminees: 205 },
  { id: 'perf-5', year: 2025, examName: 'SSC Examination', passRate: 99.5, averageGpa: 4.82, aPlusRate: 46.2, totalExaminees: 218 }
];

export const initialStudentResults: StudentResult[] = [
  {
    id: 'res-1',
    studentId: 'DHS-2026-1001',
    studentName: 'Sadia Jahan',
    className: 'Class 10',
    section: 'A',
    roll: 1,
    examName: 'Pre-Test Examination',
    examYear: 2026,
    totalMarks: 672,
    gpa: 5.00,
    grade: 'A+',
    published: true,
    subjects: [
      { id: 's-1', subject: 'Bangla', marks: 88, grade: 'A+', gradePoint: 5.0 },
      { id: 's-2', subject: 'English', marks: 84, grade: 'A+', gradePoint: 5.0 },
      { id: 's-3', subject: 'Mathematics', marks: 96, grade: 'A+', gradePoint: 5.0 },
      { id: 's-4', subject: 'Physics', marks: 91, grade: 'A+', gradePoint: 5.0 },
      { id: 's-5', subject: 'Chemistry', marks: 89, grade: 'A+', gradePoint: 5.0 },
      { id: 's-6', subject: 'Biology', marks: 87, grade: 'A+', gradePoint: 5.0 },
      { id: 's-7', subject: 'Higher Mathematics', marks: 92, grade: 'A+', gradePoint: 5.0 },
      { id: 's-8', subject: 'ICT', marks: 45, grade: 'A+', gradePoint: 5.0 }
    ]
  },
  {
    id: 'res-2',
    studentId: 'DHS-2026-1002',
    studentName: 'Tanvir Ahmed',
    className: 'Class 10',
    section: 'A',
    roll: 2,
    examName: 'Pre-Test Examination',
    examYear: 2026,
    totalMarks: 638,
    gpa: 4.88,
    grade: 'A',
    published: true,
    subjects: [
      { id: 's-1', subject: 'Bangla', marks: 82, grade: 'A+', gradePoint: 5.0 },
      { id: 's-2', subject: 'English', marks: 78, grade: 'A', gradePoint: 4.0 },
      { id: 's-3', subject: 'Mathematics', marks: 94, grade: 'A+', gradePoint: 5.0 },
      { id: 's-4', subject: 'Physics', marks: 85, grade: 'A+', gradePoint: 5.0 },
      { id: 's-5', subject: 'Chemistry', marks: 82, grade: 'A+', gradePoint: 5.0 },
      { id: 's-6', subject: 'Biology', marks: 79, grade: 'A', gradePoint: 4.0 },
      { id: 's-7', subject: 'Higher Mathematics', marks: 90, grade: 'A+', gradePoint: 5.0 },
      { id: 's-8', subject: 'ICT', marks: 48, grade: 'A+', gradePoint: 5.0 }
    ]
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Dadra High School Crowned Champion at Joypurhat District Science Olympiad',
    slug: 'dadra-high-school-champion-joypurhat-science-olympiad',
    excerpt: 'Our junior robotics and physics models received the 1st prize among 42 participating schools from across Rajshahi division.',
    content: 'Students of Dadra High School once again proved their mettle at the Joypurhat District Inter-School Science Fair and Olympiad held at the District Collectorate auditorium. Led by our ICT and Science faculty, the 4-member student team designed an automated smart irrigation and flood alarm system using microcontrollers. Deputy Commissioner of Joypurhat conferred the crest to our students.',
    featuredImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    category: 'Achievement',
    author: 'Editorial Desk',
    tags: ['Science Olympiad', 'Award', 'Robotics'],
    publishedAt: '2026-09-12',
    status: 'published'
  },
  {
    id: 'news-2',
    title: 'Grand Observance of International Mother Language Day at Campus',
    slug: 'grand-observance-mother-language-day-campus',
    excerpt: 'Barefoot Prabhat Pheri, floral wreath offering at the Shaheed Minar, and a vibrant poetry recitation competition marked the day.',
    content: 'The 21st February, Shaheed Dibash & International Mother Language Day was observed with solemn reverence and national pride at Dadra High School. The morning commenced with Prabhat Pheri through the village, followed by wreath placement at our newly renovated Shaheed Minar. Students recited patriotic poems and took oaths to honor the language martyrs.',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    author: 'Cultural Secretary',
    tags: ['Ekushey February', 'Shaheed Minar', 'Language Day'],
    publishedAt: '2026-02-21',
    status: 'published'
  },
  {
    id: 'news-3',
    title: 'Inauguration of New 4-Story Academic Building & Digital Computer Lab',
    slug: 'inauguration-new-academic-building-computer-lab',
    excerpt: 'The newly constructed building houses 12 modern multimedia classrooms and a 30-PC computer training facility.',
    content: 'A milestone in the infrastructural evolution of Dadra High School was reached yesterday with the formal inauguration of our expanded 4-story academic annex. Equipped with high-speed internet, projector classrooms, and ergonomic furniture, this facility will accommodate the growing number of secondary students.',
    featuredImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    category: 'Campus News',
    author: 'Principal Office',
    tags: ['Campus Building', 'Computer Lab', 'Modernization'],
    publishedAt: '2026-08-01',
    status: 'published'
  }
];

export const initialEvents: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Annual Sports Competition & Cultural Prize Giving 2026',
    slug: 'annual-sports-competition-2026',
    description: 'Track and field races, high jump, javelin throw, tug-of-war, followed by cultural performances and medals distribution.',
    content: 'Our flagship annual sports event features 28 competitive categories across junior and senior divisions. Guardians and community leaders are warmly invited to cheer for the athletes.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    eventDate: '2026-10-24',
    startTime: '08:30 AM',
    endTime: '05:00 PM',
    location: 'Dadra High School Central Playground',
    category: 'Sports',
    status: 'upcoming'
  },
  {
    id: 'ev-2',
    title: 'Inter-House Debate Championship 2026',
    slug: 'inter-house-debate-championship-2026',
    description: 'Parliamentary debate tournament on contemporary scientific and socioeconomic topics.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    eventDate: '2026-11-05',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    location: 'Auditorium Hall',
    category: 'Academic',
    status: 'upcoming'
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Best Secondary School in Joypurhat Sadar Upazila',
    description: 'Conferred by the Ministry of Education for outstanding academic discipline, zero drop-out rate, and 99.5% SSC pass rate.',
    category: 'Institutional Award',
    year: 2025,
    imageUrl: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=600&q=80',
    displayOrder: 1,
    isPublished: true
  },
  {
    id: 'ach-2',
    title: 'Divisional Champion - Inter-School Football Cup',
    description: 'Dadra High School football squad lifted the Rajshahi Divisional trophy winning the final by 3-1 goals.',
    category: 'Sports',
    year: 2025,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    displayOrder: 2,
    isPublished: true
  },
  {
    id: 'ach-3',
    title: 'President Scout Award (National Recognition)',
    description: 'Three scouts from our school troop achieved the prestigious President Scout Award for exemplary community service.',
    category: 'Scouts & Community',
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
    studentName: 'Nabil Hasan & Team',
    displayOrder: 3,
    isPublished: true
  }
];

export const initialGalleryAlbums: GalleryAlbum[] = [
  {
    id: 'alb-1',
    name: 'Campus Infrastructure & Grounds',
    slug: 'campus-infrastructure',
    description: 'Picturesque views of Dadra High School lush green campus, academic buildings, and open playground.',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
    category: 'Campus',
    isPublished: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'alb-2',
    name: 'Science Labs & Technology Workshops',
    slug: 'science-labs-technology',
    description: 'Students conducting physics, chemistry, biology practicals and computer coding sessions.',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    category: 'Science',
    isPublished: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'alb-3',
    name: 'Sports & Athletic Championships',
    slug: 'sports-athletics',
    description: 'Annual track competitions, football matches, and championship celebrations.',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    category: 'Sports',
    isPublished: true,
    createdAt: '2026-03-05'
  },
  {
    id: 'alb-4',
    name: 'Cultural Celebrations & National Days',
    slug: 'cultural-celebrations',
    description: 'Pohela Boishakh, Victory Day, Independence Day, and seasonal music performances.',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    category: 'Cultural',
    isPublished: true,
    createdAt: '2026-04-12'
  }
];

export const initialGalleryImages: GalleryImage[] = [
  {
    id: 'img-1',
    albumId: 'alb-1',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'Main Academic Building & Administrative Wing',
    altText: 'Dadra High School front view',
    displayOrder: 1,
    isPublished: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'img-2',
    albumId: 'alb-1',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    caption: 'Serene Tree-Lined Campus Boulevard',
    altText: 'School compound nature walk',
    displayOrder: 2,
    isPublished: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'img-3',
    albumId: 'alb-2',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern Chemistry & Biology Practical Station',
    altText: 'Students working in school lab',
    displayOrder: 1,
    isPublished: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'img-4',
    albumId: 'alb-2',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    caption: 'Sheikh Russel Digital Lab - Computer Literacy Training',
    altText: 'Computer room at school',
    displayOrder: 2,
    isPublished: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'img-5',
    albumId: 'alb-3',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    caption: 'Inter-Class Sprint Tournament 100m Dash',
    altText: 'Students running on school field',
    displayOrder: 1,
    isPublished: true,
    createdAt: '2026-03-05'
  },
  {
    id: 'img-6',
    albumId: 'alb-4',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'Annual Cultural Festival Choir Performance',
    altText: 'Stage performance by students',
    displayOrder: 1,
    isPublished: true,
    createdAt: '2026-04-12'
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Md. Kamrul Hasan',
    email: 'kamrul.hasan@yahoo.com',
    phone: '+880 1711-224466',
    subject: 'Inquiry regarding Class 8 admission transfer certificate',
    message: 'Respected Headmaster, I have recently been transferred to Joypurhat Sadar and wish to seek admission for my son in Class 8. Could you please advise if seats are available in the Science stream?',
    status: 'unread',
    createdAt: '2026-09-21T14:32:00Z'
  },
  {
    id: 'msg-2',
    name: 'Begum Farhana',
    email: 'farhana.mom@gmail.com',
    phone: '+880 1718-990011',
    subject: 'Information on School Bus Route from Joypurhat Town',
    message: 'Assalamu Alaikum. Does the school provide transportation service for students commuting from Joypurhat Station Road area?',
    status: 'read',
    createdAt: '2026-09-20T08:15:00Z',
    replyText: 'Walaikum Assalam. Yes, the school runs two commuter minibuses covering Joypurhat town to Dadra campus.'
  }
];

export const initialAdmissions: AdmissionApplication[] = [
  {
    id: 'adm-1',
    applicationNumber: 'DHS-ADM-2026-001',
    studentName: 'Mushfiqur Rahman',
    banglaName: 'মুশফিকুর রহমান',
    dateOfBirth: '2013-05-18',
    gender: 'Male',
    classApplied: 'Class 6',
    fatherName: 'Md. Habibur Rahman',
    motherName: 'Laila Arjumand',
    guardianPhone: '+880 1733-112233',
    email: 'habib.rahman@gmail.com',
    address: 'Vill: Chakdadra, Post: Dadra, Joypurhat Sadar',
    previousSchool: 'Dadra Government Primary School',
    status: 'Pending',
    createdAt: '2026-09-19T11:20:00Z'
  },
  {
    id: 'adm-2',
    applicationNumber: 'DHS-ADM-2026-002',
    studentName: 'Fariha Tasnim',
    banglaName: 'ফারিহা তাসনিম',
    dateOfBirth: '2012-11-04',
    gender: 'Female',
    classApplied: 'Class 7',
    fatherName: 'Engr. Rezaul Karim',
    motherName: 'Tahmina Akhter',
    guardianPhone: '+880 1734-223344',
    email: 'rezaul.karim@gmail.com',
    address: 'Station Road, Joypurhat',
    previousSchool: 'Joypurhat Model School',
    status: 'Under Review',
    createdAt: '2026-09-18T16:45:00Z'
  }
];

export const initialMedia: MediaItem[] = [
  {
    id: 'med-1',
    filename: 'school_campus_front.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image/jpeg',
    fileSize: 450200,
    altText: 'Dadra High School Front Wing',
    uploadedBy: 'Admin',
    createdAt: '2026-09-01'
  },
  {
    id: 'med-2',
    filename: 'science_lab_modern.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    fileType: 'image/jpeg',
    fileSize: 620100,
    altText: 'Science Lab Equipment',
    uploadedBy: 'Admin',
    createdAt: '2026-09-02'
  }
];

export const initialCMSPages: CMSPage[] = [
  {
    id: 'page-about',
    title: 'About Dadra High School',
    slug: 'about',
    metaTitle: 'About Us | Dadra High School, Joypurhat',
    metaDescription: 'Learn about the vision, mission, and rich heritage of Dadra High School in Joypurhat, Bangladesh.',
    featuredImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    content: `<h3>Five Decades of Scholastic Eminence</h3>
<p>Established in 1972 in the vibrant heart of Joypurhat Sadar, Dadra High School (EIIN 121850) has stood as a beacon of academic enlightenment, discipline, and moral excellence. Guided by the curriculum of the Board of Intermediate and Secondary Education (BISE) Rajshahi, our institution has produced thousands of successful professionals, doctors, engineers, university professors, civil servants, and enterprising community leaders.</p>

<h3>Our Core Mission</h3>
<p>To cultivate an inclusive and technologically enriched learning ecosystem where every student is challenged to achieve academic distinction, critical thinking skills, ethical maturity, and an enduring sense of civic responsibility toward Bangladesh and the world.</p>

<h3>Our Vision</h3>
<p>To be acknowledged as one of northern Bangladesh's premier secondary educational institutions, recognized for innovation in science and digital pedagogy, sports championships, and cultural vitality.</p>`,
    status: 'published',
    updatedAt: '2026-09-10'
  },
  {
    id: 'page-history',
    title: 'History & Heritage',
    slug: 'history',
    metaTitle: 'Our History | Dadra High School',
    metaDescription: 'The inspiring journey of Dadra High School from modest beginnings in 1972 to a premier educational pillar.',
    featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    content: `<h3>Founding in the Dawn of Bangladesh's Independence (1972)</h3>
<p>In the aftermath of the glorious 1971 Liberation War, visionary local educationists, freedom fighters, and village elders recognized that educational liberation was paramount for rebuilding the nation. Through generous land donations by local philanthropists in Dadra village, the foundation stone was laid in early 1972 with just four thatched classrooms.</p>

<h3>Growth and Modernization</h3>
<p>Over the decades, government recognition, community support, and relentless dedication from our pioneer teachers transformed the humble school into a fully equipped secondary institution. Today, our 3.5-acre campus comprises a 4-story main academic complex, computerized multimedia laboratories, specialized physics and chemistry facilities, a grand assembly auditorium, and an expansive sports ground.</p>`,
    status: 'published',
    updatedAt: '2026-09-12'
  }
];
