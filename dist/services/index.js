"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = {
    code: 200,
    error: null,
    message: "",
    data: {},
};
exports.default = {
    _validateRequiredField: function (requiredFieldList, requestedBody) {
        const requestedKeys = Object.keys(requestedBody);
        let bool = true;
        for (const key of requiredFieldList) {
            if (!requestedKeys.includes(key) ||
                !this._checkDesiredValue(key, requestedBody)) {
                bool = false;
                break;
            }
        }
        return bool;
    },
    _validateUpdateFiled: function (requiredFieldList, requestedBody) {
        const requestedKeys = Object.keys(requestedBody);
        let bool = true;
        for (const key of requestedKeys) {
            if (!requiredFieldList.includes(key) ||
                !this._checkDesiredValue(key, requestedBody)) {
                bool = false;
                break;
            }
        }
        return bool;
    },
    _checkDesiredValue(key, obj) {
        switch (key) {
            case "title": {
                const title = obj[key];
                if (!title || typeof title !== "string" || title.length > 50)
                    return false;
                break;
            }
            case "description": {
                const description = obj[key];
                if (!description ||
                    typeof description !== "string" ||
                    description.length > 500)
                    return false;
                break;
            }
            case "assignedTo": {
                const asssignedTo = obj[key];
                console.log(asssignedTo);
                if (!asssignedTo ||
                    typeof asssignedTo != "string" ||
                    asssignedTo.length > 100)
                    return false;
                break;
            }
            case "category": {
                const category = obj[key];
                if (!category || typeof category !== "string" || category.length > 100)
                    return false;
                break;
            }
            case "status": {
                const status = obj[key];
                if (!status ||
                    typeof obj[key] !== "string" ||
                    status !== "pending" ||
                    status !== "completed" ||
                    status.length > 100)
                    return false;
                break;
            }
            case "dueDate": {
                const date = obj[key];
                const date_time = new Date(date);
                if (!obj[key] || typeof date_time !== "object")
                    return false;
                break;
            }
            case "isActive": {
                if (!obj[key] || typeof obj[key] !== "boolean")
                    return false;
                break;
            }
        }
        return true;
    },
    _handleError(req, res, error, code, message) {
        response.code = code;
        response.error = req.headers.device ? null : error ? error : null;
        response.message = message ? message : "Something bad happened";
        response.data = {};
        return res.status(code).send(response);
    },
    /*handle response*/
    _response: function (res, code, data, message = "") {
        response.code = code ? code : 200;
        response.error = null;
        response.message = message ? message : "Success";
        response.data = data ? data : {};
        return res.status(code).send(response);
    },
};
