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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const employee_dto_1 = require("../dto/employee.dto");
class EmployeeController {
    constructor(employeeservice) {
        this.employeeservice = employeeservice;
        this.getAllEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("here");
            const employees = yield this.employeeservice.getAllEmployee();
            res.status(200).send(employees);
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
            const { email, name, age, address } = req.body;
            try {
                const employeeDto = (0, class_transformer_1.plainToInstance)(employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(employeeDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const employees = yield this.employeeservice.createEmployee(employeeDto.email, employeeDto.name, employeeDto.age, employeeDto.age);
                res.status(200).send(employees);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeservice.DeleteById(Number(req.params.id));
            res.status(200).send(employees);
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllEmployee);
        this.router.get("/:id", this.getEmployeeById);
        this.router.post("/", this.createEmployee);
        this.router.delete("/", this.deleteEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map