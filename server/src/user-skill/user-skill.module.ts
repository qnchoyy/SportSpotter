import { Module } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { UserSkillController } from './user-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSportSkill } from './entities/user-sport-skill.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSportSkill, User])],
  providers: [UserSkillService],
  controllers: [UserSkillController],
  exports: [UserSkillService],
})
export class UserSkillModule {}
