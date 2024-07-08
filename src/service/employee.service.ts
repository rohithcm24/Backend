import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_validity } from "../utils/constants";
import { jwtPayload } from "../utils/jwtpayload";

class EmployeeService {
  constructor(private employeerepository: EmployeeRepository) {}

  async getAllEmployee() {
    return this.employeerepository.find();
  }

  async getEmployeeById(id: number) {
    return this.employeerepository.findOneBy({ id });
  }

  async createEmployee(
    name: string,
    email: string,
    age: number,
    address: any,
    role: Role,
    password: string,
    departmentId: number
  ) {
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.role = role;
    newEmployee.departmentId = departmentId;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";

    const newAddres = new Address();
    newAddres.line1 = address.line1;
    newAddres.pincode = address.pincode;
    newEmployee.address = newAddres;
    return this.employeerepository.create(newEmployee);
  }

  async DeleteById(id: number) {
    return this.employeerepository.delete({ id });
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployeeById(id);
    if (employee) {
      return this.employeerepository.softRemove(employee);
    }
    throw new Error("Employee not found");
  }

  //update employee

  async updateEmployee(
    name: string,
    email: string,
    age: number,
    address: any,
    password: string,
    departmentId: number
  ) {
    const newEmployee = new Employee();
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
    const newAddres = new Address();
    newAddres.line1 = address.line1;
    newAddres.pincode = address.pincode;
    newEmployee.address = newAddres;
    return this.employeerepository.update(newEmployee);
  }

  async Employeelogin(email: string, password: string) {
    const employee = await this.employeerepository.findOneBy({ email });

    if (!employee) {
      throw new HttpException(404, "USER NOT FOUND WITH THIS EMAIL");
    }

    const result = await bcrypt.compare(password, employee.password);

    if (!result) {
      throw new HttpException(404, "Incorrect passowrd");
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_validity,
    });

    return { token };
  }
}

export default EmployeeService;
