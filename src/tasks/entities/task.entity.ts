import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'date', nullable: true })
  date_time: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status: string;

  @Column({ type: 'date', nullable: true })
  modified_date_time: Date;
}
