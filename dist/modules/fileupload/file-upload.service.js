"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const uuid_1 = require("uuid");
dotenv.config({ path: `.env.test` });
let FileUploadService = class FileUploadService {
    constructor() {
        this.AWS_S3_BUCKET = "taskruns";
        this.s3 = new AWS.S3({
            accessKeyId: "AKIA5XAVX6OJVTKGHPGH",
            secretAccessKey: "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",
            region: "eu-north-1",
        });
    }
    async uploadSingleFile(file) {
        const params = {
            Bucket: this.AWS_S3_BUCKET,
            Key: `${(0, uuid_1.v4)()}`,
            ContentType: file.mimetype,
            Body: file.buffer,
        };
        const { Location } = await this.s3.upload(params).promise();
        return Location;
    }
    async uploadMultipleFiles(files) {
        const uploadPromises = files.map((file) => this.uploadSingleFile(file));
        return Promise.all(uploadPromises);
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map