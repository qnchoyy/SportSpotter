import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participation } from './entities/participation.entity';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async joinMatch(
    userId: string,
    matchId: string,
    team: Team,
  ): Promise<Participation> {
    return this.dataSource.transaction(async (manager) => {
      const matchRepo = manager.getRepository(Match);
      const participationRepo = manager.getRepository(Participation);

      const match = await matchRepo.findOne({
        where: { id: matchId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!match) {
        throw new NotFoundException(`Match with ID ${matchId} not found.`);
      }

      if (match.status !== MatchStatus.OPEN) {
        throw new BadRequestException(
          `Cannot join match with status ${match.status}`,
        );
      }

      const alreadyJoined = await participationRepo.exists({
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

      const currentParticipants = await participationRepo.count({
        where: { matchId },
      });
      const capacity = match.numberOfTeams * match.playersPerTeam;

      if (currentParticipants >= capacity) {
        throw new ConflictException('This match is full');
      }

      const participation = participationRepo.create({ userId, matchId, team });

      let saved: Participation;
      try {
        saved = await participationRepo.save(participation);
      } catch (e: any) {
        if (e?.code === '23505') {
          throw new ConflictException(
            'You are already participating in this match',
          );
        }
        throw e;
      }

      const newCount = currentParticipants + 1;
      const newStatus =
        newCount >= capacity ? MatchStatus.FULL : MatchStatus.OPEN;

      if (match.status !== newStatus) {
        await matchRepo.update({ id: matchId }, { status: newStatus });
      }

      return saved;
    });
  }

  async leaveMatch(userId: string, matchId: string): Promise<void> {
    return this.dataSource.transaction(async (manager) => {
      const matchRepo = manager.getRepository(Match);
      const participationRepo = manager.getRepository(Participation);

      const match = await matchRepo.findOne({
        where: { id: matchId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!match) {
        throw new NotFoundException(`Match with ID ${matchId} not found.`);
      }

      if (
        match.status === MatchStatus.CANCELED ||
        match.status === MatchStatus.COMPLETED
      ) {
        throw new BadRequestException(
          `Cannot leave match with status ${match.status}`,
        );
      }

      const participation = await participationRepo.findOne({
        where: { userId, matchId },
      });

      if (!participation) {
        throw new NotFoundException('You are not participating in this match');
      }

      await participationRepo.delete({ userId, matchId });

      const capacity = match.numberOfTeams * match.playersPerTeam;
      const newCount = await participationRepo.count({ where: { matchId } });

      const newStatus =
        newCount >= capacity ? MatchStatus.FULL : MatchStatus.OPEN;

      if (match.status !== newStatus) {
        await matchRepo.update({ id: matchId }, { status: newStatus });
      }
    });
  }

  async removeParticipant(
    organizerId: string,
    matchId: string,
    participantUserId: string,
  ): Promise<void> {
    return this.dataSource.transaction(async (manager) => {
      const matchRepo = manager.getRepository(Match);
      const participationRepo = manager.getRepository(Participation);

      const match = await matchRepo.findOne({
        where: { id: matchId },
        select: [
          'id',
          'status',
          'organizerId',
          'numberOfTeams',
          'playersPerTeam',
        ],
        lock: { mode: 'pessimistic_write' },
      });

      if (!match) {
        throw new NotFoundException(`Match with ID ${matchId} not found.`);
      }

      if (
        match.status === MatchStatus.CANCELED ||
        match.status === MatchStatus.COMPLETED
      ) {
        throw new BadRequestException(
          `Cannot remove participants from match with status ${match.status}`,
        );
      }

      if (match.organizerId !== organizerId) {
        throw new ForbiddenException(
          'Only the organizer can kick participants',
        );
      }

      if (participantUserId === organizerId) {
        throw new BadRequestException(
          'Organizer cannot remove themselves from the match',
        );
      }

      const participation = await participationRepo.findOne({
        where: { userId: participantUserId, matchId },
      });

      if (!participation) {
        throw new NotFoundException('User is not participating in this match');
      }

      await participationRepo.delete({
        userId: participantUserId,
        matchId,
      });

      const capacity = match.numberOfTeams * match.playersPerTeam;
      const newCount = await participationRepo.count({ where: { matchId } });

      const newStatus =
        newCount >= capacity ? MatchStatus.FULL : MatchStatus.OPEN;

      if (match.status !== newStatus) {
        await matchRepo.update({ id: matchId }, { status: newStatus });
      }
    });
  }

  async getMatchParticipants(matchId: string): Promise<Participation[]> {
    return this.participationRepository.find({
      where: { matchId },
      relations: ['user'],
      order: {
        team: 'ASC',
        joinedAt: 'ASC',
      },
    });
  }
}
