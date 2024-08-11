"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./model/user.schema");
const role_schema_1 = require("./model/role.schema");
const coa_schema_1 = require("./model/coa.schema");
const users_seeder_1 = require("./seeder/users.seeder");
const roles_seeder_1 = require("./seeder/roles.seeder");
const coa_seeder_1 = require("./seeder/coa.seeder");
(0, nestjs_seeder_1.seeder)({
    imports: [
        mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/game-of-thrones'),
        mongoose_1.MongooseModule.forFeature([
            { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            { name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema },
            { name: coa_schema_1.COA.name, schema: coa_schema_1.COASchema },
        ]),
    ],
}).run([users_seeder_1.UsersSeeder, roles_seeder_1.RoleSeeder, coa_seeder_1.COASeeder]);
//# sourceMappingURL=seeder.js.map