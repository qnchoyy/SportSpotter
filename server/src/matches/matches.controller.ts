import {
  Body,
  Controller,
  Delete,
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
import { ParticipationService } from 'src/participation/participation.service';
import { JoinMatchDto } from 'src/participation/dto/join-match.dto';
import { ParticipationResponseDto } from 'src/participation/dto/participation-response.dto';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly participationService: ParticipationService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @Post(':matchId/join')
  async joinMatch(
    @Param('matchId', ParseUUIDPipe) matchId: string,
    @Body() joinMatchDto: JoinMatchDto,
    @GetUser() user: User,
  ): Promise<ParticipationResponseDto> {
    const participation = await this.participationService.joinMatch(
      user.id,
      matchId,
      joinMatchDto.team,
    );

    return plainToInstance(ParticipationResponseDto, participation, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':matchId/leave')
  async leaveMatch(
    @Param('matchId', ParseUUIDPipe) matchId: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.participationService.leaveMatch(user.id, matchId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':matchId/participants/:userId')
  async removeParticipant(
    @Param('matchId', ParseUUIDPipe) matchId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.participationService.removeParticipant(user.id, matchId, userId);
  }
}
