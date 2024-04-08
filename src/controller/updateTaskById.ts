import { Express, Request, Response } from "express";
import type { Task } from "../../type";
import TaskModel from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  let code = 500;
  const taskId: string = req.params.taskId;
  const body: Task = req.body;
  const allowedUpdateFiled = [
    "title",
    "description",
    "dueDate",
    "assignedTo",
    "category",
    "status",
    "isActive",
  ];

  try {
    // validating update field
    if (!Services._validateUpdateFiled(allowedUpdateFiled, body))
      throw new Error("invalid value");

    const task: Task = TaskModel.updateById(taskId, body);

    if (!task) {
      code = 200;
      throw new Error("no task found");
    }
    Services._response(res, 200, task);
  } catch (e: any) {
    Services._handleError(req, res, e, code, e.message);
  }
};
