import { Express, Request, Response } from "express";
import type { Task } from "../database/Task";
import TaskModel from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const body: Task = req.body;
  try {
    const allowedUpdateFiled = [
      "title",
      "description",
      "dueDate",
      "assignedTo",
      "category",
      "status",
      "isActive",
    ];

    if (!Services._validateUpdateFiled(allowedUpdateFiled, body))
      throw new Error("invalid value");

    const task: Task = TaskModel.updateById(taskId, body);

    Services._response(res, 200, task);
  } catch (e: any) {
    Services._handleError(req, res, e, 500, e.message);
  }
};
