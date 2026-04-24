import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriaDespesaEnum } from 'src/core/enums/categoriasDespesas.enum';
import { ParlamentarEntity } from 'src/parlamentares/entities/parlamentar.entity';

@Entity('despesas')
export class DespesaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  descricao: string;

  @Column('decimal', { precision: 12, scale: 2 })
  valor: number;

  @Column()
  categoria: CategoriaDespesaEnum;

  @Column()
  data: string;

  @ManyToOne(() => ParlamentarEntity, (p) => p.despesas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parlamentarId' })
  parlamentar: ParlamentarEntity;
}