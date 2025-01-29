import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column() // userId como campo direto para facilitar buscas
  userId: number;
}
