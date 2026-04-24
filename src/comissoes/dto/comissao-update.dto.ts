import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ComissaoUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  nome?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  sigla?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tema?: string;
}
