export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export const SKILL_LEVEL_ORDER: Record<SkillLevel, number> = {
  [SkillLevel.BEGINNER]: 1,
  [SkillLevel.INTERMEDIATE]: 2,
  [SkillLevel.ADVANCED]: 3,
};
