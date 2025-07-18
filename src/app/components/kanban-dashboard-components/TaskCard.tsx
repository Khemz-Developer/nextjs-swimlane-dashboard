import React from "react";
import { Task } from "../../types";

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

// Avatar Component
const Avatar = ({
  initials,
  size = "md",
  className = "",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  } as const;

  return (
    <div
      className={`${sizeClasses[size]} bg-gray-600 text-white rounded-full flex items-center justify-center font-medium ${className}`}
    >
      {initials}
    </div>
  );
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging = false,
  onDragStart,
  onDragEnd,
}) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      research: "bg-green-500",
      design: "bg-red-500",
      development: "bg-blue-500",
      testing: "bg-yellow-500",
      default: "bg-gray-500",
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const getPriorityIcon = (priority: string) => {
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    );
  };

  const formatDueDate = (dateString: string) => {
    if (dateString === "Tomorrow") return "Due: Tomorrow";
    if (dateString === "Today") return "Due: Today";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Due: Today";
      if (diffDays === 1) return "Due: Tomorrow";
      if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
      return `Due in ${diffDays} days`;
    } catch {
      return `Due: ${dateString}`;
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50 rotate-2" : ""
      }`}
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onDragEnd={onDragEnd}
    >
      {/* Category Badge */}
      <div className="flex items-center mb-3">
        <div
          className={`w-3 h-3 rounded-full ${getCategoryColor(
            task.category
          )} mr-2`}
        ></div>
        <span className="text-sm font-medium text-gray-600 capitalize">
          {task.category}
        </span>
        <div className="ml-auto">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="mb-4 text-lg font-semibold leading-tight text-gray-900">
        {task.title}
      </h3>

      {/* Assignee and Priority Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Multiple Assignees */}
        {task.assignees && task.assignees.length > 0 && (
          <div className="flex items-center">
            {task.assignees.slice(0, 2).map((assignee, index) => (
              <Avatar
                key={assignee.id}
                initials={assignee.initials}
                size="md"
                className={`border-2 border-white ${index > 0 ? "-ml-2" : ""}`}
              />
            ))}
            {task.assignees.length > 2 && (
              <div className="flex items-center justify-center w-8 h-8 -ml-2 text-sm font-medium text-gray-600 bg-gray-300 border-2 border-white rounded-full">
                +{task.assignees.length - 2}
              </div>
            )}
          </div>
        )}

        {/* Priority */}
        <div className="flex items-center gap-1 text-gray-400">
          {getPriorityIcon(task.priority)}
          <span className="text-sm capitalize">{task.priority}</span>
        </div>
      </div>

      {/* Bottom Section */}

      <div className="my-2 border-t border-gray-200"></div>

      <div className="flex items-center justify-between">
        {/* Left side - Stats */}
        <div className="flex items-center gap-4">
          {/* Attachment Icon */}
          <div className="flex items-center gap-1 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <span className="text-sm">2</span>
          </div>

          {/* Comments */}
          {task.commentsCount && (
            <div className="flex items-center gap-1 text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9.899 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.418-8 9.899-8s9.899 3.582 9.899 8z"
                />
              </svg>
              <span className="text-sm">{task.commentsCount}</span>
            </div>
          )}
        </div>

        {/* Right side - Due Date */}
        <div className="flex items-center gap-1 text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-1 text-sm">
            {task.dueDate ? formatDueDate(task.dueDate) : "No due date"}
          </span>
        </div>
      </div>
    </div>
  );
};
