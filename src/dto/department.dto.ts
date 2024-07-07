import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";
import Department from "../entity/department.entity";
import Employee from "../entity/employee.entity";

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;
}
