import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Address } from "./address.dto";
import { Type } from "class-transformer";
import "reflect-metadata";

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
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address;
}
