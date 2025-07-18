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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <Badge variant="warning" className="capitalize">
                {project.status.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Assignees */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">assigned</span>
            <div className="flex items-center -space-x-2">
              {project.assignees?.map((user, index) => (
                <Avatar
                  key={user.id}
                  initials={user.initials}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 font-medium border-2 border-white">
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
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-sm text-gray-500">
        Last updated on {project.lastUpdated}
      </div>
    </div>
  );
};
