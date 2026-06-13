export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
