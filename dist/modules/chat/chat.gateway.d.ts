import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { Chat } from "./entities/chat.entities";
import { UserService } from "../user/user.service";
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    private readonly connectedUsers;
    server: Server;
    constructor(authService: AuthService, userService: UserService);
    handleConnection(socket: Socket): Promise<void>;
    handleDisconnect(socket: Socket): Promise<void>;
    createChat(chat: Chat): Promise<void>;
    getRecipientSocketId(recipientId: string): string | undefined;
}
