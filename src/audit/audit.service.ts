import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog, 'audit')
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  async listarLogs(): Promise<AuditLog[]> {
    return this.auditRepo.find({ order: { id: 'DESC' } });
  }

  async registrarLog(
    entidade: string,
    entidadeId: number,
    operacao: string,
  ): Promise<void> {
    const log = this.auditRepo.create({
      entidade,
      entidadeId,
      operacao,
      dataHora: new Date().toISOString(),
    });
    await this.auditRepo.save(log);
  }
}
