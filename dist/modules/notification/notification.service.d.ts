/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { FCMContent } from "./interface/content.interface";
import { NotifyDocument } from "./entity/notification.entity";
import { Model } from "mongoose";
import { UpdateNotifyDto } from "./dto/notification-update.dto";
import { MailService } from "../mail/mail.service";
import { NotifyGateway } from "./notify.gateway";
export declare class NotificationService {
    private notifyModel;
    private sendMail;
    private readonly notifyGateway;
    constructor(notifyModel: Model<NotifyDocument>, sendMail: MailService, notifyGateway: NotifyGateway);
    sendNotification(content: FCMContent, notifyData: any): Promise<import("axios").AxiosResponse<any, any>>;
    findall(userId: string, page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        data: any[];
    }>;
    totalCount(userId: string): Promise<{
        data: number;
    }>;
    totalChatCount(userId: string): Promise<{
        data: number;
    }>;
    update(id: string, updateDto: UpdateNotifyDto): Promise<any>;
    updateChatNoti(id: string, updateDto: UpdateNotifyDto): Promise<any>;
}
