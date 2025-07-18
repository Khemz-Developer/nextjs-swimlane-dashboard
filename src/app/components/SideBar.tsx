"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardIcon,
  BoardIcon,
  UsersIcon,
  CalendarIcon,
  MessageIcon,
  SupportIcon,
  LogoutIcon,
} from "./Icon";

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasNotification?: boolean;
  children?: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  className = "", 
  isOpen = false, 
  onClose 
}) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("sport-xi");
  const [expandedItems, setExpandedItems] = useState<string[]>(["boards"]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && onClose) {
        const target = event.target as HTMLElement;
        if (!target.closest('.sidebar-container')) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, onClose]);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon size={16} />,
      isActive: activeItem === "dashboard",
    },
    {
      id: "boards",
      label: "Boards",
      icon: <BoardIcon size={16} />,
      children: [
        {
          id: "create-routes",
          label: "Create routes",
          icon: <div className="w-1 h-1 ml-1 bg-gray-400 rounded-full" />,
        },
        {
          id: "deployment-react",
          label: "Deployment React App",
          icon: <div className="w-1 h-1 ml-1 bg-gray-400 rounded-full" />,
        },
        {
          id: "sport-xi",
          label: "Sport Xi Project",
          icon: <div className="w-1 h-1 ml-1 bg-blue-500 rounded-full" />,
          isActive: activeItem === "sport-xi",
        },
        {
          id: "wordpress-theme",
          label: "Wordpress theme",
          icon: <div className="w-1 h-1 ml-1 bg-gray-400 rounded-full" />,
        },
      ],
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageIcon size={16} />,
      hasNotification: true,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <CalendarIcon size={16} />,
    },
    {
      id: "team-members",
      label: "Team members",
      icon: <UsersIcon size={16} />,
    },
    {
      id: "support",
      label: "Support",
      icon: <SupportIcon size={16} />,
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (
    itemId: string,
    hasChildren: boolean,
    route?: string
  ) => {
    if (hasChildren) {
      toggleExpanded(itemId);
    } else {
      setActiveItem(itemId);
      if (route) {
        router.push(route);
      }
      // Close sidebar on mobile after navigation
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isBoardsExpanded = expandedItems.includes("boards");

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg cursor-pointer transition-colors relative ${
            item.isActive
              ? "text-blue-600"
              : item.id === "boards" && isBoardsExpanded
              ? "text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          } ${depth > 0 ? "ml-4" : ""}`}
          onClick={() =>
            handleItemClick(
              item.id,
              hasChildren,
              item.id === "sport-xi"
                ? "/sport-xi"
                : item.id === "dashboard"
                ? "/"
                : undefined
            )
          }
        >
          {/* Blue left border for boards when expanded */}
          {item.id === "boards" && isBoardsExpanded && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 rounded-r" />
          )}

          <div className="flex items-center flex-1 gap-3">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>

          {item.hasNotification && (
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
          )}

          {hasChildren && (
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-2">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" />
      )}

      {/* Sidebar */}
      <div
        className={`
          sidebar-container
          fixed md:relative
          top-0 left-0
          z-50 md:z-auto
          flex flex-col
          w-64 h-full md:h-auto
          min-h-screen
          bg-white
          border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${className}
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={onClose}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Workspace */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-white">R</span>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">workspace</div>
              <div className="text-sm font-medium text-gray-900">Root folder</div>
            </div>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 mx-2 text-white transition-colors bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600">
            <LogoutIcon size={16} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};