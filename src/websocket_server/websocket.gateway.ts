
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, } from 'socket.io'; // Import the native WebSocket Server and WebSocket classes
import { Socket } from 'socket.io-client';
import { sendConnectionInfoService } from 'src/api_service/connection';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.dbinterface';
import { safeAccess } from 'src/utils';

@WebSocketGateway(
  {
    cors: {
      allow: '*'
    }
  }
)

export class ApplicationWebSocket implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  connectedClients = {
    tugboat: {},
    core: {},
  };

  activeConnections = [];
  activeConnectionsLocation: {
    index: number;
    username: string
  }[] = [];

  constructor(
    private readonly userService: UserRepository,
    // private readonly authSevice: AuthService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    
  ) {

  }

  onModuleInit() {
    console.log('Initi')
    console.log(this.server.serveClient)
    this.server
      .use(async (socket, next) => {
        try {
          // let coreOrTug = socket.handshake.auth.role;
          // let token = socket.handshake.auth.token;
          // const payload = await this.jwtService.verifyAsync(
          //   token,
          //   {
          //     secret: this.config.get('SEED_JWT')

          //   }
          // );

          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          // let User = await this.userService.findByUser({
          //   username: payload.sub.pmis_user
          // });

          // this.connectedClients.push(socket);

          // if (!this.connectedClients[coreOrTug][`${User.username}`]) {
          //   console.log('entrando')
          //   this.connectedClients[coreOrTug][`${User.username}`] = []
          // }
          // this.connectedClients[coreOrTug][`${User.username}`].push(socket);
          // this.activeConnections.push(socket);
          // this.activeConnectionsLocation.push({
          //   index: this.activeConnections.length - 1,
          //   username: `${User.username}`,
          // })
          // const tugboatConfig = await this.tugboatConfigService.tugboatConfigs({});
          // await sendConnectionInfoService(
          //   token, true, (tugboatConfig && tugboatConfig[0])?tugboatConfig[0].identifier: '',
          //   this.activeConnections.length  
          // );
          next();

        } catch (error){
          console.log('error')
          console.log(error)
          // throw new UnauthorizedException();
          socket.send({
            type: 'error'
          })

          socket.disconnect();
          // next(new Error('Authentication error'));
        }

      })
      .on('connection', async (socket) => {
        // let coreOrTug = socket.handshake.auth.role;
        // let token = socket.handshake.auth.token;
        socket.on('disconnect', async () => {
          // console.log('Disconnect')
          // console.log(socket.handshake.auth.role)
          // const connectionIndex = this.activeConnections.indexOf(socket);
          // const {
          //   index,
          //   username
          // } = this.activeConnectionsLocation[connectionIndex];
          // if (index !== -1) {
          //   this.connectedClients[coreOrTug][username].splice(index, 1);
          //   this.activeConnections.splice(connectionIndex, 1);
          //   this.activeConnectionsLocation.splice(connectionIndex, 1);
  
          //   // await sendConnectionInfoService(
          //   //   token, false, (tugboatConfig && tugboatConfig[0])?tugboatConfig[0].identifier: '',
          //   //   this.activeConnections.length  
          //   // );
  
          // }
        })

        socket.on('message', async (data) => {
          console.log('data.type')
          const dataParsed = JSON.parse(data);

          if (dataParsed.type == 'logout') {
            console.log('Disconnect')
            console.log(socket.handshake.auth.role)
            // const connectionIndex = this.activeConnections.indexOf(socket);
            // let coreOrTug = socket.handshake.auth.role;
            // const {
            //   index,
            //   username
            // } = this.activeConnectionsLocation[connectionIndex];
            // if (index !== -1) {
            //   // this.connectedClients[coreOrTug][username].splice(index, 1);
            //   // this.activeConnections.splice(connectionIndex, 1);
            //   // this.activeConnectionsLocation.splice(connectionIndex, 1);
            //   // const tugboatConfig = await this.tugboatConfigService.tugboatConfigs({});
        
            //   // await sendConnectionInfoService(
            //   //   token, false, (tugboatConfig && tugboatConfig[0])?tugboatConfig[0].identifier: '',
            //   //   this.activeConnections.length  
            //   // );
            // }    
          }
          

      
        })

        
        this.server.send('hello =)');
      })

  }

}