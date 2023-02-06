import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('character varying', { name: 'content', nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.articlesWritten, { eager: true })
  @JoinColumn([{ name: 'author', referencedColumnName: 'id' }])
  author: User | null;
}
