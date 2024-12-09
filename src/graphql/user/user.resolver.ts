import { Field, ObjectType, Query, Resolver } from "@nestjs/graphql";

@ObjectType() // This decorator makes it a GraphQL output type
export class HelloMessage {
  @Field(() => String) // This decorator specifies the type of the 'message' field
  msg: string;
}


@Resolver()
export class UserResolver {
  @Query(() => [HelloMessage]) // Specify the return type as an object with a 'msg' property of type String
  hello(): {
    id: number,
    msg: string,    
  }[] {
    console.log('Hello')
    // return { msg: 'Hello, World!' };
    return [
      { id: 1, msg: 'Hello, World!' },
      { id: 2, msg: 'Hello, World 2!' },
      { id: 3, msg: 'Hello, World 3!' },
      { id: 4, msg: 'Hello, World! 4' },
      { id: 6, msg: 'Hello, World! 7' },
    ];
  }
}