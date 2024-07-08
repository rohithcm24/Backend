"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const employee_dto_1 = require("../dto/employee.dto");
const enum_1 = require("../utils/enum");
const authorization_1 = __importDefault(require("../middleware/authorization"));
class EmployeeController {
    constructor(employeeservice) {
        this.employeeservice = employeeservice;
        this.getAllEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("here");
            const employees = yield this.employeeservice.getAllEmployee();
            const employeesWithoutSensitiveInfo = employees.map((_a) => {
                var { password } = _a, rest = __rest(_a, ["password"]);
                return rest;
            });
            res.status(200).send(employeesWithoutSensitiveInfo);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield this.employeeservice.getEmployeeById(Number(req.params.id));
                if (!employees) {
                    const error = new http_exceptions_1.default(404, "new error");
                    throw error;
                }
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, age, address, role, password } = req.body;
            try {
                const role = req.role;
                if (role !== enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create employee");
                }
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employees = yield this.employeeservice.createEmployee(employeeDto.name, employeeDto.email, employeeDto.age, employeeDto.address, employeeDto.role, employeeDto.password, employeeDto.departmentId);
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = req.role;
                if (role !== enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create employee");
                }
                const employees = yield this.employeeservice.DeleteById(Number(req.params.id));
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        //update employee
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, age, address } = req.body;
            try {
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                const role = req.role;
                if (role !== enum_1.Role.HR) {
                    throw new http_exceptions_1.default(403, "You are not authorized to create employee");
                }
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employees = yield this.employeeservice.updateEmployee(employeeDto.name, employeeDto.email, employeeDto.age, employeeDto.address, employeeDto.password, employeeDto.departmentId);
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        this.Employeelogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield this.employeeservice.Employeelogin(email, password);
                res.status(200).send(token);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllEmployee);
        this.router.get("/:id", this.getEmployeeById);
        //this.router.post("/", this.createEmployee);
        this.router.post("/login", this.Employeelogin);
        this.router.post("/", authorization_1.default, this.createEmployee);
        this.router.put("/:id", authorization_1.default, this.updateEmployee);
        this.router.delete("/:id", authorization_1.default, this.deleteEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map