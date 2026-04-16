
import { PartidoEnum } from 'src/core/enums/partidos.enum';

export class ParlamentarResponseDto {
  id: number;
  nomeCompleto: string;
  nomeParlamentar: string;
  partidoAtual: PartidoEnum;
  numeroVotos: number;

  constructor(parlamentar: any) {
    this.id = parlamentar.id;
    this.nomeCompleto = parlamentar.nomeCompleto;
    this.nomeParlamentar = parlamentar.nomeParlamentar;
    this.partidoAtual = parlamentar.partidoAtual;
    this.numeroVotos = parlamentar.numeroVotos;
  }
}
