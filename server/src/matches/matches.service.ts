import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  private readonly skillLevelOrder: Record<SkillLevel, number> = {
    [SkillLevel.BEGINNER]: 1,
    [SkillLevel.INTERMEDIATE]: 2,
    [SkillLevel.ADVANCED]: 3,
  };

  async createMatch(
    organizer: User,
    createMatchDto: CreateMatchDto,
  ): Promise<Match> {
    const { minSkillLevel, maxSkillLevel } = createMatchDto;

    if (
      this.skillLevelOrder[minSkillLevel] > this.skillLevelOrder[maxSkillLevel]
    ) {
      throw new BadRequestException(
        'minSkillLevel cannot be greater than maxSkillLevel',
      );
    }

    let playersPerTeam: number;

    if (createMatchDto.sport === SportType.FOOTBALL) {
      playersPerTeam = 6;
    } else if (createMatchDto.sport === SportType.TENNIS) {
      playersPerTeam = 1;
    } else {
      throw new BadRequestException('Unsupported sport');
    }

    const { sport, startTime, locationName, locationAddress } = createMatchDto;

    const match = this.matchRepository.create({
      organizer,
      sport,
      startTime: new Date(startTime),
      locationName,
      locationAddress,
      numberOfTeams: 2,
      playersPerTeam,
      minSkillLevel,
      maxSkillLevel,
    });

    return this.matchRepository.save(match);
  }
}
