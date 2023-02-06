import { Article } from 'src/articles/article.entity';
import { Organization } from 'src/organizations/organization.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('character varying', { name: 'email', nullable: false })
  email: string;

  @Column('character varying', { name: 'fname', nullable: false })
  fname: string;

  @Column('character varying', { name: 'lname', nullable: false })
  lname: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: new Date(),
  })
  createdAt: Date | null;

  @OneToMany(() => Organization, (ownedOrgs) => ownedOrgs.owner)
  ownedOrgs: Organization[];

  @OneToMany(() => Article, (articlesWritten) => articlesWritten.author)
  articlesWritten: Article[];
}
