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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./../modules/user/user.service");
const exceptions_1 = require("../exceptions");
let UserSignUpMiddleware = class UserSignUpMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        const { email, userName, refCode } = req.body;
        const userWithEmail = await this.userService.findOne({
            email: email.toLowerCase(),
        });
        const userWithUserName = await this.userService.findOne({
            userName: userName,
        });
        if (refCode) {
            const userWithRefCode = await this.userService.findOne({
                refCode,
            });
            if (!userWithRefCode) {
                throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_REF_CODE.message, exceptions_1.ResponseCode.NOT_FOUND);
            }
        }
        if (userWithEmail) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_ALREADY_EXISTS.message, exceptions_1.ResponseCode.ALREADY_EXIST);
        }
        else if (userWithUserName) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_ALREADY_EXISTS_WITH_USERNAME.message, exceptions_1.ResponseCode.ALREADY_EXIST);
        }
        else {
            next();
        }
    }
};
exports.UserSignUpMiddleware = UserSignUpMiddleware;
exports.UserSignUpMiddleware = UserSignUpMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserSignUpMiddleware);
//# sourceMappingURL=user-middlewares.js.map