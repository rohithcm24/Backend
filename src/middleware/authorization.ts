import { NextFunction, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { RequestWithUser } from "../utils/requestwithuser";
import { jwtPayload } from "../utils/jwtpayload";

const authorize = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getTokenFromRequestHeader(req);
    console.log("token: ", token);
    const payload = jsonwebtoken.verify(token, JWT_SECRET);

    req.name = (payload as jwtPayload).name;
    req.email = (payload as jwtPayload).email;
    req.role = (payload as jwtPayload).role;

    return next();
  } catch (error) {
    return next(error);
  }
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const bearerToken = req.header("Authorization");
  console.log("bearerToken: ", bearerToken);
  const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
  return token;
};

export default authorize;
