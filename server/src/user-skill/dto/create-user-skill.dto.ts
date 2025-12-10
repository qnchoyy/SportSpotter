import { IsEnum, IsNotEmpty } from 'class-validator';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';

export class CreateUserSkillDto {
  @IsEnum(SportType, {
    message: 'Sport must be one of: football, tennis',
  })
  @IsNotEmpty({ message: 'Sport is required' })
  sport: SportType;

  @IsEnum(SkillLevel, {
    message: 'Skill level must be one of: beginner, intermediate, advanced',
  })
  @IsNotEmpty({ message: 'Skill level is required' })
  skillLevel: SkillLevel;
}
