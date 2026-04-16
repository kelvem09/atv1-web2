import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { DespesaResponseDto } from "../dto/despesas-response.dto";
import { DespesaUpdateDto } from "../dto/despesas-update.dto";
import { DespesasCreateDto } from "../dto/despesas-create.dto";


export interface IDespesaService {
  create(dto: DespesasCreateDto): DespesaResponseDto;
  findAll(): DespesaResponseDto[];
  findById(id: number): DespesaResponseDto;
  findByCategoria(categoria: CategoriaDespesaEnum): DespesaResponseDto[];
  findByParlamentarId(parlamentarId: number): DespesaResponseDto[];
  update(id: number, dto: DespesaUpdateDto): DespesaResponseDto;
  remove(id: number): void;
}