
import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { Task, Column } from '../types';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Task['status']) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-800';
    case 'in_progress':
      return 'bg-orange-400 text-white';
    case 'approved':
      return 'bg-green-400 text-white';
    case 'rejected':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'in_progress':
      return 'In Progress';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Reject';
    default:
      return 'To Do';
  }
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, column.status);
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-gray-400 border border-gray-200 rounded-lg">
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center gap-3">
          <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(column.status)}`}>
             {`${getStatusText(column.status)} (${tasks.length})`}
          </span>
        </div>

        
        <div className="flex items-center gap-2">
          {/* Add Task Button */}
          <button className="flex items-center justify-center w-6 h-6 text-gray-500 transition-colors hover:text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          
          {/* More Options Button */}
          <button className="flex items-center justify-center w-6 h-6 text-gray-500 transition-colors hover:text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div
        className={`flex-1 p-4 min-h-96 transition-colors rounded-b-lg bg-gray-50 ${
          isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <span className="text-sm">No tasks</span>
          </div>
        ) : (
          <div className="space-y-3 ">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// import React, { useState } from 'react';
// import { TaskCard } from './TaskCard';
// import { Task, Column } from '../types';

// interface KanbanColumnProps {
//   column: Column;
//   tasks: Task[];
//   onDragOver: (e: React.DragEvent) => void;
//   onDrop: (e: React.DragEvent, status: Task['status']) => void;
//   onDragStart: (e: React.DragEvent, taskId: string) => void;
//   onDragEnd: (e: React.DragEvent) => void;
// }

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'todo':
//       return 'bg-gray-100 text-gray-800';
//     case 'in_progress':
//       return 'bg-orange-400 text-white';
//     case 'approved':
//       return 'bg-green-400 text-white';
//     case 'rejected':
//       return 'bg-red-500 text-white';
//     default:
//       return 'bg-gray-100 text-gray-800';
//   }
// };

// const getStatusText = (status: string) => {
//   switch (status) {
//     case 'todo':
//       return 'To Do';
//     case 'in_progress':
//       return 'In Progress';
//     case 'approved':
//       return 'Approved';
//     case 'rejected':
//       return 'Rejected';
//     default:
//       return 'To Do';
//   }
// };

// export const KanbanColumn: React.FC<KanbanColumnProps> = ({
//   column,
//   tasks,
//   onDragOver,
//   onDrop,
//   onDragStart,
//   onDragEnd
// }) => {
//   const [isDragOver, setIsDragOver] = useState(false);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//     onDragOver(e);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     onDrop(e, column.status);
//   };

//   return (
//     <div
//       className="flex flex-col flex-shrink-0 w-full overflow-hidden bg-gray-400 border border-gray-200 rounded-lg sm:w-72 md:w-80 lg:w-96"
//     >
//       {/* Column Header */}
//       <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-lg">
//         <div className="flex items-center gap-3">
//           <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(column.status)}`}>
//             {`${getStatusText(column.status)} (${tasks.length})`}
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Add Task Button */}
//           <button className="flex items-center justify-center w-6 h-6 text-gray-500 transition-colors hover:text-gray-700">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//             </svg>
//           </button>
//           {/* More Options */}
//           <button className="flex items-center justify-center w-6 h-6 text-gray-500 transition-colors hover:text-gray-700">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Column Content */}
//       <div
//         className={`flex-1 p-4 min-h-[24rem] overflow-y-auto bg-gray-50 transition-colors rounded-b-lg ${
//           isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {tasks.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-32 text-gray-400">
//             <span className="text-sm">No tasks</span>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {tasks.map((task) => (
//               <TaskCard
//                 key={task.id}
//                 task={task}
//                 onDragStart={onDragStart}
//                 onDragEnd={onDragEnd}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
