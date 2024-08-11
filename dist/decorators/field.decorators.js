"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFieldOptional = exports.EnumField = exports.StringFieldOptional = exports.StringField = exports.NumberFieldOptional = exports.NumberField = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
function NumberField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => Number)];
    const { each, int, minimum, maximum, isPositive, swagger } = options;
    if (swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)(Object.assign(Object.assign({ type: Number }, options), { example: int ? 1 : 1.2 })));
    }
    if (int) {
        decorators.push((0, class_validator_1.IsInt)({ each }));
    }
    else {
        decorators.push((0, class_validator_1.IsNumber)({}, { each }));
    }
    if (lodash_1.default.isNumber(minimum)) {
        decorators.push((0, class_validator_1.Min)(minimum || 0, { each }));
    }
    if (lodash_1.default.isNumber(maximum)) {
        decorators.push((0, class_validator_1.Max)(maximum || 0, { each }));
    }
    if (isPositive) {
        decorators.push((0, class_validator_1.IsPositive)({ each }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.NumberField = NumberField;
function NumberFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), NumberField(Object.assign({ required: false }, options)));
}
exports.NumberFieldOptional = NumberFieldOptional;
function StringField(options = {}) {
    const decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
    if ((options === null || options === void 0 ? void 0 : options.swagger) !== false) {
        decorators.push((0, swagger_1.ApiProperty)(Object.assign({ type: String }, options)));
    }
    if (options === null || options === void 0 ? void 0 : options.minLength) {
        decorators.push((0, class_validator_1.MinLength)(options.minLength));
    }
    if (options === null || options === void 0 ? void 0 : options.maxLength) {
        decorators.push((0, class_validator_1.MaxLength)(options.maxLength));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.StringField = StringField;
function StringFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), StringField(Object.assign({ required: false }, options)));
}
exports.StringFieldOptional = StringFieldOptional;
function EnumField(getEnum, options = {}) {
    const enumValue = getEnum();
    const decorators = [(0, class_validator_1.IsEnum)(enumValue, { each: options.each })];
    return (0, common_1.applyDecorators)(...decorators);
}
exports.EnumField = EnumField;
function EnumFieldOptional(getEnum, options = {}) {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), EnumField(getEnum, Object.assign({ required: false }, options)));
}
exports.EnumFieldOptional = EnumFieldOptional;
//# sourceMappingURL=field.decorators.js.map