interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  createdBy: string;
  assignedTo: string;
  category: string;
  status: boolean;
  isActive: boolean;
}

class Task {
  private static taskData: Task[] = [];
  task: Task;
  constructor(task: Task) {
    this.task = task;
  }

  public static create(task: Task): Task {
    console.log(task);
    this.taskData.push(task);
    return task;
  }
  public static list(query = false) {}
  public static getById(id: number) {}
  public static updateById(id: number, updateSet: object) {}
  public static deleteById(id: number) {}

  public save() {
    const task: Task = Task.create(this.task);
    return task;
  }
}

export default Task;
