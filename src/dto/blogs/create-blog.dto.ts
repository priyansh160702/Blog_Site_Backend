import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

const errorMessage = (field: string) => {
  return `${field} Field should not be empty!`;
};

@InputType()
export class BlogDataDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: errorMessage('Title') })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subTitle: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: errorMessage('Category') })
  category: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: errorMessage('Content') })
  @Length(10)
  content: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image: string;

  // @Field(() => Int)
  // @IsNumber()
  // @IsNotEmpty({ message: errorMessage('userId') })
  // userId: number;
}
