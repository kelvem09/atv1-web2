import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParlamentarEntity } from './parlamentares/entities/parlamentar.entity';
import { DespesaEntity } from './despesas/entities/despesas.entity';
import { ComissaoEntity } from './comissoes/entities/comissao.entity';
import { AuditLog } from './audit/entities/audit-log.entity';
import { ParlamentarModule } from './parlamentares/parlamentar.module';
import { DespesaModule } from './despesas/despesas.module';
import { ComissaoModule } from './comissoes/comissao.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'main',
      type: 'sqlite',
      database: ':memory:',
      entities: [ParlamentarEntity, DespesaEntity, ComissaoEntity],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'audit',
      type: 'sqlite',
      database: ':memory:',
      entities: [AuditLog],
      synchronize: true,
    }),
    ParlamentarModule,
    DespesaModule,
    ComissaoModule,
    AuditModule,
  ],
})
export class AppModule {}