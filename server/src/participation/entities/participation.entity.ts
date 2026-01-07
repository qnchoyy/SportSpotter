import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Match } from '../../matches/entities/match.entity';
import { Team } from 'src/common/enums/team.enum';

@Entity('match_participations')
@Unique(['userId', 'matchId'])
export class Participation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'match_id' })
  matchId: string;

  @ManyToOne(() => Match, (match) => match.participations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ type: 'enum', enum: Team })
  team: Team;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
