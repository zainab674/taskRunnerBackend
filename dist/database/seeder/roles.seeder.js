"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeeder = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_type_1 = require("../../constants/role-type");
const role_schema_1 = require("../model/role.schema");
let RoleSeeder = class RoleSeeder {
    constructor(role) {
        this.role = role;
    }
    async seed() {
        const rolesArr = Object.keys(role_type_1.RoleType);
        for (let i = 0; i < rolesArr.length; i++) {
            const create = new this.role({
                role: rolesArr[i],
                permissions: [],
            });
            await create.save().catch((err) => {
                throw new common_1.HttpException(err.message, 400);
            });
        }
        return;
    }
    async drop() {
    }
};
exports.RoleSeeder = RoleSeeder;
exports.RoleSeeder = RoleSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleSeeder);
//# sourceMappingURL=roles.seeder.js.map