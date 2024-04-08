import { Express, Request, Response } from "express";
import type { Task } from "../../type";
import TaskModel from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  let code = 500;
  const taskId: string = req.params.taskId;

  try {
    // deleting task from db
    const task: Task[] | null = TaskModel.deleteById(taskId);

    // handling, not found
    if (!task) {
      code = 200;
      throw new Error("no task found");
    }

    Services._response(res, 200, task);
  } catch (e: any) {
    Services._handleError(req, res, e, code, e.message);
  }
};
