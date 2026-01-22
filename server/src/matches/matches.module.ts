import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { ParticipationModule } from 'src/participation/participation.module';
import { BookingsModule } from 'src/bookings/bookings.module';
import { Venue } from 'src/venues/entities/venue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Venue]),
    ParticipationModule,
    BookingsModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
