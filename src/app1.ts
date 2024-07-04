import express from "express";
import { Request, Response } from "express";

import employee_router from "./routes/employee.routes";
import loggerMiddleware from "./middleware/logger.mIddleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import { sourceMapsEnabled } from "process";
import HttpException from "./exceptions/http.exceptions";
import errorMiddleware from "./middleware/error.middleware";

const server = express();
server.use(bodyParser.json());
server.use(loggerMiddleware);

server.use("/employee", employee_router);
server.use(errorMiddleware);
(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();

// server.get("/employee", (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(200).send("Hello I am rohith");
// });

// interface profile {
//   name: string;
//   age: number;
// }

// interface data1 {
//   profile: profile;
// }

// server.get("/getdata", (req: Request, res: Response) => {
//   let data: data1 = {
//     profile: {
//       name: "Rohith",
//       age: 22,
//     },
//   };

//   console.log(data.profile.name);
//   res.status(200).send(data);
// });
