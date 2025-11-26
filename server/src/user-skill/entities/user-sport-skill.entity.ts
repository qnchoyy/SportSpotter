import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_sport_skills')
@Unique(['user', 'sport'])
export class UserSportSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.skills, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user: User;

  @Column({ type: 'enum', enum: SportType })
  sport: SportType;

  @Column({ type: 'enum', enum: SkillLevel })
  skillLevel: SkillLevel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
