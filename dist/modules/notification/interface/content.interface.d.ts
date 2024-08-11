export interface FCMContent {
    category: string;
    title: string;
    description: string;
    id: string;
    userId: string;
    receiverId: string;
    tokens: string[];
    allowPush: boolean;
    allowInApp: boolean;
    postId?: string;
}
