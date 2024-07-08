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
class DepartmentRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepository = this.datasource.getRepository(department_entity_1.default);
            return departmentRepository.find({ relations: { employees: true } });
        });
    }
    findOneBy(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepository = this.datasource.getRepository(department_entity_1.default);
            return departmentRepository.findOne({
                where: filter,
                relations: ["employee"],
            });
        });
    }
    create(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepository = this.datasource.getRepository(department_entity_1.default);
            return departmentRepository.save(department);
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepository = this.datasource.getRepository(department_entity_1.default);
            return departmentRepository.softDelete(filter);
        });
    }
    update(department) {
        return __awaiter(this, void 0, void 0, function* () {
            const departmentRepository = this.datasource.getRepository(department_entity_1.default);
            return departmentRepository.save(department);
        });
    }
}
exports.default = DepartmentRepository;
//# sourceMappingURL=department.repository.js.map