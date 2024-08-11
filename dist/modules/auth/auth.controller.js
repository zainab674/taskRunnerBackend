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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const use_guards_decorator_1 = require("@nestjs/common/decorators/core/use-guards.decorator");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../common/utils");
const userRoles_1 = require("../../casl/userRoles");
const constants_1 = require("../../constants");
const decorators_1 = require("../../decorators");
const user_schema_1 = require("../user/user.schema");
const user_service_1 = require("../user/user.service");
const user_signup_decorator_1 = require("./../../decorators/user-signup.decorator");
const auth_service_1 = require("./auth.service");
const user_login_dto_1 = require("./dto/user.login.dto");
const TokenPayloadDto_1 = require("./dto/TokenPayloadDto");
const exceptions_1 = require("../../exceptions");
const verify_account_dto_1 = require("./dto/verify-account.dto");
const user_signup_dto_1 = require("./dto/user.signup.dto");
const posts_service_1 = require("../posts/posts.service");
const assigned_tasks_service_1 = require("../assigned-tasks/assigned-tasks.service");
let AuthController = class AuthController {
    constructor(userService, authService, postsService, assignedServive) {
        this.userService = userService;
        this.authService = authService;
        this.postsService = postsService;
        this.assignedServive = assignedServive;
    }
    async generateString(length) {
        let result = "";
        const characters = (0, utils_1.getCharacterString)();
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async verifyToken(dto) {
        const data = await this.userService.verifyAccount(dto);
        console.log(data);
        if (data) {
            const token = await this.authService.createAccessToken(data);
            return token;
        }
    }
    async userLogin(userLoginDto) {
        const userEntity = await this.authService.validateUser(userLoginDto);
        console.log(userEntity);
        if (!userEntity.verify) {
            throw new common_1.HttpException(exceptions_1.ErrorCodesMeta.USER_EMAIL_NOT_VERIFIED, exceptions_1.ResponseCode.UNAUTHORIZED);
        }
        else {
            const token = await this.authService.createAccessToken(userEntity);
            return token;
        }
    }
    async userRegister(userRegisterDto) {
        return await this.userService.createUser(userRegisterDto);
    }
    async getCurrentUser(user) {
        const [profileData, posts, reviews] = await Promise.all([
            this.userService.getProfileData(user.id),
            this.postsService.findByUserId(user.id),
            this.assignedServive.getReviews(user.id),
        ]);
        return {
            profile: profileData,
            posts: posts,
            reviews: reviews,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.authRoute.verifyAccount),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: "any",
        description: "Email Account verify",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_account_dto_1.VerifyAccountDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.authRoute.login),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({
        type: TokenPayloadDto_1.TokenPayloadDto,
        description: "User info with access token",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogin", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)(constants_1.constTexts.authRoute.signUp),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOkResponse)({ type: user_schema_1.User, description: "Successfully Registered" }),
    (0, use_guards_decorator_1.UseGuards)(user_signup_decorator_1.IsUserUnique),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_dto_1.UserSignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegister", null);
__decorate([
    (0, common_1.Get)(constants_1.constTexts.authRoute.me),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Auth)(userRoles_1.Action.Read, "User"),
    (0, swagger_1.ApiOkResponse)({ type: user_schema_1.User, description: "current user info" }),
    __param(0, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.authRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.authRoute.name),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        posts_service_1.PostsService,
        assigned_tasks_service_1.AssignedTasksService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map