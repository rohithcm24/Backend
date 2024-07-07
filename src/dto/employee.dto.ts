import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Address } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";
import { Role } from "../utils/enum";
import Department from "../entity/department.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  departmentId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;
}
