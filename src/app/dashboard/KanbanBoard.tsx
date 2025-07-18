import React, { useEffect, useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';

export const KanbanBoard: React.FC = () => {
  const { 
    tasks, 
    columns, 
    initializeData, 
    getTasksByStatus, 
    moveTask 
  } = useTaskStore();
  
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedTaskId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    if (taskId && draggedTaskId) {
      const draggedTask = tasks.find(task => task.id === taskId);
      if (draggedTask && draggedTask.status !== newStatus) {
        moveTask(taskId, newStatus);
      }
    }
    setDraggedTaskId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <div className="mb-4 text-4xl">📋</div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen p-6 bg-white">
      <div className="flex gap-2 pb-4 overflow-x-auto border-b-neutral-500">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status);
          
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          );
        })}
      </div>
    </div>
  );
};