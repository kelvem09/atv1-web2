import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DespesaEntity } from './entities/despesas.entity';
import { ParlamentarEntity } from 'src/parlamentares/entities/parlamentar.entity';
import { AuditLog } from 'src/audit/entities/audit-log.entity';
import { DespesasCreateDto } from './dto/despesas-create.dto';
import { DespesaUpdateDto } from './dto/despesas-update.dto';
import { DespesaResponseDto } from './dto/despesas-response.dto';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';

@Injectable()
export class DespesaService {
  constructor(
    @InjectRepository(DespesaEntity, 'main')
    private readonly despesaRepo: Repository<DespesaEntity>,
    @InjectRepository(ParlamentarEntity, 'main')
    private readonly parlamentarRepo: Repository<ParlamentarEntity>,
    @InjectRepository(AuditLog, 'audit')
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  async create(dto: DespesasCreateDto): Promise<DespesaResponseDto> {
    const parlamentar = await this.parlamentarRepo.findOneBy({ id: dto.parlamentarId });
    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }

    const despesa = this.despesaRepo.create({ ...dto, parlamentar });
    const saved = await this.despesaRepo.save(despesa);
    await this.logAudit(saved.id, 'CREATE');
    return new DespesaResponseDto({ ...saved, parlamentar });
  }

  async findAll(): Promise<DespesaResponseDto[]> {
    const list = await this.despesaRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.parlamentar', 'p')
      .getMany();
    return list.map((d) => new DespesaResponseDto(d));
  }

  async findOne(id: number): Promise<DespesaResponseDto> {
    const despesa = await this.despesaRepo.findOne({
      where: { id },
      relations: ['parlamentar'],
    });
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }
    return new DespesaResponseDto(despesa);
  }

  async findByCategoria(
    categoria: CategoriaDespesaEnum,
  ): Promise<DespesaResponseDto[]> {
    const list = await this.despesaRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.parlamentar', 'p')
      .where('d.categoria = :categoria', { categoria })
      .orderBy('d.valor', 'DESC')
      .getMany();
    return list.map((d) => new DespesaResponseDto(d));
  }

  async sumByParlamentar(): Promise<any[]> {
    return this.despesaRepo.query(`
      SELECT p.nomeParlamentar, p.id as parlamentarId, SUM(d.valor) AS totalDespesas
      FROM despesas d
      JOIN parlamentares p ON d.parlamentarId = p.id
      GROUP BY p.id
    `);
  }

  async update(
    id: number,
    dto: DespesaUpdateDto,
  ): Promise<DespesaResponseDto> {
    const despesa = await this.despesaRepo.findOne({
      where: { id },
      relations: ['parlamentar'],
    });
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }

    if (dto.parlamentarId && dto.parlamentarId !== despesa.parlamentar?.id) {
      const parlamentar = await this.parlamentarRepo.findOneBy({
        id: dto.parlamentarId,
      });
      if (!parlamentar) {
        throw new NotFoundException('Parlamentar não encontrado');
      }
      despesa.parlamentar = parlamentar;
    }

    const { parlamentarId, ...rest } = dto;
    Object.assign(despesa, rest);
    const saved = await this.despesaRepo.save(despesa);
    await this.logAudit(saved.id, 'UPDATE');
    return new DespesaResponseDto(saved);
  }

  async remove(id: number): Promise<{ message: string }> {
    const despesa = await this.despesaRepo.findOneBy({ id });
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }
    const removedId = despesa.id;
    await this.despesaRepo.remove(despesa);
    await this.logAudit(removedId, 'DELETE');
    return { message: 'Despesa removida com sucesso' };
  }

  private async logAudit(entidadeId: number, operacao: string): Promise<void> {
    const log = this.auditRepo.create({
      entidade: 'Despesa',
      entidadeId,
      operacao,
      dataHora: new Date().toISOString(),
    });
    await this.auditRepo.save(log);
  }
}