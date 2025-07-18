"use client";

import React from "react";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { EditIcon } from "../components/Icon";
import { useTaskStore } from "../store/taskStore";

interface ProjectHeaderProps {
  className?: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  className = "",
}) => {
  const { project } = useTaskStore();
  
  console.log("Project data:", project);
  if (!project.id) return null;

  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          {project.name}
        </h1>
        <Badge variant="warning" className="px-2 py-1 text-xs text-orange-700 capitalize bg-orange-100 rounded">
          {project.status.replace("_", " ")}
        </Badge>
      </div>
      
      <p className="mt-1 text-sm text-gray-500">{project.description}</p>
      
      <div className="flex items-center gap-6 mt-3">
        {/* Assignees */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">assigned</span>
          <div className="flex items-center -space-x-1">
            {project.assignees?.map((user, index) => (
              <Avatar
                key={user.id}
                initials={user.initials}
                size="sm"
                className="w-6 h-6 border-2 border-white"
              />
            ))}
            <div className="flex items-center justify-center w-6 h-6 ml-1 text-xs font-medium text-gray-600 bg-gray-200 border-2 border-white rounded-full">
              +2
            </div>
          </div>
        </div>

        {/* Manage Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <span>Manage</span>
          <EditIcon size={14} />
        </button>
      </div>

      {/* Last Updated */}
      <div className="pt-4 mt-4 text-sm text-gray-400 border-t border-gray-200">
        Last updated on {project.lastUpdated}
      </div>
    </div>
  );
};