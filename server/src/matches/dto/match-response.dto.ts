import { Exclude, Expose, Type } from 'class-transformer';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';
import { MatchStatus } from 'src/common/enums/match-status.enum';
import { OrganizerResponseDto } from './organizer-response.dto';
import { VenueResponseDto } from 'src/venues/dto/venue-response.dto';
import { TennisFormat } from 'src/common/enums/tennis-format.enum';

@Exclude()
export class MatchResponseDto {
  @Expose()
  id: string;

  @Expose()
  sport: SportType;

  @Expose()
  status: MatchStatus;

  @Expose()
  startTime: Date;

  @Expose()
  @Type(() => VenueResponseDto)
  venue: VenueResponseDto;

  @Expose()
  numberOfTeams: number;

  @Expose()
  playersPerTeam: number;

  @Expose()
  minSkillLevel: SkillLevel;

  @Expose()
  maxSkillLevel: SkillLevel;

  @Expose()
  tennisFormat?: TennisFormat;

  @Expose()
  @Type(() => OrganizerResponseDto)
  organizer: OrganizerResponseDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
