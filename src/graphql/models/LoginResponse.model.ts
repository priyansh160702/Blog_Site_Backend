import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  message: string;

  @Field()
  token: string;
}
