import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { DespesaEntity } from "../entities/despesas.entity";

export class DespesaResponseDto {
  id: number;
  descricao: string;
  valor: number;
  categoria: CategoriaDespesaEnum;
  data: string;
  parlamentarId: number;

  constructor(despesa: DespesaEntity) {
    this.id = despesa.id;
    this.descricao = despesa.descricao;
    this.valor = despesa.valor;
    this.categoria = despesa.categoria;
    this.data = despesa.data;
    this.parlamentarId = despesa.parlamentarId;
  }
}