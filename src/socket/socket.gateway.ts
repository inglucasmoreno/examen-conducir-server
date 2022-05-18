import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*', methods: ["GET", "POST"]} })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server
  
  handleConnection() {
    console.log('Usuario conectado');  
  }

  handleDisconnect(client: any) {
    console.log('Usuario desconectado');
  }

  // Canal finalizar-examen - Indica que se debe finalizar un examen
  @SubscribeMessage('finalizar-examen')
  finalizarExamen(socket: Socket, data: any){
    this.server.emit('r-finalizar-examen', data);  
  }

  // Inidica que se deben de listar los examenes
  @SubscribeMessage('listar-examenes')
  listarExamenes(socket: Socket, data: any){
    this.server.emit('listar-examenes', data);  
  }

  
}
