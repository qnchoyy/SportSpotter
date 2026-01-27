import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EntityManager, Repository } from 'typeorm';
import { Venue } from 'src/venues/entities/venue.entity';
import {
  getLocalDayBoundsUtc,
  isSlotAlignedLocal,
  utcDateToLocalMinutes,
} from 'src/common/utils/timezone.util';
import { timeToMinutes } from 'src/common/utils/time.util';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
  ) {}

  async getBookingsForVenueAndDate(
    venueId: string,
    dateString: string,
  ): Promise<Booking[]> {
    const { startUtc, endUtc } = getLocalDayBoundsUtc(dateString);

    return this.bookingRepository
      .createQueryBuilder('booking')
      .where('booking.venueId = :venueId', { venueId })
      .andWhere('booking.startAt < :endUtc', { endUtc })
      .andWhere('booking.endAt > :startUtc', { startUtc })
      .getMany();
  }

  async createBookingForMatch(
    params: {
      venueId: string;
      matchId: string;
      startAt: Date;
      endAt: Date;
    },
    manager?: EntityManager,
  ): Promise<Booking> {
    const { venueId, matchId, startAt, endAt } = params;

    const bookingRepo = manager
      ? manager.getRepository(Booking)
      : this.bookingRepository;

    const venueRepo = manager
      ? manager.getRepository(Venue)
      : this.venueRepository;

    const venue = await venueRepo.findOne({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${venueId} not found`);
    }

    if (startAt >= endAt) {
      throw new BadRequestException('startAt must be before endAt');
    }

    const expectedMs = venue.slotDurationMinutes * 60_000;
    if (endAt.getTime() - startAt.getTime() !== expectedMs) {
      throw new BadRequestException(
        `Booking duration must be exactly ${venue.slotDurationMinutes} minutes`,
      );
    }

    const openMin = timeToMinutes(venue.openingTime);
    const closeMin = timeToMinutes(venue.closingTime);

    if (
      !isSlotAlignedLocal(startAt, venue.openingTime, venue.slotDurationMinutes)
    ) {
      throw new BadRequestException(
        'startAt must be aligned to venue slot boundaries',
      );
    }
    if (
      !isSlotAlignedLocal(endAt, venue.openingTime, venue.slotDurationMinutes)
    ) {
      throw new BadRequestException(
        'endAt must be aligned to venue slot boundaries',
      );
    }

    const startMin = utcDateToLocalMinutes(startAt);
    const endMin = utcDateToLocalMinutes(endAt);

    if (startMin < openMin || endMin > closeMin) {
      throw new BadRequestException(
        'Selected time is outside venue working hours',
      );
    }

    const overlappingBooking = await bookingRepo
      .createQueryBuilder('booking')
      .where('booking.venueId = :venueId', { venueId })
      .andWhere('booking.startAt < :endAt', { endAt })
      .andWhere('booking.endAt > :startAt', { startAt })
      .getOne();

    if (overlappingBooking) {
      throw new ConflictException(
        'Venue is not available for the selected time slot',
      );
    }

    const booking = bookingRepo.create({
      venueId,
      matchId,
      startAt,
      endAt,
    });

    return bookingRepo.save(booking);
  }

  async deleteBookingForMatch(
    matchId: string,
    manager?: EntityManager,
  ): Promise<void> {
    const repo = manager
      ? manager.getRepository(Booking)
      : this.bookingRepository;
    await repo.delete({ matchId });
  }
}
