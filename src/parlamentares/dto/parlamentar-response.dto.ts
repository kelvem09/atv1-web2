import { PartidoEnum } from 'src/core/enums/partido.enum';

export class ParlamentarResponseDto {
  id: number;
  nomeCompleto: string;
  nomeParlamentar: string;
  partidoAtual: PartidoEnum;
  numeroVotos: number;
  comissoes?: { id: number; nome: string; sigla: string }[];

  constructor(parlamentar: any) {
    this.id = parlamentar.id;
    this.nomeCompleto = parlamentar.nomeCompleto;
    this.nomeParlamentar = parlamentar.nomeParlamentar;
    this.partidoAtual = parlamentar.partidoAtual;
    this.numeroVotos = parlamentar.numeroVotos;
    if (parlamentar.comissoes) {
      this.comissoes = parlamentar.comissoes.map((c: any) => ({
        id: c.id,
        nome: c.nome,
        sigla: c.sigla,
      }));
    }
  }
}
