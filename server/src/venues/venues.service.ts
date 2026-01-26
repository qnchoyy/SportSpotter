import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { VenueQueryDto } from './dto/venue-query.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { VenueSlotResponseDto } from './dto/venue-slot-response.dto';
import {
  generateSlots,
  minutesToTime,
  overlapsMinutes,
} from 'src/common/utils/time.util';
import { VenueSlotStatus } from 'src/common/enums/venue-slot-status.enum';
import { utcDateToLocalMinutes } from 'src/common/utils/timezone.util';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    private readonly bookingsService: BookingsService,
  ) {}

  async findAll(query: VenueQueryDto): Promise<Venue[]> {
    const where: FindOptionsWhere<Venue> = {};

    if (query.city) {
      where.city = query.city;
    }

    if (query.sportType) {
      where.sportType = query.sportType;
    }

    return await this.venueRepository.find({
      where,
      order: {
        name: 'ASC',
      },
    });
  }

  async findOneById(id: string): Promise<Venue> {
    const venue = await this.venueRepository.findOne({
      where: { id },
    });

    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    return venue;
  }

  async getVenueSlots(
    venueId: string,
    dateString: string,
  ): Promise<VenueSlotResponseDto[]> {
    const venue = await this.findOneById(venueId);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      throw new BadRequestException('Invalid date format. Expected YYYY-MM-DD');
    }

    const slots = generateSlots(
      venue.openingTime,
      venue.closingTime,
      venue.slotDurationMinutes,
    );

    const bookings = await this.bookingsService.getBookingsForVenueAndDate(
      venueId,
      dateString,
    );

    return slots.map((slot) => {
      const isOccupied = bookings.some((booking) => {
        const bookingStartMinutes = utcDateToLocalMinutes(booking.startAt);
        const bookingEndMinutes = utcDateToLocalMinutes(booking.endAt);

        return overlapsMinutes(slot, bookingStartMinutes, bookingEndMinutes);
      });

      return {
        startTime: minutesToTime(slot.startMinutes),
        endTime: minutesToTime(slot.endMinutes),
        status: isOccupied ? VenueSlotStatus.OCCUPIED : VenueSlotStatus.FREE,
      };
    });
  }
}
