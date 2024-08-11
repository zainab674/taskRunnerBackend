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
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./entities/chat.entities";
import { AuthService } from "../auth/auth.service";
import { User } from "../user/user.schema";
import { ChatGateway } from "./chat.gateway";
import { UserService } from "../user/user.service";
import { NotificationService } from "../notification/notification.service";
export declare class ChatService {
    private chatModel;
    private authService;
    private userService;
    private readonly notificationService;
    private readonly chatGateway;
    constructor(chatModel: Model<ChatDocument>, authService: AuthService, userService: UserService, notificationService: NotificationService, chatGateway: ChatGateway);
    createChat(createchatDto: Chat, creator: User): Promise<ChatDocument>;
    findInbox(userId: string): Promise<{
        data: any[];
    }>;
    findDetail(id: string, userId: string): Promise<{
        myProfile: {
            name: string;
            avatar: string;
            id: string;
            email: string;
        };
        otherProfile: {
            name: string;
            avatar: string;
            id: string;
            email: string;
            notification: boolean;
            block: boolean;
        };
        data: any[];
    }>;
}
