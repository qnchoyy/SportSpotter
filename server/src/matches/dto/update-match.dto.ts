import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { MatchStatus } from 'src/common/enums/match-status.enum';
import { SkillLevel } from 'src/common/enums/skill-level.enum';

export class UpdateMatchDto {
  @IsOptional()
  @IsEnum(SkillLevel, {
    message: 'Min skill level must be one of: beginner, intermediate, advanced',
  })
  minSkillLevel?: SkillLevel;

  @IsOptional()
  @IsEnum(SkillLevel, {
    message: 'Max skill level must be one of: beginner, intermediate, advanced',
  })
  maxSkillLevel?: SkillLevel;
}
