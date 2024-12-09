import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { UserRepository } from 'src/user/user.dbinterface';
import { UserService } from 'src/user/user.prisma';

@Module({

  imports: [
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtService,
    {
      provide: UserRepository,
      useClass: UserService,
    }
  ],
  exports: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule { }
