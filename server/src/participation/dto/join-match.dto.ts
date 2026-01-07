import { IsEnum } from 'class-validator';
import { Team } from 'src/common/enums/team.enum';

export class JoinMatchDto {
  @IsEnum(Team, { message: 'Team must be either 1 or 2' })
  team: Team;
}
