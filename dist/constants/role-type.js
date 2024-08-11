"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.SalType = exports.permissionType = exports.PolicyType = exports.CommentType = exports.HouseRuleType = exports.RoleType = void 0;
var RoleType;
(function (RoleType) {
    RoleType["USER"] = "USER";
    RoleType["ADMIN"] = "ADMIN";
    RoleType["MODERATOR"] = "MODERATOR";
})(RoleType || (exports.RoleType = RoleType = {}));
var HouseRuleType;
(function (HouseRuleType) {
    HouseRuleType["STAY"] = "STAY";
    HouseRuleType["ALLOWED"] = "ALLOWED";
})(HouseRuleType || (exports.HouseRuleType = HouseRuleType = {}));
var CommentType;
(function (CommentType) {
    CommentType["REPLY"] = "REPLY";
    CommentType["COMMENT"] = "COMMENT";
})(CommentType || (exports.CommentType = CommentType = {}));
var PolicyType;
(function (PolicyType) {
    PolicyType["PRIVCAY"] = "PRIVCAY";
    PolicyType["TERMANDCOND"] = "TERMANDCOND";
    PolicyType["REFUND"] = "REFUND";
})(PolicyType || (exports.PolicyType = PolicyType = {}));
var permissionType;
(function (permissionType) {
    permissionType["USER"] = "USER";
    permissionType["ADMIN"] = "ADMIN";
    permissionType["MODERATOR"] = "MODERATOR";
})(permissionType || (exports.permissionType = permissionType = {}));
var SalType;
(function (SalType) {
    SalType[SalType["add"] = 1] = "add";
    SalType[SalType["deduct"] = 0] = "deduct";
})(SalType || (exports.SalType = SalType = {}));
var Type;
(function (Type) {
    Type["downloader"] = "Downloader";
    Type["uploader"] = "Uploader";
    Type["carriager"] = "Carriager";
})(Type || (exports.Type = Type = {}));
//# sourceMappingURL=role-type.js.map