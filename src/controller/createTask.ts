import { Express, Request, Response } from "express";
import type { Task } from "../database/Task";
import TaskModel from "../database/Task";
import Services from "../services";
import { uid } from "rand-token";

export default (req: Request, res: Response) => {
  const REQUIRED_FIELDS = ["title", "description"];
  const requestBody = req.body;
  let code: number = 500;
  try {
    if (!Services._validateRequiredField(REQUIRED_FIELDS, requestBody))
      throw new Error("invalid request body");

    const data = addAdditionField(requestBody);

    const task = new TaskModel(data).save();

    Services._response(res, 201, task);
  } catch (e: any) {
    Services._handleError(req, res, e, code, e.message);
  }
};

function addAdditionField(obj: Task): Task {
  const additionField = {
    id: uid(6),
    userId: null,
    dueDate: null,
    createdAt: new Date(),
    createdBy: null,
    assignedTo: null,
    category: null,
    status: "pending",
    isActive: true,
  };

  obj = { ...additionField, ...obj };
  return obj;
}
