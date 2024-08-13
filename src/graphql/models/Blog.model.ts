import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  subTitle: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  image?: string;

  @Field((type) => Int)
  user_id: number;
}
