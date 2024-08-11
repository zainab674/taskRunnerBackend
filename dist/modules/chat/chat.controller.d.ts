/// <reference types="multer" />
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entities";
import { User } from "../user/user.schema";
import { FileUploadService } from "../fileupload/file-upload.service";
export declare class ChatController {
    private readonly chatService;
    private readonly fileService;
    constructor(chatService: ChatService, fileService: FileUploadService);
    createChat(user: User, image: Express.Multer.File, createChatDto: Chat): Promise<import("./entities/chat.entities").ChatDocument>;
    findInbox(user: User): Promise<{
        data: any[];
    }>;
    findDetail(user: User, id: string): Promise<{
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
