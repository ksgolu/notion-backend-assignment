"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../database/Task"));
const services_1 = __importDefault(require("../services"));
const rand_token_1 = require("rand-token");
exports.default = (req, res) => {
    const REQUIRED_FIELDS = ["title", "description"];
    const requestBody = req.body;
    let code = 500;
    try {
        if (!services_1.default._validateRequiredField(REQUIRED_FIELDS, requestBody))
            throw new Error("invalid request body");
        const data = addAdditionField(requestBody);
        const task = new Task_1.default(data).save();
        services_1.default._response(res, 201, task);
    }
    catch (e) {
        services_1.default._handleError(req, res, e, code, e.message);
    }
};
function addAdditionField(obj) {
    const additionField = {
        id: (0, rand_token_1.uid)(6),
        userId: null,
        dueDate: null,
        createdAt: new Date(),
        createdBy: null,
        assignedTo: null,
        category: null,
        status: "pending",
        isActive: true,
    };
    obj = Object.assign(Object.assign({}, additionField), obj);
    return obj;
}
