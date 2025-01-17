import express, { NextFunction } from "express";
import EmployeeService from "../service/employee.service";
import HttpException from "../exceptions/http.exceptions";
import { error } from "console";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { Role } from "../utils/enum";
import authorize from "../middleware/authorization";
import { RequestWithUser } from "../utils/requestwithuser";

class EmployeeController {
  public router: express.Router;

  constructor(private employeeservice: EmployeeService) {
    this.router = express.Router();

    this.router.get("/", authorize, this.getAllEmployee);
    this.router.get("/:id", authorize, this.getEmployeeById);
    //this.router.post("/", this.createEmployee);
    this.router.post("/login", this.Employeelogin);
    this.router.post("/", authorize, this.createEmployee);
    this.router.put("/:id", authorize, this.updateEmployee);
    this.router.delete("/:id", authorize, this.deleteEmployee);
  }

  public getAllEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    console.log("here");
    const employees = await this.employeeservice.getAllEmployee();
    const employeesWithoutSensitiveInfo = employees.map(
      ({ password, ...rest }) => rest
    );
    res.status(200).send(employeesWithoutSensitiveInfo);
  };

  public getEmployeeById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employees = await this.employeeservice.getEmployeeById(
        Number(req.params.id)
      );

      if (!employees) {
        const error = new HttpException(404, "new error");
        throw error;
      }
      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { email, name, age, address, role, password } = req.body;
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const employees = await this.employeeservice.createEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.role,
        employeeDto.password,
        employeeDto.departmentId
      );

      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  public deleteEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }
      const employees = await this.employeeservice.DeleteById(
        Number(req.params.id)
      );
      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  //update employee

  public updateEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { email, name, age, address } = req.body;
    try {
      const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(employeeDto);
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }

      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const employees = await this.employeeservice.updateEmployee(
        employeeDto.name,
        employeeDto.email,
        employeeDto.age,
        employeeDto.address,
        employeeDto.password,
        employeeDto.departmentId
      );

      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  };

  public Employeelogin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { email, password } = req.body;
    try {
      const token = await this.employeeservice.Employeelogin(email, password);
      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeController;
