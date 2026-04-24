import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParlamentarEntity } from 'src/parlamentares/entities/parlamentar.entity';

@Entity('comissoes')
export class ComissaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nome: string;

  @Column({ length: 20 })
  sigla: string;

  @Column({ length: 200 })
  tema: string;

  @ManyToMany(() => ParlamentarEntity, (p) => p.comissoes)
  parlamentares: ParlamentarEntity[];
}
