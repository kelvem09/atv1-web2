import { IsString, IsNotEmpty, MaxLength, IsEnum, IsInt, Min } from 'class-validator';
import { PartidoEnum } from 'src/core/enums/partido.enum';

export class ParlamentarCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nomeCompleto: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nomeParlamentar: string;

  @IsEnum(PartidoEnum)
  partidoAtual: PartidoEnum;

  @IsInt()
  @Min(0)
  numeroVotos: number;
}
