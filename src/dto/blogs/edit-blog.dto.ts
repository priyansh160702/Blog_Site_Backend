import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

const errorMessage = (field: string) => {
  return `Length of ${field} cannot be 0!`;
};

@InputType()
export class EditBlogDataDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: errorMessage('Title') })
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subTitle: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: errorMessage('Category') })
  category: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: errorMessage('Content') })
  @Length(10)
  content: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  image: string;
}
