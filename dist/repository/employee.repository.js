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
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
class EmployeeRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.datasource.getRepository(employee_entity_1.default);
            return employeeRepository.find();
        });
    }
    findOneBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.datasource.getRepository(employee_entity_1.default);
            return employeeRepository.findOne({
                where: filter,
                relations: ["address"],
            });
        });
    }
    create(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.datasource.getRepository(employee_entity_1.default);
            return employeeRepository.save(employee);
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = this.datasource.getRepository(employee_entity_1.default);
            return employeeRepository.softDelete(filter);
        });
    }
}
exports.default = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map