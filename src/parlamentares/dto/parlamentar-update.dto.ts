import { IsOptional, IsString, MaxLength, IsEnum, IsInt, Min } from "class-validator";
import { PartidoEnum } from "src/core/enums/partidos.enum";


export class ParlamentarUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nomeCompleto?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  nomeParlamentar?: string;

  @IsOptional()
  @IsEnum(PartidoEnum)
  partidoAtual?: PartidoEnum;

  @IsOptional()
  @IsInt()
  @Min(0)
  numeroVotos?: number;
}