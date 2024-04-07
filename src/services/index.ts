import { Request, Response } from "express";

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
  _validateRequestBody: function (
    requiredFieldList: Array<string>,
    requestedBody: object,
  ) {
    const requestedKeys = Object.keys(requestedBody);
    let bool: boolean = false;
    for (const key of requiredFieldList) {
      bool = requestedKeys.includes(key);
      if (!bool) break;
    }

    return bool;
  },

  __handleError(
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
};
