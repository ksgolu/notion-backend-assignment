import { Request, Response } from "express";
import type { Task } from "../database/Task";

interface Respond {
  code: number;
  error: Error | null;
  message: string;
  data: object | Array<object>;
}
const response: Respond = {
  code: 200,
  error: null,
  message: "",
  data: {},
};
export default {
  _validateRequiredField: function (
    requiredFieldList: Array<string>,
    requestedBody: Task,
  ) {
    const requestedKeys = Object.keys(requestedBody);
    let bool: boolean = true;
    for (const key of requiredFieldList) {
      if (
        !requestedKeys.includes(key) ||
        !this._checkDesiredValue(key, requestedBody)
      ) {
        bool = false;
        break;
      }
    }

    return bool;
  },

  _validateUpdateFiled: function (
    requiredFieldList: Array<string>,
    requestedBody: Task,
  ) {
    const requestedKeys = Object.keys(requestedBody);
    let bool: boolean = true;
    for (const key of requestedKeys) {
      if (
        !requiredFieldList.includes(key) ||
        !this._checkDesiredValue(key, requestedBody)
      ) {
        bool = false;
        break;
      }
    }

    return bool;
  },

  _checkDesiredValue(key: string, obj: Task): boolean {
    switch (key) {
      case "title": {
        const title: any = obj[key];
        if (!title || typeof title !== "string" || title.length > 50)
          return false;
        break;
      }
      case "description": {
        const description: any = obj[key];
        if (
          !description ||
          typeof description !== "string" ||
          description.length > 500
        )
          return false;
        break;
      }
      case "assignedTo": {
        const asssignedTo: any = obj[key];
        console.log(asssignedTo);
        if (
          !asssignedTo ||
          typeof asssignedTo != "string" ||
          asssignedTo.length > 100
        )
          return false;
        break;
      }
      case "category": {
        const category: any = obj[key];
        if (!category || typeof category !== "string" || category.length > 100)
          return false;
        break;
      }
      case "status": {
        const status: any = obj[key];
        if (
          !status ||
          typeof obj[key] !== "string" ||
          status !== "pending" ||
          status !== "completed" ||
          status.length > 100
        )
          return false;
        break;
      }
      case "dueDate": {
        const date: any = obj[key];
        const date_time: Date = new Date(date);
        if (!obj[key] || typeof date_time !== "object") return false;
        break;
      }

      case "isActive": {
        if (!obj[key] || typeof obj[key] !== "boolean") return false;
        break;
      }
    }

    return true;
  },

  _handleError(
    req: Request,
    res: Response,
    error: Error,
    code: number,
    message: string,
  ) {
    response.code = code;
    response.error = req.headers.device ? null : error ? error : null;
    response.message = message ? message : "Something bad happened";
    response.data = {};
    return res.status(code).send(response);
  },

  /*handle response*/
  _response: function (
    res: Response,
    code: number,
    data: object,
    message: string = "",
  ) {
    response.code = code ? code : 200;
    response.error = null;
    response.message = message ? message : "Success";
    response.data = data ? data : {};
    return res.status(code).send(response);
  },
};
