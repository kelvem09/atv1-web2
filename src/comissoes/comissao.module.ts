import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComissaoEntity } from './entities/comissao.entity';
import { ComissaoController } from './comissao.controller';
import { ComissaoService } from './comissao.service';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComissaoEntity], 'main'), AuditModule],
  controllers: [ComissaoController],
  providers: [ComissaoService],
})
export class ComissaoModule {}
