import { Controller, Get, Query } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenueQueryDto } from './dto/venue-query.dto';
import { VenueResponseDto } from './dto/venue-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Get()
  async findAll(@Query() query: VenueQueryDto): Promise<VenueResponseDto[]> {
    const venues = await this.venuesService.findAll(query);

    return plainToInstance(VenueResponseDto, venues, {
      excludeExtraneousValues: true,
    });
  }
}
