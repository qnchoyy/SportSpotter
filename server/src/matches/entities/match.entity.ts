import { MatchStatus } from 'src/common/enums/match-status.enum';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';
import { TennisFormat } from 'src/common/enums/tennis-format.enum';
import { Participation } from 'src/participation/entities/participation.entity';
import { User } from 'src/users/entities/user.entity';
import { Venue } from 'src/venues/entities/venue.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organizer_id', type: 'uuid', nullable: false })
  organizerId: string;

  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizer_id' })
  organizer: User;

  @Column({ type: 'enum', enum: MatchStatus, default: MatchStatus.OPEN })
  status: MatchStatus;

  @Column({ type: 'enum', enum: SportType })
  sport: SportType;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'venue_id', type: 'uuid' })
  venueId: string;

  @ManyToOne(() => Venue, { eager: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ type: 'int', default: 2 })
  numberOfTeams: number;

  @Column({ type: 'int' })
  playersPerTeam: number;

  @Column({ type: 'enum', enum: SkillLevel })
  minSkillLevel: SkillLevel;

  @Column({ type: 'enum', enum: SkillLevel })
  maxSkillLevel: SkillLevel;

  @Column({ type: 'enum', enum: TennisFormat, nullable: true })
  tennisFormat?: TennisFormat;

  @OneToMany(() => Participation, (participation) => participation.match)
  participations: Participation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
