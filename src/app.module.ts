import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParlamentarModule } from './parlamentares/parlamentar.module';
import { DespesaModule } from './despesas/despesas.module';

@Module({
  imports: [ParlamentarModule, DespesaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
