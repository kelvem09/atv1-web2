import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { DespesaEntity } from "src/despesas/entities/despesas.entity";
import { DespesasCreateDto } from "./dto/despesas-create.dto";
import { DespesaResponseDto } from "./dto/despesas-response.dto";


@Injectable()
export class DespesaService {
  private despesas: DespesaEntity[] = [];
  private proximoId = 1;

  create(dto: DespesasCreateDto): DespesaResponseDto {
    if (dto.categoria === CategoriaDespesaEnum.COMBUSTIVEL && dto.valor > 2000) {
      throw new BadRequestException('Despesa de combustível não pode ultrapassar R$ 2.000,00');
    }

    if (dto.categoria === CategoriaDespesaEnum.DIVULGACAO && dto.valor > 12000) {
      throw new BadRequestException('Despesa de divulgação não pode ultrapassar R$ 12.000,00');
    }

    const despesa: DespesaEntity = {
      id: this.proximoId++,
      descricao: dto.descricao,
      valor: dto.valor,
      categoria: dto.categoria,
      data: dto.data,
      parlamentarId: dto.parlamentarId,
    };

    this.despesas.push(despesa);

    return new DespesaResponseDto(despesa);
  }

  findAll(): DespesaResponseDto[] {
    return this.despesas.map((despesa) => new DespesaResponseDto(despesa));
  }

  findById(id: number): DespesaResponseDto {
    const despesa = this.despesas.find((item) => item.id === id);

    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }

    return new DespesaResponseDto(despesa);
  }

  findByCategoria(categoria: CategoriaDespesaEnum): DespesaResponseDto[] {
    return this.despesas
      .filter((item) => item.categoria === categoria)
      .map((despesa) => new DespesaResponseDto(despesa));
  }

  remove(id: number): void {
    const index = this.despesas.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Despesa não encontrada');
    }

    this.despesas.splice(index, 1);
  }
}