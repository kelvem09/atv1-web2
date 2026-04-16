import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriaDespesaEnum } from "src/core/enums/categoriasDespesas.enum";
import { RegraNegocioException } from "src/core/exceptions/rule.exception";
import { ParlamentarEntity } from "src/parlamentares/entities/parlamentar.entity";
import { ParlamentarRepository } from "src/parlamentares/parlamentar.repository";
import { DespesaRepository } from "./despesas.repository";
import { DespesaResponseDto } from "./dto/despesas-response.dto";
import { DespesaUpdateDto } from "./dto/despesas-update.dto";
import { DespesaEntity } from "./entities/despesas.entity";
import { IDespesaService } from "./interfaces/despesa-service.interface";
import { DespesasCreateDto } from "./dto/despesas-create.dto";


@Injectable()
export class DespesaServicePadrao implements IDespesaService {
  constructor(
    private readonly despesaRepository: DespesaRepository,
    private readonly parlamentarRepository: ParlamentarRepository,
  ) {}

  create(dto: DespesasCreateDto): DespesaResponseDto {
    const parlamentar = this.getParlamentarOuFalhar(dto.parlamentarId);
    this.validarRegras(dto, parlamentar);

    const despesa = this.despesaRepository.save(dto);
    return new DespesaResponseDto(despesa);
  }

  findAll(): DespesaResponseDto[] {
    return this.despesaRepository
      .findAll()
      .map((despesa) => new DespesaResponseDto(despesa));
  }

  findById(id: number): DespesaResponseDto {
    const despesa = this.despesaRepository.findById(id);

    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }

    return new DespesaResponseDto(despesa);
  }

  findByCategoria(categoria: CategoriaDespesaEnum): DespesaResponseDto[] {
    return this.despesaRepository
      .findByCategoria(categoria)
      .map((despesa) => new DespesaResponseDto(despesa));
  }

  findByParlamentarId(parlamentarId: number): DespesaResponseDto[] {
    return this.despesaRepository
      .findByParlamentarId(parlamentarId)
      .map((despesa) => new DespesaResponseDto(despesa));
  }

  update(id: number, dto: DespesaUpdateDto): DespesaResponseDto {
    const atual = this.despesaRepository.findById(id);

    if (!atual) {
      throw new NotFoundException('Despesa não encontrada');
    }

    const parlamentarId = dto.parlamentarId ?? atual.parlamentarId;
    const parlamentar = this.getParlamentarOuFalhar(parlamentarId);

    const dadosAtualizados: Omit<DespesaEntity, 'id'> = {
      descricao: dto.descricao ?? atual.descricao,
      valor: dto.valor ?? atual.valor,
      categoria: dto.categoria ?? atual.categoria,
      data: dto.data ?? atual.data,
      parlamentarId,
    };

    this.validarRegras(dadosAtualizados, parlamentar);

    const atualizado = this.despesaRepository.update(id, dadosAtualizados);
    return new DespesaResponseDto(atualizado!);
  }

  remove(id: number): void {
    const deleted = this.despesaRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Despesa não encontrada');
    }
  }

  private getParlamentarOuFalhar(parlamentarId: number): ParlamentarEntity {
    const parlamentar = this.parlamentarRepository.findById(parlamentarId);

    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }

    return parlamentar;
  }

  private validarRegras(
    despesa: Omit<DespesaEntity, 'id'>,
    _parlamentar: ParlamentarEntity,
  ): void {
    if (
      despesa.categoria === CategoriaDespesaEnum.COMBUSTIVEL &&
      despesa.valor > 2000
    ) {
      throw new RegraNegocioException(
        'Despesa de combustível não pode ultrapassar R$ 2.000,00',
      );
    }

    if (
      despesa.categoria === CategoriaDespesaEnum.DIVULGACAO &&
      despesa.valor > 12000
    ) {
      throw new RegraNegocioException(
        'Despesa de divulgação não pode ultrapassar R$ 12.000,00',
      );
    }
  }
}