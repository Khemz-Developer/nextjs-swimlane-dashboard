// // components/dashboard/TaskCard.tsx
// import React from 'react';
// import { Task } from '../types';
// import { Avatar } from '../components/ui/Avatar';
// import { Badge } from '../components/ui/Badge';
// import { 
//   MessageIcon, 
//   HeartIcon, 
//   AttachmentIcon, 
//   StreamIcon, 
//   VideoIcon,
//   WarningIcon,
//   CalendarIcon 
// } from '../components/Icon';

// interface TaskCardProps {
//   task: Task;
//   className?: string;
//   onDragStart?: (e: React.DragEvent) => void;
//   onDragEnd?: (e: React.DragEvent) => void;
// }

// export const TaskCard: React.FC<TaskCardProps> = ({ 
//   task, 
//   className = '',
//   onDragStart,
//   onDragEnd 
// }) => {
//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'research': return 'bg-green-500';
//       case 'design': return 'bg-red-500';
//       case 'development': return 'bg-yellow-500';
//       case 'feedback': return 'bg-blue-500';
//       case 'interface': return 'bg-purple-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getCategoryBadgeVariant = (category: string) => {
//     switch (category) {
//       case 'research': return 'success';
//       case 'design': return 'error';
//       case 'development': return 'warning';
//       case 'feedback': return 'info';
//       case 'interface': return 'default';
//       default: return 'default';
//     }
//   };

//   return (
//     <div
//       className={`bg-white rounded-lg border border-gray-200 p-4 cursor-grab hover:shadow-md transition-shadow ${className}`}
//       draggable
//       onDragStart={onDragStart}
//       onDragEnd={onDragEnd}
//     >
//       {/* Category Badge */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${getCategoryColor(task.category)}`} />
//           <Badge variant={getCategoryBadgeVariant(task.category)} size="sm">
//             {task.description || task.category}
//           </Badge>
//         </div>
        
//         {/* Task Menu */}
//         <button 
//           className="text-gray-400 transition-colors hover:text-gray-600"
//           aria-label="Task menu"
//           title="Task menu"
//         >
//           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//           </svg>
//         </button>
//       </div>

//       {/* Task Title */}
//       <h3 className="mb-3 font-medium text-gray-900 line-clamp-2">
//         {task.title}
//       </h3>

//       {/* Assignees */}
//       <div className="flex items-center gap-2 mb-3">
//         <div className="flex items-center -space-x-2">
//           {task.assignees.map((user) => (
//             <Avatar
//               key={user.id}
//               initials={user.initials}
//               size="sm"
//               className="border-2 border-white"
//             />
//           ))}
//         </div>
//         <span className="text-xs text-gray-500">
//           {task.assignees.length} {task.assignees.length === 1 ? 'assignee' : 'assignees'}
//         </span>
//       </div>

//       {/* Due Date */}
//       {task.dueDate && (
//         <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
//           <CalendarIcon size={12} />
//           <span>Due: {task.dueDate}</span>
//         </div>
//       )}

//       {/* Attachments/Media */}
//       {(task.hasAttachment || task.hasStream || task.hasGroupCall) && (
//         <div className="mb-3">
//           {task.hasAttachment && (
//             <div className="flex items-center justify-center w-full h-20 mb-2 bg-gray-100 rounded-md">
//               <AttachmentIcon size={24} className="text-gray-400" />
//             </div>
//           )}
//           {task.hasStream && (
//             <div className="flex items-center justify-center w-full h-20 mb-2 bg-gray-100 rounded-md">
//               <StreamIcon size={24} className="text-gray-400" />
//             </div>
//           )}
//           {task.hasGroupCall && (
//             <div className="flex items-center justify-center w-full h-20 mb-2 bg-gray-100 rounded-md">
//               <VideoIcon size={24} className="text-gray-400" />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Footer */}
//       <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//         <div className="flex items-center gap-4">
//           {/* Comments */}
//           <div className="flex items-center gap-1 text-gray-500">
//             <MessageIcon size={14} />
//             <span className="text-xs">{task.commentsCount}</span>
//           </div>
          
//           {/* Likes */}
//           <div className="flex items-center gap-1 text-gray-500">
//             <HeartIcon size={14} />
//             <span className="text-xs">{task.likesCount}</span>
//           </div>
//         </div>

//         {/* Additional Actions */}
//         <div className="flex items-center gap-2">
//           {task.reportsCount && task.reportsCount > 0 && (
//             <div className="flex items-center gap-1 text-red-500">
//               <WarningIcon size={14} />
//               <span className="text-xs">{task.reportsCount} Reports</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

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
        {/* {task.dueDate && (
          <div className={`text-xs px-2 py-1 rounded ${
            isDueSoon(task.dueDate) 
              ? 'bg-red-100 text-red-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {formatDueDate(task.dueDate)}
          </div>
        )} */}

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