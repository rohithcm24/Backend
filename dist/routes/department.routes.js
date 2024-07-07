"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const department_contoller_1 = __importDefault(require("../controller/department.contoller"));
const data_source_db_1 = __importDefault(require("../db/data-source.db"));
const department_repository_1 = __importDefault(require("../repository/department.repository"));
const Department_service_1 = __importDefault(require("../service/Department.service"));
const departmentController = new department_contoller_1.default(new Department_service_1.default(new department_repository_1.default(data_source_db_1.default)));
const departmentRouter = departmentController.router;
exports.default = departmentRouter;
//# sourceMappingURL=department.routes.js.map