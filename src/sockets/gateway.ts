import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/guards/ws.auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { disconnect } from 'process';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // @UseGuards(WsGuard)
  async handleConnection(client: Socket, data: any[]) {
    // console.log('token: ', client.handshake.query.token);
    if (
      client.handshake.query.token === 'null' ||
      client.handshake.query.token === 'undefined'
    ) {
      this.logger.log('the socket is disconnected due to incorrect token');
      return client.disconnect(true);
    }
    const payload = await this.authService.verify(client.handshake.query.token);
    const saveUser = await this.userService.saveSocketUser(
      payload.sub,
      client.id,
    );

    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('send_broadcastmessage')
  handleMessage(client: Socket, payload: string): void {
    console.log('the client to server payload :', payload);
    this.server.emit('receive_broadcastmessage', payload);
  }

  @SubscribeMessage('sendMessage')
  async handlePrivateMessage(client: Socket, payload: any): Promise<void> {
    console.log('the private message :', payload);
    const reciever = await this.userService.getUserById(payload.reciever_id);
    this.server.to(reciever.socketId).emit('receiveMessage', payload);
  }
}
