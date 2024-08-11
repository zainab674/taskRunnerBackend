"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.IS_PUBLIC_KEY = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
const PoliciesGuard_1 = require("../guards/PoliciesGuard");
const auth_user_interceptor_service_1 = require("../interceptors/auth-user-interceptor.service");
function Auth(roles, options) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, PoliciesGuard_1.PoliciesGuard), (0, PoliciesGuard_1.CheckPolicies)((ability) => ability.can(roles, options)), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseInterceptors)(auth_user_interceptor_service_1.AuthUserInterceptor), (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }));
}
exports.Auth = Auth;
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=http.decorators.js.map