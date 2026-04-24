import { IsOptional, IsString, MaxLength, IsNumber, Min, IsEnum, IsDateString, IsInt } from 'class-validator';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';

export class DespesaUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  valor?: number;

  @IsOptional()
  @IsEnum(CategoriaDespesaEnum)
  categoria?: CategoriaDespesaEnum;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  parlamentarId?: number;
}