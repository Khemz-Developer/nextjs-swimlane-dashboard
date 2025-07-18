"use client";

import React from 'react';
import { Search, Plus, Settings, Bell, Menu } from 'lucide-react';
import { useTaskStore } from "../store/taskStore";

interface HeaderProps {
  onCreateBoard?: () => void;
  onSearch?: (query: string) => void;
  onToggleSidebar?: () => void;
  userInitials?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onCreateBoard,
  onSearch,
  onToggleSidebar,
  userInitials = 'O',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const setStoreSearchQuery = useTaskStore(state => state.setSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setStoreSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-4 sm:px-6 py-3 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo Section */}
        <div className="flex items-center justify-between space-x-2 sm:justify-start">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-md">
              <div className="flex items-center justify-center w-5 h-5 bg-white rounded-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              Board <span className="font-normal text-blue-500">App</span>
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full gap-3 sm:flex-row sm:items-center sm:gap-4 sm:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Create Button */}
            <button
              onClick={onCreateBoard}
              className="flex items-center px-3 py-2 space-x-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:px-4 hover:bg-blue-600 sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden font-medium sm:inline">Create new board</span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
            </button>

            {/* User */}
            <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white transition-colors duration-200 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700">
              {userInitials}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;