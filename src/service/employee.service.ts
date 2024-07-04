import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
  constructor(private employeerepository: EmployeeRepository) {}

  async getAllEmployee() {
    return this.employeerepository.find();
  }

  async getEmployeeById(id: number) {
    return this.employeerepository.findOneBy({ id });
  }

  async createEmployee(name: string, email: string, age: number, address: any) {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;

    const newAddres = new Address();
    newAddres.line1 = address.line1;
    newAddres.pincode = address.pincode;
    newEmployee.address = newAddres;
    return this.employeerepository.create(newEmployee);
  }

  async DeleteById(id: number) {
    return this.employeerepository.delete({ id });
  }

  //delete  assignment
}

export default EmployeeService;
