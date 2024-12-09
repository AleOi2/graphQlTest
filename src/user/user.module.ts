import { Module } from '@nestjs/common';
import { UserService } from './user.prisma';
import { UserController } from './user.controller';
import { UserRepository } from './user.dbinterface';
import { AuthModule } from 'src/auth/auth.module';
// import { PrismaModule } from 'src/database/database.module';

@Module({
  imports:[AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserService,
    },
  ],
  exports: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserService,
    },

  ]
})
export class UserModule {}
