"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../database/Task"));
const services_1 = __importDefault(require("../services"));
exports.default = (req, res) => {
    const taskId = req.params.taskId;
    try {
        const task = Task_1.default.getById(taskId);
        services_1.default._response(res, 200, task);
    }
    catch (e) {
        services_1.default._handleError(req, res, e, 500, e.message);
    }
};
