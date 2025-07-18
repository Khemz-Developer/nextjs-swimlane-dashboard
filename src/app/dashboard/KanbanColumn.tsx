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
      return 'bg-orange-100 text-orange-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'todo':
      return '📝';
    case 'in_progress':
      return '⏳';
    case 'approved':
      return '✅';
    case 'rejected':
      return '❌';
    default:
      return '📝';
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
    <div className="flex flex-col rounded-lg w-80 min-w-80 bg-gray-50">
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon(column.status)}</span>
          <h2 className="font-semibold text-gray-900">{column.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(column.status)}`}>
            {tasks.length}
          </span>
        </div>
        
        {/* Add Task Button */}
        <button className="flex items-center justify-center w-6 h-6 text-gray-600 transition-colors bg-gray-200 rounded-full hover:bg-gray-300 hover:text-gray-800">
          <span className="text-sm font-bold">+</span>
        </button>
      </div>

      {/* Column Content */}
      <div
        className={`flex-1 p-4 min-h-96 transition-colors ${
          isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <span className="mb-2 text-2xl">{getStatusIcon(column.status)}</span>
            <span className="text-sm">No tasks</span>
          </div>
        ) : (
          <div className="space-y-3">
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