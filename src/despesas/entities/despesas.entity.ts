import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";

export class DespesaEntity {
  id: number;
  descricao: string;
  valor: number;
  categoria: CategoriaDespesaEnum;
  data: string;
  parlamentarId: number;
}