import { IsEnum, IsOptional } from 'class-validator';
import { SportType } from 'src/common/enums/sport-type.enum';
import { MatchStatus } from 'src/common/enums/match-status.enum';

export class MatchQueryDto {
  @IsOptional()
  @IsEnum(SportType, { message: 'Sport must be one of: football, tennis' })
  sport?: SportType;

  @IsOptional()
  @IsEnum(MatchStatus, {
    message: 'Status must be one of: open, full, cancelled, completed',
  })
  status?: MatchStatus;
}
