import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  firstname: string;

  @IsString()
  @IsOptional()
  @Length(3, 96)
  lastname?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum of eight characters, at least one letter, one number and one special character',
  })
  password?: string;
}
