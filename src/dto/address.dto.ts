import { IsNotEmpty, IsString, isString } from "class-validator";
export class Address {
  @IsNotEmpty()
  @IsString()
  line1: string;
  @IsNotEmpty()
  @IsString()
  pincode: string;
}
