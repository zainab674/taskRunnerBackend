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
exports.SocketJsonSchema = exports.SocketSchema = exports.Socket = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const mongoose_2 = require("mongoose");
let Socket = class Socket {
};
exports.Socket = Socket;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Socket.prototype, "recepientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Socket.prototype, "senderId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Message",
        title: "Message",
    }),
    (0, mongoose_1.Prop)({ type: "string" }),
    __metadata("design:type", String)
], Socket.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, trim: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, swagger_1.ApiProperty)({
        description: 'Image URL or path for the chat message',
        type: 'string',
        format: 'binary',
        required: false,
    }),
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: 'Image for Chat',
        title: 'Image',
    }),
    __metadata("design:type", String)
], Socket.prototype, "image", void 0);
exports.Socket = Socket = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            getters: true,
            virtuals: true,
        },
        timestamps: true,
    })
], Socket);
const SocketSchema = mongoose_1.SchemaFactory.createForClass(Socket);
exports.SocketSchema = SocketSchema;
SocketSchema.index({ SocketName: "text" });
SocketSchema.virtual("id").get(function () {
    return this._id.toString();
});
exports.SocketJsonSchema = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)();
//# sourceMappingURL=socket.schema.js.map