import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  stock!: number;
}
