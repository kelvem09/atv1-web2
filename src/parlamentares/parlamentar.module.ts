import { Module } from '@nestjs/common';
import { ParlamentarController } from './parlamentar.controller';
import { ParlamentarService } from './parlamentar.service';
import { ParlamentarRepository } from './parlamentar.repository';

@Module({
  controllers: [ParlamentarController],
  providers: [ParlamentarRepository, ParlamentarService],
  exports: [ParlamentarRepository, ParlamentarService],
})
export class ParlamentarModule {}