
import { Module } from '@nestjs/common';
import { ClientWebsocketService } from './websocket_client.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    UserModule,
    AuthModule,
  ],
  providers:[
    ClientWebsocketService
  ],
  exports:[
    ClientWebsocketService

  ]
})
export class ClientWebsockedModule {}
