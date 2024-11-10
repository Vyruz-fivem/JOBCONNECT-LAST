import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, CreateTaskData } from './types/task';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

interface StoreState {
  isAuthenticated: boolean;
  user: Omit<User, 'password'> | null;
  users: User[];
  tasks: Task[];
  getTasks: () => Task[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  createTask: (taskData: CreateTaskData) => Task | null;
  updateTask: (taskId: string, taskData: Partial<CreateTaskData>) => Task | null;
  deleteUser: (userId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleAdmin: (userId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      users: [{
        id: 'admin',
        name: 'Admin',
        email: 'admin@jobconnect.com',
        password: 'gauthier',
        isAdmin: true
      }],
      tasks: [],
      getTasks: () => get().tasks,
      login: (email: string, password: string) => {
        const users = get().users;
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ isAuthenticated: true, user: userWithoutPassword });
          return true;
        }
        return false;
      },
      register: (name: string, email: string, password: string) => {
        const users = get().users;
        if (users.some(u => u.email === email)) {
          return false;
        }
        
        const newUser = {
          id: crypto.randomUUID(),
          name,
          email,
          password,
          isAdmin: false
        };
        
        const { password: _, ...userWithoutPassword } = newUser;
        
        set(state => ({
          users: [...state.users, newUser],
          isAuthenticated: true,
          user: userWithoutPassword,
        }));
        
        return true;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      createTask: (taskData: CreateTaskData) => {
        const user = get().user;
        if (!user) return null;

        const newTask: Task = {
          id: crypto.randomUUID(),
          ...taskData,
          authorId: user.id,
          authorName: user.name,
          createdAt: new Date().toISOString(),
          status: 'open',
        };

        set(state => ({
          tasks: [...state.tasks, newTask]
        }));

        return newTask;
      },
      updateTask: (taskId: string, taskData: Partial<CreateTaskData>) => {
        const user = get().user;
        if (!user) return null;

        let updatedTask: Task | null = null;

        set(state => ({
          tasks: state.tasks.map(task => {
            if (task.id === taskId && task.authorId === user.id) {
              updatedTask = { ...task, ...taskData };
              return updatedTask;
            }
            return task;
          })
        }));

        return updatedTask;
      },
      deleteUser: (userId: string) => {
        set(state => ({
          users: state.users.filter(user => user.id !== userId),
          tasks: state.tasks.filter(task => task.authorId !== userId)
        }));
      },
      deleteTask: (taskId: string) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== taskId)
        }));
      },
      toggleAdmin: (userId: string) => {
        set(state => ({
          users: state.users.map(user => 
            user.id === userId 
              ? { ...user, isAdmin: !user.isAdmin }
              : user
          )
        }));
      }
    }),
    {
      name: 'jobconnect-storage'
    }
  )
);