import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';
import { MatchQueryDto } from './dto/match-query.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Venue } from 'src/venues/entities/venue.entity';
import { BookingsService } from 'src/bookings/bookings.service';
import { isValidSlotTime, timeToMinutes } from 'src/common/utils/time.util';
import { localTimeToUTC } from 'src/common/utils/timezone.util';

@Injectable()
export class MatchesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    private readonly bookingsService: BookingsService,
  ) {}

  private readonly skillLevelOrder: Record<SkillLevel, number> = {
    [SkillLevel.BEGINNER]: 1,
    [SkillLevel.INTERMEDIATE]: 2,
    [SkillLevel.ADVANCED]: 3,
  };

  async createMatch(organizer: User, dto: CreateMatchDto): Promise<Match> {
    const { minSkillLevel, maxSkillLevel, sport, venueId, date, startTime } =
      dto;

    if (
      this.skillLevelOrder[minSkillLevel] > this.skillLevelOrder[maxSkillLevel]
    ) {
      throw new BadRequestException(
        'minSkillLevel cannot be greater than maxSkillLevel',
      );
    }

    let playersPerTeam: number;
    if (sport === SportType.FOOTBALL) playersPerTeam = 6;
    else if (sport === SportType.TENNIS) playersPerTeam = 1;
    else throw new BadRequestException('Unsupported sport');

    const venue = await this.venueRepository.findOne({
      where: { id: venueId },
    });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    if (venue.sportType !== sport) {
      throw new BadRequestException(
        'Selected venue does not support this sport',
      );
    }

    const open = timeToMinutes(venue.openingTime);
    const close = timeToMinutes(venue.closingTime);
    const startMin = timeToMinutes(startTime);
    const endMin = startMin + venue.slotDurationMinutes;

    if (
      !isValidSlotTime(startTime, venue.openingTime, venue.slotDurationMinutes)
    ) {
      throw new BadRequestException(
        'Start time must be aligned with venue time slots',
      );
    }

    if (startMin < open || endMin > close) {
      throw new BadRequestException(
        'Selected time is outside venue working hours',
      );
    }

    const startAt = localTimeToUTC(date, startTime);
    if (Number.isNaN(startAt.getTime())) {
      throw new BadRequestException('Invalid date/startTime');
    }
    const endAt = new Date(
      startAt.getTime() + venue.slotDurationMinutes * 60_000,
    );

    return this.dataSource.transaction(async (manager) => {
      const matchRepo = manager.getRepository(Match);

      const match = matchRepo.create({
        organizer,
        sport,
        startTime: startAt,
        venueId: venue.id,
        numberOfTeams: 2,
        playersPerTeam,
        minSkillLevel,
        maxSkillLevel,
      });

      const saved = await matchRepo.save(match);

      await this.bookingsService.createBookingForMatch(
        { venueId: venue.id, matchId: saved.id, startAt, endAt },
        manager,
      );

      const result = await matchRepo.findOne({
        where: { id: saved.id },
        relations: ['organizer', 'venue'],
      });

      if (!result) {
        throw new NotFoundException(`Match with ID ${saved.id} not found`);
      }

      return result;
    });
  }

  async findAll(query: MatchQueryDto): Promise<Match[]> {
    const where: FindOptionsWhere<Match> = {};

    if (query.sport) {
      where.sport = query.sport;
    }

    if (query.status) {
      where.status = query.status;
    }

    return await this.matchRepository.find({
      where,
      relations: ['organizer', 'venue'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOneById(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['organizer', 'venue'],
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`);
    }

    return match;
  }

  async updateMatch(
    matchId: string,
    organizer: User,
    updateMatchDto: UpdateMatchDto,
  ): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: ['organizer'],
    });

    if (!match) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }

    if (match.organizer.id !== organizer.id) {
      throw new ForbiddenException('You can only update your own matches');
    }

    const minSkillLevel = updateMatchDto.minSkillLevel ?? match.minSkillLevel;
    const maxSkillLevel = updateMatchDto.maxSkillLevel ?? match.maxSkillLevel;

    if (
      this.skillLevelOrder[minSkillLevel] > this.skillLevelOrder[maxSkillLevel]
    ) {
      throw new BadRequestException(
        'minSkillLevel cannot be greater than maxSkillLevel',
      );
    }

    Object.assign(match, updateMatchDto);

    return await this.matchRepository.save(match);
  }
}
