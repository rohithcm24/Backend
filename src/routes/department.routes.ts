import DepartmentController from "../controller/department.contoller";
import dataSource from "../db/data-source.db";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "../service/department.service";

const departmentController = new DepartmentController(
  new DepartmentService(new DepartmentRepository(dataSource))
);
const departmentRouter = departmentController.router;

export default departmentRouter;
