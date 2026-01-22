import {
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';

export class CreateMatchDto {
  @IsEnum(SportType, { message: 'Sport must be one of: football, tennis' })
  sport: SportType;

  @IsUUID()
  venueId: string;

  @IsDateString({}, { message: 'date must be a valid ISO date (YYYY-MM-DD)' })
  date: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'startTime must be in HH:mm format' })
  startTime: string;

  @IsEnum(SkillLevel, {
    message: 'Min skill level must be one of: beginner, intermediate, advanced',
  })
  minSkillLevel: SkillLevel;

  @IsEnum(SkillLevel, {
    message: 'Max skill level must be one of: beginner, intermediate, advanced',
  })
  maxSkillLevel: SkillLevel;
}
