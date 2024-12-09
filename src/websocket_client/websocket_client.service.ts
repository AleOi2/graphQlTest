import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io-client';
// import { tugboatConfigRepository } from 'src/tugboat_config/tugboat_config.dbiterface';
import { UserRepository } from 'src/user/user.dbinterface';

@Injectable()
export class ClientWebsocketService {
  private socket: Socket;
  
  constructor(
    private readonly userService: UserRepository,
    // private readonly authSevice: AuthService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    // private readonly tugBoatConfig: tugboatConfigRepository,
  ) {
    // console.log("Conectando o websocket cliente")
    // Connect to your WebSocket server
    this.userService.users({}).then(async (alluser) => {
      // const user = alluser[0];
      // current time + 1 day
      
      // const expiration = new Date().setDate(new Date().getDate() + 1);
      // const issueAt = new Date().getTime();
      // const tugboatIdentifier = await tugBoatConfig.tugboatConfigs({});
      // const token = this.jwtService.sign({ 
      //   iss: 'node-backend-boilerplate', // issuer
      //   sub: {
      //     pmis_user: user.username,
      //     user: null,
      //   },
      //   iat: issueAt,
      //   exp: expiration,
      // }, {
      //   secret: this.config.get('SEED_JWT')
      // });

      // this.socket = require('socket.io-client')(process.env['CORE_SERVER_URL'],{
      //   auth: {
      //     token: token,
      //     role: 'tugboat',
      //     tug_identifier: tugboatIdentifier[0].mmsi
  
      //   }
      // });

      
      // Handle WebSocket events
      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      }); 
  
      this.socket.on('message', (data) => {
        console.log('Received message:', data);
      });
  
      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
  

    })

  
  }

  // Send messages to the server
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}