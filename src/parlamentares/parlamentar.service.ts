import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParlamentarEntity } from './entities/parlamentar.entity';
import { ParlamentarCreateDto } from './dto/parlamentar-create.dto';
import { ParlamentarUpdateDto } from './dto/parlamentar-update.dto';
import { ParlamentarResponseDto } from './dto/parlamentar-response.dto';
import { AuditService } from 'src/audit/audit.service';

@Injectable()
export class ParlamentarService {
  constructor(
    @InjectRepository(ParlamentarEntity, 'main')
    private readonly repo: Repository<ParlamentarEntity>,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: ParlamentarCreateDto): Promise<ParlamentarResponseDto> {
    const parlamentar = this.repo.create(dto);
    const saved = await this.repo.save(parlamentar);
    await this.auditService.registrarLog('Parlamentar', saved.id, 'CREATE');
    return new ParlamentarResponseDto(saved);
  }

  async findAll(): Promise<ParlamentarResponseDto[]> {
    const list = await this.repo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.comissoes', 'c')
      .getMany();
    return list.map((p) => new ParlamentarResponseDto(p));
  }

  async findOne(id: number): Promise<ParlamentarResponseDto> {
    const parlamentar = await this.repo.findOne({
      where: { id },
      relations: ['comissoes'],
    });
    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }
    return new ParlamentarResponseDto(parlamentar);
  }

  async update(
    id: number,
    dto: ParlamentarUpdateDto,
  ): Promise<ParlamentarResponseDto> {
    const parlamentar = await this.repo.findOneBy({ id });
    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }
    Object.assign(parlamentar, dto);
    const saved = await this.repo.save(parlamentar);
    await this.auditService.registrarLog('Parlamentar', saved.id, 'UPDATE');
    return new ParlamentarResponseDto(saved);
  }

  async remove(id: number): Promise<{ message: string }> {
    const parlamentar = await this.repo.findOneBy({ id });
    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }
    const removedId = parlamentar.id;
    await this.repo.remove(parlamentar);
    await this.auditService.registrarLog('Parlamentar', removedId, 'DELETE');
    return { message: 'Parlamentar removido com sucesso' };
  }
}