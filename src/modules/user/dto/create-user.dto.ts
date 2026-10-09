import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '@/common/enum/user.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsOptional()
  age!: number;

  @IsBoolean()
  @IsOptional()
  isPremium!: boolean;

  @IsEnum(UserRole, { message: 'Role must be "admin" or "user"' })
  @IsNotEmpty()
  role!: UserRole;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  hobbies!: string[];
}
