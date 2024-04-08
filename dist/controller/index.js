"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTask_1 = __importDefault(require("./createTask"));
const listTask_1 = __importDefault(require("./listTask"));
const getTaskById_1 = __importDefault(require("./getTaskById"));
const updateTaskById_1 = __importDefault(require("./updateTaskById"));
const deleteTaskById_1 = __importDefault(require("./deleteTaskById"));
exports.default = {
    createTask: createTask_1.default,
    listTask: listTask_1.default,
    getTaskById: getTaskById_1.default,
    updateTaskById: updateTaskById_1.default,
    deleteTaskById: deleteTaskById_1.default,
};
