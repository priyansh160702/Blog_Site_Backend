import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteBlogResponse {
  @Field()
  message: string;
}
