import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ComissaoCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  sigla: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  tema: string;
}
