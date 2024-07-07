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
const http_exceptions_1 = __importDefault(require("../exceptions/http.exceptions"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
class EmployeeService {
    getAllDepartment() {
        throw new Error("Method not implemented.");
    }
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
    createEmployee(name, email, age, address, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            newEmployee.name = name;
            newEmployee.email = email;
            newEmployee.age = age;
            newEmployee.role = role;
            newEmployee.password = password ? yield bcrypt_1.default.hash(password, 10) : "";
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
    //delete  assignment
    //implemented it , did not check whether it is working
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.getEmployeeById(id);
            if (employee) {
                return this.employeerepository.softRemove(employee);
            }
            throw new Error("Employee not found");
        });
    }
    //update employee
    updateEmployee(name, email, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEmployee = new employee_entity_1.default();
            if (name) {
                newEmployee.name = name;
            }
            if (email) {
                newEmployee.email = email;
            }
            if (age) {
                newEmployee.age = age;
            }
            ///add case for empty address nested object also
            const newAddres = new address_entity_1.default();
            newAddres.line1 = address.line1;
            newAddres.pincode = address.pincode;
            newEmployee.address = newAddres;
            return this.employeerepository.update(newEmployee);
        });
    }
    Employeelogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeerepository.findOneBy({ email });
            if (!employee) {
                throw new http_exceptions_1.default(404, "USER NOT FOUND WITH THIS EMAIL");
            }
            const result = yield bcrypt_1.default.compare(password, employee.password);
            if (!result) {
                throw new http_exceptions_1.default(404, "Incorrect passowrd");
            }
            const payload = {
                name: employee.name,
                email: employee.email,
                role: employee.role,
            };
            const token = jsonwebtoken_1.default.sign(payload, constants_1.JWT_SECRET, {
                expiresIn: constants_1.JWT_validity,
            });
            return { token };
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map