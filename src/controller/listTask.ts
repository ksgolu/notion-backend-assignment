import { Express, Request, Response } from "express";
import TaskModel, { Task, Query } from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit);
  let assignedTo: string | undefined = undefined;
  let categoryName: string | undefined = undefined;

  if (req.query.assignedTo || req.query.categoryName) {
    assignedTo = req.query.assignedTo?.toString();
    categoryName = req.query.categoryName?.toString();
  }

  limit = limit ? limit : 30;
  const skip = page == 1 ? 0 : page * limit - limit;

  const query: Query = {
    skip,
    limit,
    categoryName,
    assignedTo,
  };
  try {
    // const user = req.user
    const totalTask: number = TaskModel.count();
    const tasks: Task[] = TaskModel.list(query);
    const data = {
      tasks,
      count: {
        total: totalTask,
        count: tasks.length,
        page: page,
        skip: skip,
        limit: limit,
      },
    };
    Services._response(res, 200, data);
  } catch (e: any) {
    let code: number = 500;
    Services._handleError(req, res, e, code, e.message);
  }
};
