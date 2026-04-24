import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';

export class DespesaResponseDto {
  id: number;
  descricao: string;
  valor: number;
  categoria: CategoriaDespesaEnum;
  data: string;
  parlamentarId?: number;
  parlamentarNome?: string;

  constructor(despesa: any) {
    this.id = despesa.id;
    this.descricao = despesa.descricao;
    this.valor = Number(despesa.valor);
    this.categoria = despesa.categoria;
    this.data = despesa.data;
    this.parlamentarId = despesa.parlamentar?.id;
    this.parlamentarNome = despesa.parlamentar?.nomeParlamentar;
  }
}