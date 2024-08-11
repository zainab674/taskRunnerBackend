import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { SocketService } from './socket.service';


@WebSocketGateway({ port: 1234 })
export class MyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private authService: AuthService,
        private socketService: SocketService
    ) { }

    @WebSocketServer()
    server: Server;

    private clients = new Map<string, Socket>();

    private async getUserFromSocket(socket: Socket) {
        const token = socket.handshake.headers.authorization;
        return this.authService.getUserFromToken(token);
    }

    async handleConnection(socket: Socket) {
        const token = socket.handshake.headers.authorization;
        const user = await this.authService.getUserFromToken(token);
        if (user) {
            this.clients.set(user.userId, socket);
            console.log("Client connected: ", user.userId);

            const messages = await this.socketService.getAll(user.userId);
            // console.log(messages);
            socket.emit('allMessages', messages);
        } else {
            socket.emit('error', { message: 'Unauthorized' });
            socket.disconnect();
        }
    }

    handleDisconnect(socket: Socket) {
        for (let [userId, clientSocket] of this.clients.entries()) {
            if (clientSocket.id === socket.id) {
                this.clients.delete(userId);
                console.log("Client disconnected:", userId);
                break;
            }
        }
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(socket: Socket, createSocketDto: CreateSocketDto) {
        const user = await this.getUserFromSocket(socket);
        if (!user) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }
        if (typeof createSocketDto === 'string') {
            try {
                createSocketDto = JSON.parse(createSocketDto);
            } catch (error) {
                socket.emit('error', { message: 'Invalid data format' });
                return;
            }
        }
        createSocketDto.senderId = user.userId;
        console.log(createSocketDto)
        await this.socketService.create(createSocketDto);

        const recipientSocket = this.clients.get(createSocketDto.recepientId);
        if (recipientSocket) {
            this.server.to(recipientSocket.id).emit('message', createSocketDto.message);
        } else {
            console.log("Recipient not connected");
        }
    }

    @SubscribeMessage('getUserMessages')
    async handleGetUserMessages(socket: Socket) {
        const user = await this.getUserFromSocket(socket);
        if (!user) {
            socket.emit('error', { message: 'Unauthorized' });
            return;
        }

        const messages = await this.socketService.getAll(user.userId);
        socket.emit('allMessages', messages);
    }
}
