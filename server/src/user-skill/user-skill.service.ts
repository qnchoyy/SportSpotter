import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSportSkill } from './entities/user-sport-skill.entity';
import { Repository } from 'typeorm';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { User } from 'src/users/entities/user.entity';

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
}
