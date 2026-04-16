import { Injectable } from '@nestjs/common';

import { Parlamentar } from './entities/parlamentar.entity';
import { ParlamentarResponseDto } from './dto/parlamentar-response.dto';
import { ParlamentarCreateDto } from './dto/parlamentar-create.dto';

@Injectable()
export class ParlamentarService {
  private readonly parlamentares: Parlamentar[] = [];
  private nextId = 1;

  create(dto: ParlamentarCreateDto): ParlamentarResponseDto {
    const parlamentar: Parlamentar = { id: this.nextId++, ...dto };
    this.parlamentares.push(parlamentar);
    return new ParlamentarResponseDto(parlamentar);
  }

  findAll(): ParlamentarResponseDto[] {
    return this.parlamentares.map(
      (parlamentar) => new ParlamentarResponseDto(parlamentar),
    );
  }

  findOne(id: number): ParlamentarResponseDto | null {
    const parlamentar = this.parlamentares.find((p) => p.id === id);
    if (!parlamentar) return null;
    return new ParlamentarResponseDto(parlamentar);
  }
}