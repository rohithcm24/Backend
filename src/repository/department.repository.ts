import dataSource from "../db/data-source.db";
import { DataSource } from "typeorm";
import Employee from "../entity/employee.entity";
import Department from "../entity/department.entity";

class DepartmentRepository {
  constructor(private datasource: DataSource) {}

  async find() {
    const departmentRepository = this.datasource.getRepository(Department);
    return departmentRepository.find({ relations: { employees: true } })
  }

  async findOneBy(filter: Partial<Department>) {
    const departmentRepository = this.datasource.getRepository(Department);
    return departmentRepository.findOne({
      where: filter,
      relations: ["employee"],
    });
  }

  async create(department: Department) {
    const departmentRepository = this.datasource.getRepository(Department);
    return departmentRepository.save(department);
  }

  async delete(filter: Partial<Department>) {
    const departmentRepository = this.datasource.getRepository(Department);
    return departmentRepository.softDelete(filter);
  }

  async update(department: Department) {
    const departmentRepository = this.datasource.getRepository(Department);
    return departmentRepository.save(department);
  }
}

export default DepartmentRepository;
