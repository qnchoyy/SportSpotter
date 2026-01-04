import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { plainToInstance } from 'class-transformer';
import { MatchQueryDto } from './dto/match-query.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

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

  @Get(':id')
  async findOneById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MatchResponseDto> {
    const match = await this.matchesService.findOneById(id);
    return plainToInstance(MatchResponseDto, match, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMatch(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    @Body() updateMatchDto: UpdateMatchDto,
  ): Promise<MatchResponseDto> {
    const match = await this.matchesService.updateMatch(
      id,
      user,
      updateMatchDto,
    );

    return plainToInstance(MatchResponseDto, match, {
      excludeExtraneousValues: true,
    });
  }
}
