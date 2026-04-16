import { Module } from '@nestjs/common';
import { DespesaController } from './despesas.controller';
import { DespesaService } from './despesas.service';


@Module({
  controllers: [DespesaController],
  providers: [DespesaService],
  exports: [DespesaService],
})
export class DespesaModule {}