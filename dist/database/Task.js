"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskModel {
    constructor(task) {
        this.task = task;
    }
    static create(task) {
        this.taskList.push(task);
        return task;
    }
    static list(query = {
        skip: 0,
        limit: 30,
        categoryName: undefined,
        assignedTo: undefined,
    }) {
        const task = performQuery(query, this.taskList);
        return task;
    }
    static getById(id) {
        const task = this.taskList.find((task) => task.id == id);
        return task ? task : {};
    }
    static updateById(id, updateSet) {
        let bool = false;
        let task = this.taskList.find((task) => task.id === id);
        if (!task)
            throw new Error("no task found");
        task = Object.assign(Object.assign({}, task), updateSet);
        return task;
    }
    static deleteById(id) {
        let task;
        const index = this.taskList.findIndex((task) => task.id == id);
        if (index < 0)
            throw new Error("no task found");
        task = this.taskList.splice(index, 1);
        return task;
    }
    static count() {
        return this.taskList.length;
    }
    save() {
        const task = TaskModel.create(this.task);
        return task;
    }
}
TaskModel.taskList = [];
exports.default = TaskModel;
function performQuery(query, task) {
    console.log(query);
    const skip = query.skip || 0;
    let limit = query.limit;
    let tasks = task;
    const taskLength = task.length;
    if (skip >= taskLength)
        throw new Error("invalid page value");
    if (limit >= taskLength)
        limit = taskLength;
    if (skip >= limit) {
        limit = skip + limit;
        if (limit >= taskLength) {
            limit = taskLength;
        }
    }
    if (query.assignedTo || query.categoryName) {
        let filterFunc;
        if (query.assignedTo && query.categoryName)
            filterFunc = (task) => task.assignedTo == query.assignedTo &&
                task.category == query.categoryName;
        else if (query.assignedTo)
            filterFunc = (task) => task.assignedTo == query.assignedTo;
        else if (query.categoryName)
            filterFunc = (task) => task.category == query.categoryName;
        tasks = tasks.filter(filterFunc);
    }
    const taskData = tasks.slice(skip, limit);
    return taskData;
}
