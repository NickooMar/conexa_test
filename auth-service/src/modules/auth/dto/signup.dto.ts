import {
  Validate,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsEmail,
} from 'class-validator';
import { UserRole } from '../schemas/user.schema';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage() {
    return 'Passwords do not match!';
  }
}

export class SignupRequestDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(25)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string;
}

export class SignupResponseDto {
  role: UserRole;
  userId: string;
  username: string;
  userEmail: string;
  accessToken: string;
}
