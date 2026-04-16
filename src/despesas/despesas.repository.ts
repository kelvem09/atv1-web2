import { Injectable } from '@nestjs/common';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';
import { DespesaEntity } from './entities/despesas.entity';


@Injectable()
export class DespesaRepository {
  private readonly despesas = new Map<number, DespesaEntity>();
  private nextId = 1;

  save(data: Omit<DespesaEntity, 'id'>): DespesaEntity {
    const despesa: DespesaEntity = {
      id: this.nextId++,
      ...data,
    };

    this.despesas.set(despesa.id, despesa);
    return despesa;
  }

  findAll(): DespesaEntity[] {
    return Array.from(this.despesas.values());
  }

  findById(id: number): DespesaEntity | null {
    return this.despesas.get(id) ?? null;
  }

  update(id: number, data: Omit<DespesaEntity, 'id'>): DespesaEntity | null {
    if (!this.despesas.has(id)) {
      return null;
    }

    const despesa: DespesaEntity = {
      id,
      ...data,
    };

    this.despesas.set(id, despesa);
    return despesa;
  }

  delete(id: number): boolean {
    return this.despesas.delete(id);
  }

  findByCategoria(categoria: CategoriaDespesaEnum): DespesaEntity[] {
    return this.findAll().filter((despesa) => despesa.categoria === categoria);
  }

  findByParlamentarId(parlamentarId: number): DespesaEntity[] {
    return this.findAll().filter(
      (despesa) => despesa.parlamentarId === parlamentarId,
    );
  }
}