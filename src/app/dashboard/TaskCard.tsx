import React from 'react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging = false,
  onDragStart,
  onDragEnd
}) => {
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `Due in ${diffDays} days`;
  };

  const isDueSoon = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 mb-3 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
      onDragEnd={onDragEnd}
    >
      {/* Priority Indicator */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">{getPriorityIcon(task.priority)}</span>
          <Badge 
            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}
            className="text-xs"
          >
            {task.priority}
          </Badge>
        </div>
        {task.attachments && task.attachments > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>📎</span>
            <span>{task.attachments}</span>
          </div>
        )}
      </div>

      {/* Task Title */}
      <h3 className="mb-2 font-medium leading-tight text-gray-900">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        {/* Due Date */}
        {task.dueDate && (
          <div className={`text-xs px-2 py-1 rounded ${
            isDueSoon(task.dueDate) 
              ? 'bg-red-100 text-red-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {formatDueDate(task.dueDate)}
          </div>
        )}

        {/* Task Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {task.comments && task.comments > 0 && (
            <span className="flex items-center gap-1">
              💬 {task.comments}
            </span>
          )}
          {task.subtasks && (
            <span className="flex items-center gap-1">
              ✅ {task.subtasks.completed}/{task.subtasks.total}
            </span>
          )}
        </div>
      </div>

      {/* Assignees */}
      {task.assignees && task.assignees.length > 0 && (
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center -space-x-2">
            {task.assignees.slice(0, 3).map((user, index) => (
              <Avatar
                key={user.id}
                initials={user.initials}
                size="sm"
                className="border-2 border-white"
              />
            ))}
            {task.assignees.length > 3 && (
              <div className="flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-600 bg-gray-200 border-2 border-white rounded-full">
                +{task.assignees.length - 3}
              </div>
            )}
          </div>

          {/* Created Date */}
          <span className="text-xs text-gray-400">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};