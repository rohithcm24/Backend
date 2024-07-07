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
const department_dto_1 = require("../dto/department.dto");
class DepartmentController {
    constructor(Departmentservice) {
        this.Departmentservice = Departmentservice;
        this.getAllDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const department = yield this.Departmentservice.getAllDepartment();
            res.status(200).send(department);
        });
        this.getDepartmentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield this.Departmentservice.getDepartmentById(Number(req.params.id));
                if (!department) {
                    const error = new http_exceptions_1.default(404, "new error");
                    throw error;
                }
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const department = yield this.Departmentservice.createDepartment(departmentDto.name);
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const department = yield this.Departmentservice.DeleteById(Number(req.params.id));
            res.status(200).send(department);
        });
        //update employee
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const departmentDto = (0, class_transformer_1.plainToInstance)(department_dto_1.CreateDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(departmentDto);
                if (errors.length) {
                    console.log(JSON.stringify(errors));
                    throw new http_exceptions_1.default(400, JSON.stringify(errors));
                }
                const department = yield this.Departmentservice.updateDepartment(departmentDto.name);
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
        this.router = express_1.default.Router();
        this.router.get("/", this.getAllDepartment);
        this.router.get("/:id", this.getDepartmentById);
        this.router.post("/", this.createDepartment);
        this.router.delete("/:id", this.deleteDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.contoller.js.map