import { IsEnum, IsNotEmpty } from 'class-validator';
import { SkillLevel } from 'src/common/enums/skill-level.enum';

export class UpdateUserSkillDto {
  @IsEnum(SkillLevel, {
    message: 'Skill level must be one of: beginner, intermediate, advanced',
  })
  @IsNotEmpty({ message: 'Skill level is required' })
  skillLevel: SkillLevel;
}
