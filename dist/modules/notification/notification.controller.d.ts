import { NotificationService } from "./notification.service";
import { User } from "../user/user.schema";
import { UpdateNotifyDto } from "./dto/notification-update.dto";
export declare class NotificationController {
    private readonly notifyService;
    constructor(notifyService: NotificationService);
    findall(user: User, page?: number, limit?: number): Promise<{
        totalCount: number;
        totalPages: number;
        currentPage: number;
        data: any[];
    }>;
    count(user: User): Promise<{
        data: number;
    }>;
    totalChatCount(user: User): Promise<{
        data: number;
    }>;
    updateChatNoti(user: User, updateDto: UpdateNotifyDto): Promise<any>;
    update(id: string, updateDto: UpdateNotifyDto): Promise<any>;
}
