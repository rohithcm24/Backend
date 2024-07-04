"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const logger_mIddleware_1 = __importDefault(require("./middleware/logger.mIddleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_db_1 = __importDefault(require("./db/data-source.db"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(logger_mIddleware_1.default);
server.use("/employee", employee_routes_1.default);
server.use(error_middleware_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_db_1.default.initialize();
    }
    catch (e) {
        console.log("Failed", e);
        process.exit(1);
    }
    server.listen(3000, () => {
        console.log("server listening to 3000");
    });
}))();
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
//# sourceMappingURL=app1.js.map