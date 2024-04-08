import { Express, Request, Response } from "express";
import type { Task } from "../database/Task";
import TaskModel from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  try {
    const task: Task = TaskModel.getById(taskId);

    Services._response(res, 200, task);
  } catch (e: any) {
    Services._handleError(req, res, e, 500, e.message);
  }
};
