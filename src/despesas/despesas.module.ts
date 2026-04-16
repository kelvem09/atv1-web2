import { Module } from '@nestjs/common';
import { DESPESA_SERVICE } from 'src/core/tokens/tokens';
import { ParlamentarModule } from 'src/parlamentares/parlamentar.module';
import { ParlamentarRepository } from 'src/parlamentares/parlamentar.repository';
import { DespesaServicePadrao } from './despesa.service.padrao';
import { DespesaServiceRestritiva } from './despesa.service.restritiva';
import { DespesaController } from './despesas.controller';
import { DespesaRepository } from './despesas.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ParlamentarModule],
  controllers: [DespesaController],
  providers: [
    DespesaRepository,
    {
      provide: DESPESA_SERVICE,
      useFactory: (
        despesaRepository: DespesaRepository,
        parlamentarRepository: ParlamentarRepository,
        configService: ConfigService,
      ) => {
        const implementacao =
          configService.get<string>('DESPESA_IMPL') ?? 'restritiva';

        if (implementacao === 'padrao') {
          return new DespesaServicePadrao(
            despesaRepository,
            parlamentarRepository,
          );
        }

        return new DespesaServiceRestritiva(
          despesaRepository,
          parlamentarRepository,
        );
      },
      inject: [DespesaRepository, ParlamentarRepository, ConfigService],
    },
  ],
  exports: [DESPESA_SERVICE],
})
export class DespesaModule {}