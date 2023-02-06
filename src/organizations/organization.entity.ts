import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => User, (user) => user.ownedOrgs, { eager: true })
  @JoinColumn([{ name: 'owner', referencedColumnName: 'id' }])
  owner: User | null;
}
