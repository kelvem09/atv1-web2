import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entidade: string;

  @Column()
  entidadeId: number;

  @Column()
  operacao: string;

  @Column()
  dataHora: string;
}
