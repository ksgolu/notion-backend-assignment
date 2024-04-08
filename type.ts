export interface Task {
  id: string;
  userId: number | null;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  createdBy: string | null;
  assignedTo: string | null;
  category: string | null;
  status: string;
  isActive: boolean;
}

export type Query = {
  skip: number;
  limit: number;
  assignedTo: string | undefined;
  categoryName: string | undefined;
};

export interface TaskModels {
  taskList: Task[];
  task: Task;

  create(task: Task): Task;
  list(query: Query): Task[];
  getById(id: number): Task;
  updateById(id: string, updateSet: object): Task;
  deleteById(id: number): Task;
  save(): Task;
}
