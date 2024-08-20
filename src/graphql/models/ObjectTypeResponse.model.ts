import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ObjectTypeResponse {
  @Field()
  message: string;
}
