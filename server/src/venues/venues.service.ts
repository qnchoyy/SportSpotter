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
  dateToMinutes,
  generateSlots,
  minutesToTime,
  overlapsMinutes,
} from 'src/common/utils/time.util';
import { VenueSlotStatus } from 'src/common/enums/venue-slot-status.enum';

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

    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format. Expected YYYY-MM-DD');
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const slots = generateSlots(
      venue.openingTime,
      venue.closingTime,
      venue.slotDurationMinutes,
    );

    const bookings = await this.bookingsService.getBookingsForVenueAndDate(
      venueId,
      date,
    );

    return slots.map((slot) => {
      const isOccupied = bookings.some((booking) => {
        const bookingStartMinutes =
          booking.startAt < startOfDay ? 0 : dateToMinutes(booking.startAt);

        const bookingEndMinutes =
          booking.endAt > endOfDay ? 24 * 60 : dateToMinutes(booking.endAt);

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
