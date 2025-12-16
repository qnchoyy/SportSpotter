import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';

export class CreateMatchDto {
  @IsEnum(SportType, { message: 'Sport must be one of: football, tennis' })
  sport: SportType;

  @IsDateString()
  startTime: string;

  @IsEnum(SkillLevel, {
    message: 'Min skill level must be one of: beginner, intermediate, advanced',
  })
  minSkillLevel: SkillLevel;

  @IsEnum(SkillLevel, {
    message: 'Max skill level must be one of: beginner, intermediate, advanced',
  })
  maxSkillLevel: SkillLevel;

  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  locationAddress?: string;
}
