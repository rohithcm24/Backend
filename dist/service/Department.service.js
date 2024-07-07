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
const department_entity_1 = __importDefault(require("../entity/department.entity"));
class DepartmentService {
    constructor(departmentrepository) {
        this.departmentrepository = departmentrepository;
    }
    getAllDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentrepository.find();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentrepository.findOneBy({ id });
        });
    }
    createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            return this.departmentrepository.create(newDepartment);
        });
    }
    DeleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentrepository.delete({ id });
        });
    }
    updateDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_entity_1.default();
            newDepartment.name = name;
            return this.departmentrepository.update(newDepartment);
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=Department.service.js.map