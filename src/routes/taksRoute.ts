import express, { Router } from "express";
import controller from "../controller";

const router: Router = express.Router();

router.post("/", controller.createTask);
router.get("/", controller.listTask);
router.get("/:taskId", controller.getTaskById);
router.put("/:taskId", controller.updateTaskById);
router.delete("/:taskId", controller.deleteTaskById);

export default router;
