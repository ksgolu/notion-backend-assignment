"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.post("/", controller_1.default.createTask);
router.get("/", controller_1.default.listTask);
router.get("/:taskId", controller_1.default.getTaskById);
router.put("/:taskId", controller_1.default.updateTaskById);
router.delete("/:taskId", controller_1.default.deleteTaskById);
router.post("/login", (req, res) => {
    // Mock user for demonstration
    const user = { id: 1, username: "user" };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
    res.json({ accessToken });
});
router.get("/protected", middleware_1.default, (req, res) => {
    res.json(req.user);
});
exports.default = router;
