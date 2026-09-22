import React from 'react';
import { useCMSStore } from '../../../lib/store';
import { HeroSlider } from '../HeroSlider';
import { NoticeBoardSection } from '../sections/NoticeBoardSection';
import { LeadershipSection } from '../sections/LeadershipSection';
import { AboutSection } from '../sections/AboutSection';
import { ProgramsSection } from '../sections/ProgramsSection';
import { TeachersSection } from '../sections/TeachersSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { PerformanceSection } from '../sections/PerformanceSection';
import { NewsSection } from '../sections/NewsSection';
import { EventsSection } from '../sections/EventsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { StudentLifeSection } from '../sections/StudentLifeSection';
import { GallerySection } from '../sections/GallerySection';
import { QuickAccessSection } from '../sections/QuickAccessSection';
import { ContactSection } from '../sections/ContactSection';
import { SectionType } from '../../../types';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { homepageSections } = useCMSStore();

  const visibleSections = [...homepageSections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const renderSection = (type: SectionType, key: string) => {
    switch (type) {
      case 'hero':
        return <HeroSlider key={key} onNavigate={onNavigate} />;
      case 'notice_board':
        return <NoticeBoardSection key={key} onNavigate={onNavigate} />;
      case 'leadership':
        return <LeadershipSection key={key} onNavigate={onNavigate} />;
      case 'about':
        return <AboutSection key={key} onNavigate={onNavigate} />;
      case 'programs':
        return <ProgramsSection key={key} onNavigate={onNavigate} />;
      case 'teachers':
        return <TeachersSection key={key} onNavigate={onNavigate} />;
      case 'statistics':
        return <StatisticsSection key={key} />;
      case 'performance':
        return <PerformanceSection key={key} onNavigate={onNavigate} />;
      case 'news':
        return <NewsSection key={key} onNavigate={onNavigate} />;
      case 'events':
        return <EventsSection key={key} onNavigate={onNavigate} />;
      case 'achievements':
        return <AchievementsSection key={key} onNavigate={onNavigate} />;
      case 'student_life':
        return <StudentLifeSection key={key} onNavigate={onNavigate} />;
      case 'gallery':
        return <GallerySection key={key} onNavigate={onNavigate} />;
      case 'quick_access':
        return <QuickAccessSection key={key} onNavigate={onNavigate} />;
      case 'contact':
        return <ContactSection key={key} onNavigate={onNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {visibleSections.map(section => renderSection(section.sectionKey, section.id))}
    </div>
  );
};
