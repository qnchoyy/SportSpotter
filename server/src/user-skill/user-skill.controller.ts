import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserSkillService } from './user-skill.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { plainToInstance } from 'class-transformer';
import { UserSkillResponseDto } from './dto/user-skill-response.dto';

@Controller('user-skill')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMySkill(
    @GetUser() user: User,
    @Body() createUserSkillDto: CreateUserSkillDto,
  ): Promise<UserSkillResponseDto> {
    const skill = await this.userSkillService.createSkill(
      user,
      createUserSkillDto,
    );

    return plainToInstance(UserSkillResponseDto, skill);
  }
}
