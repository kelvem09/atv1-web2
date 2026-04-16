import { PartidoEnum } from 'src/core/enums/partidos.enum';

export class ParlamentarEntity {
  id: number;
  nomeCompleto: string;
  nomeParlamentar: string;
  partidoAtual: PartidoEnum;
  numeroVotos: number;
}
