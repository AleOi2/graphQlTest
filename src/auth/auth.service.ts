import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { AuthDto } from './Dto/auth.dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/user/Dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signup(dto: UserDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          password: hash,
          name: dto.name,
          email: dto.email,
        },
      });

      return this.signToken(user.id, user.name);
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findFirst({
        where: {
          name: dto.name,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    console.log('dto.password')
    console.log(dto.password)
    console.log(user.password)
    // compare password
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    return this.signToken(user.id, user.name);
  }

  async signToken(
    userId: number,
    name: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      name: name,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '100000m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}