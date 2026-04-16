import { Module } from '@nestjs/common';

import { ParlamentarController } from './parlamentar.controller';
import { ParlamentarService } from './parlamentar.service';

@Module({
  controllers: [ParlamentarController],
  providers: [ParlamentarService],
})
export class ParlamentarModule {}
