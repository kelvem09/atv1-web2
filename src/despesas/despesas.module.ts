import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaEntity } from './entities/despesas.entity';
import { ParlamentarEntity } from 'src/parlamentares/entities/parlamentar.entity';
import { AuditLog } from 'src/audit/entities/audit-log.entity';
import { DespesaController } from './despesas.controller';
import { DespesaService } from './despesas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DespesaEntity, ParlamentarEntity], 'main'),
    TypeOrmModule.forFeature([AuditLog], 'audit'),
  ],
  controllers: [DespesaController],
  providers: [DespesaService],
})
export class DespesaModule {}