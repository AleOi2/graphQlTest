import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQlModule } from './graphql';
// import { ClientWebsockedModule } from './websocket_client/websocket_client.module';
// import { WebsockedModuleServer } from './websocket_server/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot( { 
      isGlobal: true,
      envFilePath: '../.env'

    }),
    UserModule,
    AuthModule,
    PrismaModule,
    GraphQlModule,
    // ClientWebsockedModule,
    // WebsockedModuleServer,

  ],
})
export class AppModule {}
