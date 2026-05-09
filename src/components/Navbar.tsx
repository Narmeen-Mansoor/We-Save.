/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import { LayoutDashboard, Users, History, GraduationCap, LogOut, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useApp();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Groups', path: '/groups', icon: Users },
    { name: 'Transactions', path: '/transactions', icon: History },
    { name: 'Learn & Grow', path: '/education', icon: GraduationCap },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 hidden h-full w-64 flex-col bg-brand-navy p-6 text-white lg:flex">
        <Link to="/" className="mb-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">WeSave</span>
        </Link>

        <div className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive 
                    ? 'bg-brand-green text-white font-medium' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
              <span className="text-xs font-bold">{user?.name[0]}</span>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between bg-brand-navy p-4 text-white lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-brand-green" />
          <span className="text-xl font-bold">WeSave</span>
        </Link>
        <div className="h-8 w-8 rounded-full bg-brand-green flex items-center justify-center text-xs font-bold">
          {user?.name[0]}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-40 flex w-full border-t border-slate-200 bg-white px-2 py-1 lg:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-1 flex-col items-center gap-1 rounded-lg py-2"
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-brand-green text-white' : 'text-slate-500'}`}>
                <Icon size={24} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-brand-green' : 'text-slate-500'}`}>
                {item.name.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Spacing for mobile layout */}
      <div className="pb-20 lg:pl-64 lg:pb-0" />
    </>
  );
}
