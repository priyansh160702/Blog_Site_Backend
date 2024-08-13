import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int) //Specifying it is a number type.
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  profilePhoto?: string; //'?' specifies that it is an optional field. But for graphql, we need ad nullable=true.

  @Field()
  email: string;

  @Field()
  password: string;

  //  Removed blogs[] as it is not required.
}
