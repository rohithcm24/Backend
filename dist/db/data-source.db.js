"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    database: "training",
    username: "postgres",
    password: "postgres@1",
    extra: { max: 5, min: 2 },
    synchronize: false,
    logging: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    entities: ["dist/entity/*.js"],
    migrations: ["dist/db/migrations/*.js"],
});
exports.default = dataSource;
//# sourceMappingURL=data-source.db.js.map