import { IsString, IsNotEmpty, IsNumber, IsEnum, IsInt, Min, MaxLength, IsDateString } from 'class-validator';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';

export class DespesasCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  descricao: string;

  @IsNumber()
  @Min(0.01)
  valor: number;

  @IsEnum(CategoriaDespesaEnum)
  categoria: CategoriaDespesaEnum;

  @IsDateString()
  data: string;

  @IsInt()
  @Min(1)
  parlamentarId: number;
}