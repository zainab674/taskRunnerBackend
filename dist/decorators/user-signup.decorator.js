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
exports.IsUserUnique = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./../modules/user/user.service");
const index_1 = require("./../exceptions/index");
let IsUserUnique = class IsUserUnique {
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { email, phone } = req.body;
        let userWithEmail;
        let userWithPhone;
        if (email)
            userWithEmail = await this.userService.findOne({
                email: email.toLowerCase(),
            });
        if (phone) {
            userWithPhone = await this.userService.findOne({
                phone: phone.toLowerCase(),
            });
        }
        if (userWithEmail) {
            throw new common_1.HttpException(index_1.ErrorCodesMeta.USER_ALREADY_EXISTS.message, index_1.ResponseCode.ALREADY_EXIST);
        }
        else if (userWithPhone) {
            throw new common_1.HttpException(index_1.ErrorCodesMeta.USER_ALREADY_EXISTS_PHONE.message, index_1.ResponseCode.ALREADY_EXIST);
        }
        else {
            return true;
        }
    }
};
exports.IsUserUnique = IsUserUnique;
exports.IsUserUnique = IsUserUnique = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], IsUserUnique);
//# sourceMappingURL=user-signup.decorator.js.map