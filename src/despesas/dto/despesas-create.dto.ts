import { IsString, IsNotEmpty, IsNumber, IsEnum, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";

export class DespesasCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty()
  @IsNumber()
  valor: number;

  @ApiProperty({ enum: CategoriaDespesaEnum })
  @IsEnum(CategoriaDespesaEnum)
  categoria: CategoriaDespesaEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data: string;

  @ApiProperty()
  @IsInt()
  parlamentarId: number;
}