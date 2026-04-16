import { Injectable, NotFoundException } from "@nestjs/common";
import { PartidoEnum } from "src/core/enums/partidos.enum";
import { ParlamentarCreateDto } from "./dto/parlamentar-create.dto";
import { ParlamentarResponseDto } from "./dto/parlamentar-response.dto";
import { ParlamentarUpdateDto } from "./dto/parlamentar-update.dto";
import { ParlamentarRepository } from "./parlamentar.repository";


@Injectable()
export class ParlamentarService {
  constructor(private readonly parlamentarRepository: ParlamentarRepository) {}

  create(dto: ParlamentarCreateDto): ParlamentarResponseDto {
    const parlamentar = this.parlamentarRepository.save(dto);
    return new ParlamentarResponseDto(parlamentar);
  }

  findAll(): ParlamentarResponseDto[] {
    return this.parlamentarRepository
      .findAll()
      .map((parlamentar) => new ParlamentarResponseDto(parlamentar));
  }

  findOne(id: number): ParlamentarResponseDto {
    const parlamentar = this.parlamentarRepository.findById(id);

    if (!parlamentar) {
      throw new NotFoundException('Parlamentar não encontrado');
    }

    return new ParlamentarResponseDto(parlamentar);
  }

  findByPartido(partido: PartidoEnum): ParlamentarResponseDto[] {
    return this.parlamentarRepository
      .findByPartido(partido)
      .map((parlamentar) => new ParlamentarResponseDto(parlamentar));
  }

  update(id: number, dto: ParlamentarUpdateDto): ParlamentarResponseDto {
    const atual = this.parlamentarRepository.findById(id);

    if (!atual) {
      throw new NotFoundException('Parlamentar não encontrado');
    }

    const atualizado = this.parlamentarRepository.update(id, {
      nomeCompleto: dto.nomeCompleto ?? atual.nomeCompleto,
      nomeParlamentar: dto.nomeParlamentar ?? atual.nomeParlamentar,
      partidoAtual: dto.partidoAtual ?? atual.partidoAtual,
      numeroVotos: dto.numeroVotos ?? atual.numeroVotos,
    });

    return new ParlamentarResponseDto(atualizado!);
  }

  remove(id: number): void {
    const deleted = this.parlamentarRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Parlamentar não encontrado');
    }
  }
}