import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/middleware";
import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
// authentication
router.post("/login", (req: Request, res: Response) => {
  let user = { id: 1, username: "user" };
  if (req.body) user = req.body;

  console.log(process.env.JWT_SECRET);
  const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  res.json({ accessToken });
});

router.get("/me", authenticateToken, (req: Request, res: Response) => {
  res.json(req.user);
});

export default router;
