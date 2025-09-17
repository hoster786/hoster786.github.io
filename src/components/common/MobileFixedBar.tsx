import React from 'react';
import { Home, Info, Mail } from 'lucide-react';

type Props = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

function MobileBottomNav({ currentPage, onNavigate }: Props): JSX.Element {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-gray-300">
      <div className="flex justify-around items-center h-12">
        <NavButton
          label="Home"
          icon={<Home className="w-4 h-4" />}
          active={currentPage === 'home'}
          onClick={() => onNavigate('home')}
        />
        <NavButton
          label="About"
          icon={<Info className="w-4 h-4" />}
          active={currentPage === 'about'}
          onClick={() => onNavigate('about')}
        />
        <NavButton
          label="Contact"
          icon={<Mail className="w-4 h-4" />}
          active={currentPage === 'contact'}
          onClick={() => onNavigate('contact')}
        />
      </div>
    </nav>
  );
}

type NavButtonProps = {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

function NavButton({ label, icon, active, onClick }: NavButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col min-h-auto items-center text-xs transition-colors mt-[4px] ${
        active ? 'text-amber-600' : 'text-gray-500 hover:text-amber-500'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default MobileBottomNav;
