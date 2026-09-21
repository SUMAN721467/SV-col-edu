import React from 'react';
import { useData } from '../../context/DataContext';

interface NoticeTickerProps {
  onNavigate?: (page: string) => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ onNavigate }) => {
  const { announcements, notices } = useData();

  // Combine custom announcements and official notice titles
  const tickerItems = announcements.length > 0 
    ? announcements 
    : notices.map(n => `[${n.badge}] ${n.title} (${n.date})`);

  return (
    <div className="bg-gold-bg border-b border-gold-border flex flex-col sm:flex-row items-stretch overflow-hidden min-h-[40px]">
      
      {/* Ticker Header Badge */}
      <button 
        onClick={() => onNavigate && onNavigate('notices')}
        className="bg-gold text-white font-bold text-xs uppercase tracking-wider px-4 py-2 sm:py-0 flex items-center justify-center sm:justify-start gap-2 flex-shrink-0 z-10 shadow-sm cursor-pointer hover:bg-gold-dark transition-colors"
        title="View All Notices"
      >
        <i className="fa-solid fa-bullhorn"></i>
        <span>Official Announcements</span>
      </button>

      {/* Marquee Content */}
      <div 
        onClick={() => onNavigate && onNavigate('notices')}
        className="flex-grow overflow-hidden whitespace-nowrap relative flex items-center py-2 sm:py-0 cursor-pointer"
        title="Click to view Notice Board"
      >
        <div className="animate-ticker text-xs sm:text-sm font-medium text-amber-900">
          {tickerItems.concat(tickerItems).map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2 mr-10 sm:mr-14 hover:underline">
              <i className="fa-solid fa-bell text-gold"></i>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
