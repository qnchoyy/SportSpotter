import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { VenueQueryDto } from './dto/venue-query.dto';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
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
}
