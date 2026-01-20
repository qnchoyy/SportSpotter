import { Match } from 'src/matches/entities/match.entity';
import { Venue } from 'src/venues/entities/venue.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bookings')
@Index(['venueId', 'startAt', 'endAt'])
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'venue_id', type: 'uuid' })
  venueId: string;

  @ManyToOne(() => Venue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column({ name: 'match_id', type: 'uuid', unique: true })
  matchId: string;

  @OneToOne(() => Match, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ type: 'timestamptz', name: 'start_at' })
  startAt: Date;

  @Column({ type: 'timestamptz', name: 'end_at' })
  endAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
