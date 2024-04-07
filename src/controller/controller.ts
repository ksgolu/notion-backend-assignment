import { Express, Request, Response } from "express";
import Task from "../database/schema/Task";
import Services from "../services";

export = {
  createTask: (req: Request, res: Response) => {
    const requestBody = req.body;
    let code: number = 500;
    try {
      const REQUIRED_FIELDS = ["title", "description"];
      let isValidData: boolean = Services._validateRequestBody(
        REQUIRED_FIELDS,
        requestBody,
      );

      if (!isValidData) throw new Error("invalid request body");

      const task = new Task(requestBody).save();

      console.log(task);
    } catch (e: any) {
      Services.__handleError(req, res, e, code, e.message);
    }
  },
};
