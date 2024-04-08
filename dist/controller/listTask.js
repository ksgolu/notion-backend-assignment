"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../database/Task"));
const services_1 = __importDefault(require("../services"));
exports.default = (req, res) => {
    var _a, _b;
    const page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit);
    let assignedTo = undefined;
    let categoryName = undefined;
    if (req.query.assignedTo || req.query.categoryName) {
        assignedTo = (_a = req.query.assignedTo) === null || _a === void 0 ? void 0 : _a.toString();
        categoryName = (_b = req.query.categoryName) === null || _b === void 0 ? void 0 : _b.toString();
    }
    limit = limit ? limit : 30;
    const skip = page == 1 ? 0 : page * limit - limit;
    const query = {
        skip,
        limit,
        categoryName,
        assignedTo,
    };
    try {
        // const user = req.user
        const totalTask = Task_1.default.count();
        const tasks = Task_1.default.list(query);
        const data = {
            tasks,
            count: {
                total: totalTask,
                count: tasks.length,
                page: page,
                skip: skip,
                limit: limit,
            },
        };
        services_1.default._response(res, 200, data);
    }
    catch (e) {
        let code = 500;
        services_1.default._handleError(req, res, e, code, e.message);
    }
};
