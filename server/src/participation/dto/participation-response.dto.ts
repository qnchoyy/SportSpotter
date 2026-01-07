import { Expose } from 'class-transformer';
import { Team } from 'src/common/enums/team.enum';

export class ParticipationResponseDto {
  @Expose()
  id: string;

  @Expose()
  matchId: string;

  @Expose()
  team: Team;

  @Expose()
  joinedAt: Date;
}
