import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, { eager: false })
  @JoinColumn({ name: 'userId' }) // Faz a ligação com a coluna userId
  user: User;
  
  @Column({ nullable: true }) // 📅 Data de execução da tarefa
  dueDate?: Date;

  @Column({ nullable: true }) // 📂 Categoria da tarefa
  category?: string;

  @Column({ default: false }) // 🔔 Se a tarefa tem lembrete ativado
  reminder: boolean;

  @Column({ type: 'text', nullable: true }) // 🔁 Dias da semana armazenados como string ("1,3,5")
  recurrenceDays?: string; // Exemplo armazenado: "1,3,5"
}
