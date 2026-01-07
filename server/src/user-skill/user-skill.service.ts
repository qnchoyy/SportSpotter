import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSportSkill } from './entities/user-sport-skill.entity';
import { Repository } from 'typeorm';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { SportType } from 'src/common/enums/sport-type.enum';
import {
  SKILL_LEVEL_ORDER,
  SkillLevel,
} from 'src/common/enums/skill-level.enum';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectRepository(UserSportSkill)
    private readonly userSportSkillRepository: Repository<UserSportSkill>,
  ) {}

  async createSkill(
    user: User,
    createUserSkillDto: CreateUserSkillDto,
  ): Promise<UserSportSkill> {
    const existingSkill = await this.userSportSkillRepository.findOne({
      where: {
        user: { id: user.id },
        sport: createUserSkillDto.sport,
      },
    });
    if (existingSkill) {
      throw new ConflictException(
        `You already have a skill for ${createUserSkillDto.sport}`,
      );
    }

    const newSkill = this.userSportSkillRepository.create({
      user: user,
      sport: createUserSkillDto.sport,
      skillLevel: createUserSkillDto.skillLevel,
    });

    return await this.userSportSkillRepository.save(newSkill);
  }

  async getSkillsForUser(userId: string): Promise<UserSportSkill[]> {
    return this.userSportSkillRepository.find({
      where: { user: { id: userId } },
    });
  }

  async updateSkill(
    skillId: string,
    userId: string,
    updateUserSkillDto: UpdateUserSkillDto,
  ): Promise<UserSportSkill> {
    const skill = await this.userSportSkillRepository.findOne({
      where: { id: skillId },
      relations: ['user'],
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    if (skill.user.id !== userId) {
      throw new ForbiddenException('You can only update your own skills');
    }

    skill.skillLevel = updateUserSkillDto.skillLevel;

    return await this.userSportSkillRepository.save(skill);
  }

  async meetSkillRequirements(
    userId: string,
    sport: SportType,
    minSkillLevel: SkillLevel,
    maxSkillLevel: SkillLevel,
  ): Promise<boolean> {
    const userSkill = await this.userSportSkillRepository.findOne({
      where: {
        user: { id: userId },
        sport: sport,
      },
    });
    if (!userSkill) {
      return false;
    }

    const userLevel = SKILL_LEVEL_ORDER[userSkill.skillLevel];
    const minLevel = SKILL_LEVEL_ORDER[minSkillLevel];
    const maxLevel = SKILL_LEVEL_ORDER[maxSkillLevel];

    return userLevel >= minLevel && userLevel <= maxLevel;
  }
}
