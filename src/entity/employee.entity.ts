import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";
import { Role } from "../utils/enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  name: string;
  @Column()
  email: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: Role;

  @Column({ nullable: true })
  departmentId: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;

  @ManyToOne(() => Department, (deparment) => deparment.employees, {
    onDelete: "CASCADE",
  })
  department: Department;
}

export default Employee;
