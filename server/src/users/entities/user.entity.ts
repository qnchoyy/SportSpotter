import { Exclude } from 'class-transformer';
import { Participation } from 'src/participation/entities/participation.entity';
import { UserSportSkill } from 'src/user-skill/entities/user-sport-skill.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => UserSportSkill, (userSportSkill) => userSportSkill.user)
  skills: UserSportSkill[];

  @OneToMany(() => Participation, (participation) => participation.user)
  participations: Participation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
