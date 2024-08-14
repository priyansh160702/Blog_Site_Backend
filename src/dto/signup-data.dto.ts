import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length, min } from 'class-validator';

@InputType()
export class SignupDataDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  // @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  profilePhoto: string;
}
