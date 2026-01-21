import { SportType } from 'src/common/enums/sport-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: SportType })
  sportType: SportType;

  @Column({ type: 'int' })
  capacityPlayers: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ type: 'time', default: '11:00' })
  openingTime: string;

  @Column({ type: 'time', default: '20:00' })
  closingTime: string;

  @Column({ type: 'int', default: 60 })
  slotDurationMinutes: number;
}
