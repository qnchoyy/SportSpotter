import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenueQueryDto } from './dto/venue-query.dto';
import { VenueResponseDto } from './dto/venue-response.dto';
import { plainToInstance } from 'class-transformer';
import { VenueSlotsQueryDto } from './dto/venue-slots-query.dto';
import { VenueSlotResponseDto } from './dto/venue-slot-response.dto';

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

  @Get(':id/slots')
  getVenueSlots(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: VenueSlotsQueryDto,
  ): Promise<VenueSlotResponseDto[]> {
    return this.venuesService.getVenueSlots(id, query.date);
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<VenueResponseDto> {
    const venue = await this.venuesService.findOneById(id);

    return plainToInstance(VenueResponseDto, venue, {
      excludeExtraneousValues: true,
    });
  }
}
