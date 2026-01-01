import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { plainToInstance } from 'class-transformer';
import { MatchQueryDto } from './dto/match-query.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMatch(
    @GetUser() user: User,
    @Body() createMatchDto: CreateMatchDto,
  ): Promise<MatchResponseDto> {
    const match = await this.matchesService.createMatch(user, createMatchDto);
    return plainToInstance(MatchResponseDto, match, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll(@Query() query: MatchQueryDto): Promise<MatchResponseDto[]> {
    const matches = await this.matchesService.findAll(query);
    return plainToInstance(MatchResponseDto, matches, {
      excludeExtraneousValues: true,
    });
  }
}
