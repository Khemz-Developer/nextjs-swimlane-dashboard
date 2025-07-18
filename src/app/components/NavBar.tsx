
"use client";

import React from 'react';
import { Search, Plus, Settings, Bell, User } from 'lucide-react';

interface HeaderProps {
  onCreateBoard?: () => void;
  onSearch?: (query: string) => void;
  userInitials?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  onCreateBoard,
  onSearch,
  userInitials = 'O',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Board <span className="text-blue-500 font-normal">App</span>
          </span>
        </div>

        {/* Center Section - Search and Create Button */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>

          {/* Create New Board Button */}
          <button
            onClick={onCreateBoard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Create new board</span>
          </button>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-3">
          {/* Settings Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>

          {/* Notifications Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
            <Bell className="w-5 h-5" />
            {/* Notification dot */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:bg-gray-700 transition-colors duration-200">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;