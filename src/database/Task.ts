import Services from "../services";

import type { Query, Task } from "../../type";

class TaskModel {
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
    return task;
  }

  public static updateById(id: string, updateSet: Task): Task {
    let bool: boolean = false;
    let task: any = this.taskList.find((task: Task) => task.id === id);
    if (!task) return task;

    task = { ...task, ...updateSet };
    return task;
  }

  public static deleteById(id: string): Task[] | null {
    let task: Task[];
    const index = this.taskList.findIndex((task: Task) => task.id == id);
    if (index == -1) return null;
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
  const skip = query.skip;
  let limit = query.limit;
  let tasks: Task[] = task;
  const taskLength: number = task.length;

  if (taskLength && skip >= taskLength) throw new Error("invalid page value");

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
