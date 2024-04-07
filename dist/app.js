"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("./middleware/middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/login", (req, res) => {
    // Mock user for demonstration
    const user = { id: 1, username: "user" };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
    res.json({ accessToken });
});
app.get("/protected", middleware_1.default, (req, res) => {
    // res.json(req.user);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
