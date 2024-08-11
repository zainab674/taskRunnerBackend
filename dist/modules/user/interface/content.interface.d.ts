export interface FCMContent {
    category: string;
    title: string;
    description: string;
    id: string;
    userId: String;
    tokens: string[];
    allowPush: boolean;
    allowInApp: boolean;
    postId?: string;
}
