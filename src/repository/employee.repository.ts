import dataSource from "../db/data-source.db";
import { DataSource } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  constructor(private datasource: DataSource) {}

  async find() {
    const employeeRepository = this.datasource.getRepository(Employee);
    return employeeRepository.find();
  }

  async findOneBy(filter: Partial<Employee>) {
    const employeeRepository = this.datasource.getRepository(Employee);
    return employeeRepository.findOne({
      where: filter,
      relations: ["address"],
    });
  }

  async create(employee: Employee) {
    const employeeRepository = this.datasource.getRepository(Employee);
    return employeeRepository.save(employee);
  }

  async delete(filter: Partial<Employee>) {
    const employeeRepository = this.datasource.getRepository(Employee);
    return employeeRepository.softDelete(filter);
  }

  async softRemove(filter: Partial<Employee>) {
    const employeeRepository = this.datasource.getRepository(Employee);
    return employeeRepository.softRemove(filter);
  }

}

export default EmployeeRepository;
