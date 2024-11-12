import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
