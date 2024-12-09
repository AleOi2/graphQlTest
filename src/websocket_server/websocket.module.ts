import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ApplicationWebSocket } from 'src/websocket_server/websocket.gateway';

@Module({
    imports:[
        UserModule,
        AuthModule,
    ],
    providers: [
        ApplicationWebSocket,

    ],
})
export class WebsockedModuleServer { }
