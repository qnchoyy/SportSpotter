import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './paticipation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { Match } from 'src/matches/entities/match.entity';
import { UserSkillModule } from 'src/user-skill/user-skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participation, Match]), UserSkillModule],
  controllers: [ParticipationController],
  providers: [ParticipationService],
  exports: [ParticipationService],
})
export class ParticipationModule {}
