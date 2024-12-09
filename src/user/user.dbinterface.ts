import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

@Injectable()
export abstract class UserRepository {
  abstract user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> ;

  abstract users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]>;

  abstract createUser(data: Prisma.UserCreateInput): Promise<User>;

  abstract updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User>;

  abstract deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;  

  abstract findByUser(where: Prisma.UserWhereInput): Promise<User> ;

}