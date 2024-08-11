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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../../common/utils");
const constants_1 = require("../../constants");
const exceptions_1 = require("../../exceptions");
const user_service_1 = require("../user/user.service");
const TokenPayloadDto_1 = require("./dto/TokenPayloadDto");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    getUserFromToken(token) {
        const decoded = this.jwtService.decode(token);
        if (decoded) {
            return decoded;
        }
        else {
            throw new Error('Invalid token or missing id');
        }
    }
    async createAccessToken(user) {
        user.password = "";
        return new TokenPayloadDto_1.TokenPayloadDto({
            user: user,
            accessToken: await this.jwtService.signAsync({
                userId: user.id,
                role: user.role,
                type: constants_1.TokenType.ACCESS_TOKEN,
                user,
            }),
        });
    }
    async validateUser(userLoginDto) {
        const user = await this.userService.findByEmail(userLoginDto);
        if (!user) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_NOT_EXISTS_WITH_THIS_EMAIL.message, exceptions_1.ResponseCode.NOT_FOUND);
        }
        const isPasswordValid = await (0, utils_1.validateHash)(userLoginDto.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.YOUR_PASSWORD_IS_INCORRECT.message, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map