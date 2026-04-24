import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParlamentarEntity } from './entities/parlamentar.entity';
import { ParlamentarController } from './parlamentar.controller';
import { ParlamentarService } from './parlamentar.service';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([ParlamentarEntity], 'main'), AuditModule],
  controllers: [ParlamentarController],
  providers: [ParlamentarService],
  exports: [ParlamentarService],
})
export class ParlamentarModule {}