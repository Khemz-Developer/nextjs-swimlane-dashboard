// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Task, Project, Column } from '../types';
// import mockData from '../data/tasks.json';

// interface TaskState {
//   tasks: Task[];
//   project: Project;
//   columns: Column[];
//   searchQuery: string;
//   filteredTasks: Task[];
  
//   // Actions
//   setTasks: (tasks: Task[]) => void;
//   updateTask: (taskId: string, updates: Partial<Task>) => void;
//   moveTask: (taskId: string, newStatus: Task['status']) => void;
//   setSearchQuery: (query: string) => void;
//   initializeData: () => void;
//   getTasksByStatus: (status: Task['status']) => Task[];
//   filterTasks: () => void; // Added this missing method
// }

// const initialColumns: Column[] = [
//   {
//     id: 'todo',
//     title: 'To Do',
//     status: 'todo',
//     color: 'bg-gray-100',
//     tasks: []
//   },
//   {
//     id: 'in_progress',
//     title: 'In Progress',
//     status: 'in_progress',
//     color: 'bg-orange-100',
//     tasks: []
//   },
//   {
//     id: 'approved',
//     title: 'Approved',
//     status: 'approved',
//     color: 'bg-green-100',
//     tasks: []
//   },
//   {
//     id: 'rejected',
//     title: 'Reject',
//     status: 'rejected',
//     color: 'bg-red-100',
//     tasks: []
//   }
// ];

// export const useTaskStore = create<TaskState>()(
//   persist(
//     (set, get) => ({
//       tasks: [],
//       project: {} as Project,
//       columns: initialColumns,
//       searchQuery: '',
//       filteredTasks: [],

//       setTasks: (tasks) => {
//         set({ tasks });
//         get().filterTasks();
//       },

//       updateTask: (taskId, updates) => {
//         set((state) => {
//           const updatedTasks = state.tasks.map((task) =>
//             task.id === taskId ? { ...task, ...updates } : task
//           );
//           return { tasks: updatedTasks };
//         });
//         get().filterTasks();
//       },

//       moveTask: (taskId, newStatus) => {
//         set((state) => {
//           const updatedTasks = state.tasks.map((task) =>
//             task.id === taskId
//               ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
//               : task
//           );
//           return { tasks: updatedTasks };
//         });
//         get().filterTasks();
//       },

//       setSearchQuery: (query) => {
//         set({ searchQuery: query });
//         get().filterTasks();
//       },

//       filterTasks: () => {
//         const { tasks, searchQuery } = get();
//         const filtered = tasks.filter((task) =>
//           task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           task.description?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         set({ filteredTasks: filtered });
//       },

//       initializeData: () => {
//         const { tasks, project } = mockData;
//         set({ 
//           tasks: tasks as Task[], 
//           project: project as Project 
//         });
//         get().filterTasks();
//       },

//       getTasksByStatus: (status) => {
//         const { filteredTasks } = get();
//         return filteredTasks.filter((task) => task.status === status);
//       }
//     }),
//     {
//       name: 'task-store',
//       partialize: (state) => ({
//         tasks: state.tasks,
//         project: state.project
//       })
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Project, Column } from '../types';
import mockData from '../data/tasks.json';

interface TaskState {
  tasks: Task[];
  project: Project;
  columns: Column[];
  searchQuery: string;
  filteredTasks: Task[];
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  setSearchQuery: (query: string) => void;
  initializeData: () => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  filterTasks: () => void; // Added this missing method
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    status: 'todo',
    color: 'bg-gray-100',
    tasks: []
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    status: 'in_progress',
    color: 'bg-orange-100',
    tasks: []
  },
  {
    id: 'approved',
    title: 'Approved',
    status: 'approved',
    color: 'bg-green-100',
    tasks: []
  },
  {
    id: 'rejected',
    title: 'Reject',
    status: 'rejected',
    color: 'bg-red-100',
    tasks: []
  }
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      project: {} as Project,
      columns: initialColumns,
      searchQuery: '',
      filteredTasks: [],

      setTasks: (tasks) => {
        set({ tasks });
        get().filterTasks();
      },

      updateTask: (taskId, updates) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          );
          return { tasks: updatedTasks };
        });
        get().filterTasks();
      },

      moveTask: (taskId, newStatus) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
              : task
          );
          return { tasks: updatedTasks };
        });
        get().filterTasks();
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterTasks();
      },

      filterTasks: () => {
        const { tasks, searchQuery } = get();
        const filtered = tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        set({ filteredTasks: filtered });
      },

      initializeData: () => {
        const { tasks, project } = mockData;
        set({ 
          tasks: tasks as Task[], 
          project: project as Project 
        });
        get().filterTasks();
      },

      getTasksByStatus: (status) => {
        const { filteredTasks } = get();
        return filteredTasks.filter((task) => task.status === status);
      }
    }),
    {
      name: 'task-store',
      partialize: (state) => ({
        tasks: state.tasks,
        project: state.project
      })
    }
  )
);