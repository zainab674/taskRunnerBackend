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
exports.SeriesPageOptionsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
class SeriesPageOptionsDto {
    constructor() {
        this.order = 1;
        this.column = '';
        this.genreName = '';
        this.genreId = '';
        this.take = 10;
        this.skip = 0;
    }
}
exports.SeriesPageOptionsDto = SeriesPageOptionsDto;
__decorate([
    (0, class_transformer_1.Transform)((value) => {
        if (value.value === constants_1.Order.DESC) {
            return -1;
        }
        else if (value.value === constants_1.Order.ASC) {
            return 1;
        }
        return 'Order must be ASC or DESC';
    }),
    (0, class_validator_1.IsInt)({
        message: 'Order must be ASC or DESC',
    }),
    __metadata("design:type", Number)
], SeriesPageOptionsDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeriesPageOptionsDto.prototype, "column", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeriesPageOptionsDto.prototype, "genreName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeriesPageOptionsDto.prototype, "genreId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SeriesPageOptionsDto.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], SeriesPageOptionsDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SeriesPageOptionsDto.prototype, "q", void 0);
//# sourceMappingURL=series-page-options.dto.js.map