import jwt from "jsonwebtoken";
import authenticateToken from "./middleware/middleware";
import express, { Express, Request, Response, Router } from "express";
import controller from "./controller";

const router: Router = express.Router();

router.post("/", controller.createTask);
router.get("/", controller.listTask);
router.get("/:taskId", controller.getTaskById);
router.put("/:taskId", controller.updateTaskById);
router.delete("/:taskId", controller.deleteTaskById);

router.post("/login", (req: Request, res: Response) => {
  // Mock user for demonstration
  const user = { id: 1, username: "user" };

  const accessToken = jwt.sign(user, process.env.JWT_SECRET as string);
  res.json({ accessToken });
});
router.get("/protected", authenticateToken, (req: Request, res: Response) => {
  res.json(req.user);
});

export default router;
