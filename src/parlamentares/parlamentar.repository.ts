import { Injectable } from "@nestjs/common";
import { PartidoEnum } from "src/core/enums/partidos.enum";
import { ParlamentarEntity } from "./entities/parlamentar.entity";

@Injectable()
export class ParlamentarRepository {
  private readonly parlamentares = new Map<number, ParlamentarEntity>();
  private nextId = 1;

  save(data: Omit<ParlamentarEntity, 'id'>): ParlamentarEntity {
    const parlamentar: ParlamentarEntity = {
      id: this.nextId++,
      ...data,
    };

    this.parlamentares.set(parlamentar.id, parlamentar);
    return parlamentar;
  }

  findAll(): ParlamentarEntity[] {
    return Array.from(this.parlamentares.values());
  }

  findById(id: number): ParlamentarEntity | null {
    return this.parlamentares.get(id) ?? null;
  }

  update(
    id: number,
    data: Omit<ParlamentarEntity, 'id'>,
  ): ParlamentarEntity | null {
    if (!this.parlamentares.has(id)) {
      return null;
    }

    const parlamentar: ParlamentarEntity = {
      id,
      ...data,
    };

    this.parlamentares.set(id, parlamentar);
    return parlamentar;
  }

  delete(id: number): boolean {
    return this.parlamentares.delete(id);
  }

  findByPartido(partido: PartidoEnum): ParlamentarEntity[] {
    return this.findAll().filter(
      (parlamentar) => parlamentar.partidoAtual === partido,
    );
  }
}