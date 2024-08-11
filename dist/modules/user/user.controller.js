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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../constants");
const userRoles_1 = require("../../casl/userRoles");
const decorators_1 = require("../../decorators");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_schema_1 = require("./user.schema");
const user_service_1 = require("./user.service");
const file_upload_interceptor_1 = require("../../interceptors/file-upload.interceptor");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findall() {
        return this.userService.findall();
    }
    async update(user, avatar, userUpdateDto) {
        if (avatar) {
            userUpdateDto.avatar = avatar.destination + avatar.filename;
        }
        return this.userService.update(user.id, userUpdateDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(constants_1.constTexts.userRoute.allUsers),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Get all List",
        type: user_schema_1.User,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findall", null);
__decorate([
    (0, decorators_1.Auth)(userRoles_1.Action.Create, "User"),
    (0, common_1.UseInterceptors)((0, file_upload_interceptor_1.FileUpload)('avatar')),
    (0, common_1.Put)(constants_1.constTexts.userRoute.update),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.ApiPageOkResponse)({
        description: "Update User Profile",
        type: user_schema_1.User,
    }),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(constants_1.constTexts.userRoute.name),
    (0, swagger_1.ApiTags)(constants_1.constTexts.userRoute.name),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map