import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(): void;
    handleDisconnect(client: any): void;
    finalizarExamen(socket: Socket, data: any): void;
    listarExamenes(socket: Socket, data: any): void;
}
