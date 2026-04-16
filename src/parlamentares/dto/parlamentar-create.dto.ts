import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsEnum, IsInt, Min } from "class-validator";
import { PartidoEnum } from "src/core/enums/partidos.enum";


export class ParlamentarCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nomeCompleto: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nomeParlamentar: string;

  @ApiProperty({ enum: PartidoEnum })
  @IsEnum(PartidoEnum)
  partidoAtual: PartidoEnum;

  @ApiProperty()
  @IsInt()
  @Min(0)
  numeroVotos: number;
}
