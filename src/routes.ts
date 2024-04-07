import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/middleware";
import express, { Express, Request, Response } from "express";
import controller from "./controller/controller";

export default (app: Express) => {
  app.post("/", (req: Request, res: Response) => {
    console.log("ok");
    controller.createTask(req, res);
  }),
    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    }),
    app.post("/login", (req: Request, res: Response) => {
      // Mock user for demonstration
      const user = { id: 1, username: "user" };

      const accessToken = jwt.sign(user, process.env.JWT_SECRET as string);
      res.json({ accessToken });
    }),
    app.get("/protected", authenticateToken, (req: Request, res: Response) => {
      res.json(req.user);
    });
};
