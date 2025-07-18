
"use client";

import React from 'react';
import { Search, Plus, Settings, Bell, User } from 'lucide-react';
import { useTaskStore } from "../store/taskStore";

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
  const setStoreSearchQuery = useTaskStore(state => state.setSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setStoreSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <header className={`bg-white border-b border-gray-200 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-md">
            <div className="flex items-center justify-center w-5 h-5 bg-white rounded-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            </div>
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Board <span className="font-normal text-blue-500">App</span>
          </span>
        </div>

        {/* Center Section - Search and Create Button */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 py-2 pl-10 pr-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Create New Board Button */}
          <button
            onClick={onCreateBoard}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium">Create new board</span>
          </button>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-3">
          {/* Settings Icon */}
          <button className="p-2 text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>

          {/* Notifications Icon */}
          <button className="relative p-2 text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
            {/* Notification dot */}
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white transition-colors duration-200 bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700">
            {userInitials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;