// types/index.ts
export interface User {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  assignees: User[];
  category: 'research' | 'design' | 'development' | 'feedback' | 'other' | 'interface';
  dueDate?: string;
  commentsCount: number;
  likesCount: number;
  reportsCount?: number;
  hasAttachment?: boolean;
  hasStream?: boolean;
  hasGroupCall?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'approved' | 'rejected';
  color: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  assignees: User[];
  lastUpdated: string;
  manager: User;
}