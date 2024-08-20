import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from 'src/validators/match.decorator';

@InputType()
export class ResetPasswordDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  newPassword: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  @Match('newPassword', { message: 'Confirm password should match!' })
  confirmPassword: string;
}
