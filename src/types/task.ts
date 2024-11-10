export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  location: string;
  category: string;
  date: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  status: 'open' | 'in_progress' | 'completed';
}

export interface CreateTaskData {
  title: string;
  description: string;
  budget: number;
  location: string;
  category: string;
  date: string;
}