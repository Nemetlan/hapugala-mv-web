import { Phone, Mail, User, BookOpen, Bell } from 'lucide-react';
import { SCHOOL_DATA } from '../constants';

export function TopBar() {
  return (
    <div className="bg-navy text-white py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <a href={`tel:${SCHOOL_DATA.phone}`} className="flex items-center gap-1 hover:text-gold-heritage transition-colors">
            <Phone size={14} />
            <span>{SCHOOL_DATA.phone}</span>
          </a>
          <a href={`mailto:${SCHOOL_DATA.email}`} className="flex items-center gap-1 hover:text-gold-heritage transition-colors">
            <Mail size={14} />
            <span>{SCHOOL_DATA.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a href="#admissions" className="flex items-center gap-1 hover:text-gold-heritage transition-colors">
            <BookOpen size={14} />
            <span>Admissions</span>
          </a>
          <a href="#parent-portal" className="flex items-center gap-1 hover:text-gold-heritage transition-colors">
            <User size={14} />
            <span>Parent Portal</span>
          </a>
          <a href="#notice-board" className="flex items-center gap-1 hover:text-gold-heritage transition-colors">
            <Bell size={14} />
            <span>Notice Board</span>
          </a>
        </div>
      </div>
    </div>
  );
}
