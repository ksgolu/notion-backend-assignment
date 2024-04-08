import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest {
  user: object;
}

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token.split(" ")[1],
    process.env.JWT_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    },
  );
};

export default authenticateToken;
