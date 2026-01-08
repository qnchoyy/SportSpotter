import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { Repository } from 'typeorm';
import { Match } from 'src/matches/entities/match.entity';
import { UserSkillService } from 'src/user-skill/user-skill.service';
import { Team } from 'src/common/enums/team.enum';
import { MatchStatus } from 'src/common/enums/match-status.enum';

@Injectable()
export class ParticipationService {
  constructor(
    @InjectRepository(Participation)
    private readonly participationRepository: Repository<Participation>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    private readonly userSkillService: UserSkillService,
  ) {}

  async joinMatch(
    userId: string,
    matchId: string,
    team: Team,
  ): Promise<Participation> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found. `);
    }

    if (match.status !== MatchStatus.OPEN) {
      throw new BadRequestException(
        `Cannot join match with status ${match.status}`,
      );
    }

    const alreadyJoined = await this.participationRepository.exists({
      where: { userId, matchId },
    });

    if (alreadyJoined) {
      throw new ConflictException(
        'You are already participating in this match',
      );
    }

    const meetsSkillRequirements =
      await this.userSkillService.meetsSkillRequirements(
        userId,
        match.sport,
        match.minSkillLevel,
        match.maxSkillLevel,
      );

    if (!meetsSkillRequirements) {
      throw new ForbiddenException(
        'Your skill level does not meet the match requirements',
      );
    }

    const capacity = match.numberOfTeams * match.playersPerTeam;

    const currentParticipants = await this.participationRepository.count({
      where: { matchId },
    });

    if (currentParticipants >= capacity) {
      throw new ConflictException('This match is full');
    }

    const participation = this.participationRepository.create({
      userId,
      matchId,
      team,
    });

    try {
      return await this.participationRepository.save(participation);
    } catch (e: any) {
      if (e?.code === '23505') {
        throw new ConflictException(
          'You are already participating in this match',
        );
      }
      throw e;
    }
  }

  async leaveMatch(userId: string, matchId: string): Promise<void> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found.`);
    }

    if (match.status !== MatchStatus.OPEN) {
      throw new BadRequestException(
        `Cannot leave match with status ${match.status}`,
      );
    }

    const participation = await this.participationRepository.findOne({
      where: { userId, matchId },
    });

    if (!participation) {
      throw new NotFoundException('You are not participating in this match');
    }

    await this.participationRepository.delete({ userId, matchId });
  }
}
