import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './paticipation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participation])],
  controllers: [ParticipationController],
  providers: [ParticipationService],
})
export class ParticipationModule {}
