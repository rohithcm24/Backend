import { Role } from "./enum";
import express from "express";

export interface RequestWithUser extends express.Request {
  name: string;
  email: string;
  role: Role;
}
