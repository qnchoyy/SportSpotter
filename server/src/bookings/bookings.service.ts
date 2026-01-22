import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async checkVenueAvailability(
    venueId: string,
    startAt: Date,
    endAt: Date,
  ): Promise<boolean> {
    if (startAt >= endAt) {
      throw new BadRequestException('startAt must be before endAt');
    }

    const overlappingBooking = await this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.venueId = :venueId', { venueId })
      .andWhere('booking.startAt < :endAt', { endAt })
      .andWhere('booking.endAt > :startAt', { startAt })
      .getOne();

    const isAvailable = !overlappingBooking;

    return isAvailable;
  }

  async getBookingsForVenueAndDate(
    venueId: string,
    date: Date,
  ): Promise<Booking[]> {
    // Start of day (00:00:00.000)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    // End of day (23:59:59.999)
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.venueId = :venueId', { venueId })
      .andWhere('booking.startAt < :endOfDay', { endOfDay })
      .andWhere('booking.endAt > :startOfDay', { startOfDay })
      .getMany();
  }

  async createBookingForMatch(params: {
    venueId: string;
    matchId: string;
    startAt: Date;
    endAt: Date;
  }): Promise<Booking> {
    const { venueId, matchId, startAt, endAt } = params;

    const isAvailable = await this.checkVenueAvailability(
      venueId,
      startAt,
      endAt,
    );
    if (!isAvailable) {
      throw new ConflictException(
        'Venue is not available for the selected time slot',
      );
    }

    const booking = this.bookingRepository.create({
      venueId,
      matchId,
      startAt,
      endAt,
    });

    return this.bookingRepository.save(booking);
  }
}
