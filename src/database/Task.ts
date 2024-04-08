import { ArrowFunction } from "typescript";
import Services from "../services";

interface Task {
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

type Query = {
  skip: number;
  limit: number;
  assignedTo: string | undefined;
  categoryName: string | undefined;
};

interface TaskModel {
  taskList: Task[];
  task: Task;

  create(task: Task): Task;
  list(query: Query): Task[];
  getById(id: number): Task;
  updateById(id: string, updateSet: object): Task;
  deleteById(id: number): Task;
  save(): Task;
}

class TaskModel implements TaskModel {
  private static taskList: Task[] = [];
  task: Task;
  constructor(task: Task) {
    this.task = task;
  }

  public static create(task: Task): Task {
    this.taskList.push(task);
    return task;
  }

  public static list(
    query: Query = {
      skip: 0,
      limit: 30,
      categoryName: undefined,
      assignedTo: undefined,
    },
  ) {
    const task = performQuery(query, this.taskList);
    return task;
  }

  public static getById(id: string): Task {
    const task: any = this.taskList.find((task: Task) => task.id == id);
    return task ? task : {};
  }

  public static updateById(id: string, updateSet: Task): Task {
    let bool: boolean = false;
    let task: any = this.taskList.find((task: Task) => task.id === id);
    if (!task) throw new Error("no task found");

    task = { ...task, ...updateSet };
    return task;
  }

  public static deleteById(id: string) {
    let task: Task[];
    const index = this.taskList.findIndex((task: Task) => task.id == id);
    if (index < 0) throw new Error("no task found");
    task = this.taskList.splice(index, 1);
    return task;
  }
  public static count(): number {
    return this.taskList.length;
  }
  public save() {
    const task: Task = TaskModel.create(this.task);
    return task;
  }
}

export default TaskModel;

export { Task, Query };

function performQuery(query: Query, task: Task[]): Task[] {
  console.log(query);
  const skip = query.skip || 0;
  let limit = query.limit;
  let tasks: Task[] = task;
  const taskLength: number = task.length;

  if (skip >= taskLength) throw new Error("invalid page value");

  if (limit >= taskLength) limit = taskLength;

  if (skip >= limit) {
    limit = skip + limit;
    if (limit >= taskLength) {
      limit = taskLength;
    }
  }

  if (query.assignedTo || query.categoryName) {
    let filterFunc: any;

    if (query.assignedTo && query.categoryName)
      filterFunc = (task: Task) =>
        task.assignedTo == query.assignedTo &&
        task.category == query.categoryName;
    else if (query.assignedTo)
      filterFunc = (task: Task) => task.assignedTo == query.assignedTo;
    else if (query.categoryName)
      filterFunc = (task: Task) => task.category == query.categoryName;
    tasks = tasks.filter(filterFunc);
  }

  const taskData = tasks.slice(skip, limit);
  return taskData;
}
