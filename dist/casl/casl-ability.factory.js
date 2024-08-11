"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const userRoles_1 = require("./userRoles");
let CaslAbilityFactory = class CaslAbilityFactory {
    async createForUser(user) {
        const { can } = new ability_1.AbilityBuilder(ability_1.Ability);
        const caslPermissions = [];
        if (user.role === constants_1.RoleType.ADMIN) {
            can(userRoles_1.Action.Manage, "all");
            caslPermissions.push({ action: userRoles_1.Action.Manage, subject: "all" });
        }
        else if (user.role === constants_1.RoleType.USER) {
            can(userRoles_1.Action.Create, "all");
            can(userRoles_1.Action.Read, "all");
            caslPermissions.push({ action: userRoles_1.Action.Create, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Read, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Update, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Delete, subject: "all" });
        }
        else {
            caslPermissions.push({ action: userRoles_1.Action.Create, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Read, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Update, subject: "all" });
            caslPermissions.push({ action: userRoles_1.Action.Delete, subject: "all" });
        }
        return new ability_1.Ability(caslPermissions);
    }
};
exports.CaslAbilityFactory = CaslAbilityFactory;
exports.CaslAbilityFactory = CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
//# sourceMappingURL=casl-ability.factory.js.map