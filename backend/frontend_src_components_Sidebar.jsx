import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Users,
  Calendar,
  Pill,
  Clock,
  FileText,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Pill, label: 'Medications', path: '/medications' },
    { icon: Clock, label: 'Schedules', path: '/schedules' },
    { icon: FileText, label: 'Reports', path: '/reports' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
            ⚕️
          </div>
          Nursing Pro
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-500">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-blue-500 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}