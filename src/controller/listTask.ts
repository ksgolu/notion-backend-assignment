import { Express, Request, Response } from "express";
import type { Task, Query } from "../../type";
import TaskModel from "../database/Task";
import Services from "../services";

export default (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  let limit: number = Number(req.query.limit);
  let assignedTo: string | undefined = req.query.assignedTo?.toString();
  let categoryName: string | undefined = req.query.categoryName?.toString();

  // handling page and limit
  limit = limit ? limit : 30;
  const skip = page == 1 ? 0 : page * limit - limit;

  const query: Query = {
    skip,
    limit,
    categoryName,
    assignedTo,
  };
  try {
    // db operations
    const totalTask: number = TaskModel.count();
    const tasks: Task[] = TaskModel.list(query);

    // preparing response data
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
