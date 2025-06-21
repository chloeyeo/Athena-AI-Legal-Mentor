import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  MessageSquare, 
  Calendar, 
  FolderOpen,
  Settings,
  HelpCircle
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/call', icon: Video, label: 'Live Call with Athena' },
  { to: '/qa', icon: MessageSquare, label: 'Legal Q&A' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/cases', icon: FolderOpen, label: 'Cases' },
];

const secondaryItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/help', icon: HelpCircle, label: 'Help & Support' },
];

export default function Navigation() {
  return (
    <nav 
      className="fixed left-0 top-0 h-full w-64 bg-primary-950 text-white p-4 overflow-y-auto"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="space-y-8 mt-20">
        <div>
          <h2 className="text-xs font-semibold text-primary-300 uppercase tracking-wider mb-3">
            Main Menu
          </h2>
          <ul className="space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-primary-400 ${
                      isActive
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                    }`
                  }
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-primary-300 uppercase tracking-wider mb-3">
            Support
          </h2>
          <ul className="space-y-1">
            {secondaryItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-primary-200 hover:bg-primary-800 hover:text-white transition-colors focus:ring-2 focus:ring-primary-400"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}