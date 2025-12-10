import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserSkillService } from './user-skill.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { plainToInstance } from 'class-transformer';
import { UserSkillResponseDto } from './dto/user-skill-response.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';

@Controller('user-skills')
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMySkills(@GetUser() user: User): Promise<UserSkillResponseDto[]> {
    const skills = await this.userSkillService.getSkillsForUser(user.id);

    return plainToInstance(UserSkillResponseDto, skills);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMySkill(
    @GetUser() user: User,
    @Param('id') skillId: string,
    @Body() updateUserSkilDto: UpdateUserSkillDto,
  ): Promise<UserSkillResponseDto> {
    const skill = await this.userSkillService.updateSkill(
      skillId,
      user.id,
      updateUserSkilDto,
    );

    return plainToInstance(UserSkillResponseDto, skill);
  }
}
