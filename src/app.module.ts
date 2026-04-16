import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ParlamentarModule } from './parlamentares/parlamentar.module';
import { DespesaModule } from './despesas/despesas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ParlamentarModule,
    DespesaModule,
  ],
})
export class AppModule {}