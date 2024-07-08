import express from "express";
import DepartmentService from "../service/Department.service";
import HttpException from "../exceptions/http.exceptions";
import { error } from "console";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/department.dto";
import authorize from "../middleware/authorization";
import { RequestWithUser } from "../utils/requestwithuser";
import { Role } from "../utils/enum";

class DepartmentController {
  public router: express.Router;

  constructor(private Departmentservice: DepartmentService) {
    this.router = express.Router();

    this.router.get("/", this.getAllDepartment);
    this.router.get("/:id", this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.put("/", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }

  public getAllDepartment = async (
    req: RequestWithUser,

    res: express.Response
  ) => {
    const department = await this.Departmentservice.getAllDepartment();
    res.status(200).send(department);
  };

  public getDepartmentById = async (
    req: RequestWithUser,

    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const department = await this.Departmentservice.getDepartmentById(
        Number(req.params.id)
      );

      if (!department) {
        const error = new HttpException(404, "new error");
        throw error;
      }
      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };

  public createDepartment = async (
    req: RequestWithUser,

    res: express.Response,
    next: express.NextFunction
  ) => {
    const { name } = req.body;
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }

      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const department = await this.Departmentservice.createDepartment(
        departmentDto.name
      );

      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };

  public deleteDepartment = async (
    req: RequestWithUser,

    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }

      const department = await this.Departmentservice.DeleteById(
        Number(req.params.id)
      );
      res.status(200).send(department);
    } catch (err) {
      next(err);
    }
  };

  //update employee

  public updateDepartment = async (
    req: RequestWithUser,

    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const role = req.role;
      if (role !== Role.HR) {
        throw new HttpException(
          403,
          "You are not authorized to create employee"
        );
      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const department = await this.Departmentservice.updateDepartment(
        departmentDto.name
      );

      res.status(200).send(department);
    } catch (error) {
      next(error);
    }
  };
}

export default DepartmentController;
