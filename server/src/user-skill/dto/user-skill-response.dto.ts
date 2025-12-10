import { Exclude, Expose } from 'class-transformer';
import { SkillLevel } from 'src/common/enums/skill-level.enum';
import { SportType } from 'src/common/enums/sport-type.enum';

@Exclude()
export class UserSkillResponseDto {
  @Expose()
  id: string;

  @Expose()
  sport: SportType;

  @Expose()
  skillLevel: SkillLevel;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
