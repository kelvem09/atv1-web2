import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComissaoEntity } from './entities/comissao.entity';
import { ComissaoCreateDto } from './dto/comissao-create.dto';
import { ComissaoUpdateDto } from './dto/comissao-update.dto';
import { ComissaoResponseDto } from './dto/comissao-response.dto';
import { AuditService } from 'src/audit/audit.service';

@Injectable()
export class ComissaoService {
  constructor(
    @InjectRepository(ComissaoEntity, 'main')
    private readonly repo: Repository<ComissaoEntity>,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: ComissaoCreateDto): Promise<ComissaoResponseDto> {
    const comissao = this.repo.create(dto);
    const saved = await this.repo.save(comissao);
    await this.auditService.registrarLog('Comissao', saved.id, 'CREATE');
    return new ComissaoResponseDto(saved);
  }

  async findAll(): Promise<ComissaoResponseDto[]> {
    const list = await this.repo.find({ relations: ['parlamentares'] });
    return list.map((c) => new ComissaoResponseDto(c));
  }

  async findOne(id: number): Promise<ComissaoResponseDto> {
    const comissao = await this.repo.findOne({
      where: { id },
      relations: ['parlamentares'],
    });
    if (!comissao) {
      throw new NotFoundException('Comissão não encontrada');
    }
    return new ComissaoResponseDto(comissao);
  }

  async update(id: number, dto: ComissaoUpdateDto): Promise<ComissaoResponseDto> {
    const comissao = await this.repo.findOneBy({ id });
    if (!comissao) {
      throw new NotFoundException('Comissão não encontrada');
    }
    Object.assign(comissao, dto);
    const saved = await this.repo.save(comissao);
    await this.auditService.registrarLog('Comissao', saved.id, 'UPDATE');
    return new ComissaoResponseDto(saved);
  }

  async remove(id: number): Promise<{ message: string }> {
    const comissao = await this.repo.findOneBy({ id });
    if (!comissao) {
      throw new NotFoundException('Comissão não encontrada');
    }
    const removedId = comissao.id;
    await this.repo.remove(comissao);
    await this.auditService.registrarLog('Comissao', removedId, 'DELETE');
    return { message: 'Comissão removida com sucesso' };
  }
}
