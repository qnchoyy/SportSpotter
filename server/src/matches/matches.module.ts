import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { ParticipationModule } from 'src/participation/participation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), ParticipationModule],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
