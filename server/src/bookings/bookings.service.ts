import { BadRequestException, Injectable } from '@nestjs/common';
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
}
