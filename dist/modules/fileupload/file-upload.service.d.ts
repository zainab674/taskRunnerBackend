/// <reference types="multer" />
import * as AWS from "aws-sdk";
export declare class FileUploadService {
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadSingleFile(file: Express.Multer.File): Promise<string>;
    uploadMultipleFiles(files: Express.Multer.File[]): Promise<string[]>;
}
