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
exports.COASchema = exports.COA = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let COA = class COA {
};
exports.COA = COA;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true, required: true }),
    __metadata("design:type", String)
], COA.prototype, "key1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "key2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "key3", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "key4", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "key5", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "key6", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true, required: true }),
    __metadata("design:type", String)
], COA.prototype, "headCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true, required: true }),
    __metadata("design:type", String)
], COA.prototype, "accountTitle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'string', trim: true }),
    __metadata("design:type", String)
], COA.prototype, "headIdFK", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'number', default: 0 }),
    __metadata("design:type", Number)
], COA.prototype, "depreciationRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'date', default: new Date() }),
    __metadata("design:type", Date)
], COA.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(14),
    (0, mongoose_1.Prop)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], COA.prototype, "isActive", void 0);
exports.COA = COA = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
    })
], COA);
const COASchema = mongoose_1.SchemaFactory.createForClass(COA);
exports.COASchema = COASchema;
//# sourceMappingURL=coa.schema.js.map