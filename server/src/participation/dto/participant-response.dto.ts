import { Expose, Type } from 'class-transformer';
import { Team } from 'src/common/enums/team.enum';

class UserInfoDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}

export class ParticipantResponseDto {
  @Expose()
  id: string;

  @Expose()
  team: Team;

  @Expose()
  joinedAt: Date;

  @Expose()
  @Type(() => UserInfoDto)
  user: UserInfoDto;
}
