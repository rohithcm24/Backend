import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_validity } from "../utils/constants";
import { jwtPayload } from "../utils/jwtpayload";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";

class DepartmentService {
  constructor(private departmentrepository: DepartmentRepository) {}

  async getAllDepartment() {
    return this.departmentrepository.find();
  }

  async getDepartmentById(id: number) {
    return this.departmentrepository.findOneBy({ id });
  }

  async createDepartment(name: string) {
    const newDepartment = new Department();
    newDepartment.name = name;
    return this.departmentrepository.create(newDepartment);
  }

  async DeleteById(id: number) {
    return this.departmentrepository.delete({ id });
  }

  async updateDepartment(name: string) {
    const newDepartment = new Department();
    newDepartment.name = name;
    return this.departmentrepository.update(newDepartment);
  }
}

export default DepartmentService;
