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
const address_entity_1 = __importDefault(require("../entity/address.entity"));
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
class EmployeeService {
    constructor(employeerepository) {
        this.employeerepository = employeerepository;
    }
    getAllEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeerepository.find();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeerepository.findOneBy({ id });
        });
    }
    createEmployee(name, email, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            const newAddres = new address_entity_1.default();
            newAddres.line1 = address.line1;
            newAddres.pincode = address.pincode;
            newEmployee.address = newAddres;
            return this.employeerepository.create(newEmployee);
        });
    }
    DeleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeerepository.delete({ id });
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map