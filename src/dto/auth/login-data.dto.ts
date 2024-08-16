import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class LoginDataDto {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email must not be empty!' })
  email: string;

  @Field()
  @IsString()
  @Length(5)
  @IsNotEmpty({ message: 'Password must not be empty!' })
  password: string;
}
