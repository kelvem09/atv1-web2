import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PartidoEnum } from 'src/core/enums/partido.enum';
import { DespesaEntity } from 'src/despesas/entities/despesas.entity';
import { ComissaoEntity } from 'src/comissoes/entities/comissao.entity';

@Entity('parlamentares')
export class ParlamentarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nomeCompleto: string;

  @Column({ length: 150 })
  nomeParlamentar: string;

  @Column()
  partidoAtual: PartidoEnum;

  @Column()
  numeroVotos: number;

  @OneToMany(() => DespesaEntity, (d) => d.parlamentar, { cascade: true })
  despesas: DespesaEntity[];

  @ManyToMany(() => ComissaoEntity, (c) => c.parlamentares)
  @JoinTable()
  comissoes: ComissaoEntity[];
}
