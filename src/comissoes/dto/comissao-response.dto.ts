export class ComissaoResponseDto {
  id: number;
  nome: string;
  sigla: string;
  tema: string;
  parlamentares?: { id: number; nomeParlamentar: string }[];

  constructor(comissao: any) {
    this.id = comissao.id;
    this.nome = comissao.nome;
    this.sigla = comissao.sigla;
    this.tema = comissao.tema;
    if (comissao.parlamentares) {
      this.parlamentares = comissao.parlamentares.map((p: any) => ({
        id: p.id,
        nomeParlamentar: p.nomeParlamentar,
      }));
    }
  }
}
