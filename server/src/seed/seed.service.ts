import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Venue } from 'src/venues/entities/venue.entity';
import { venuesData } from './data/venues.data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
  ) {}

  async seedVenues(): Promise<void> {
    this.logger.log('Seed venues started');

    let inserted = 0;
    let skipped = 0;

    for (const venueData of venuesData) {
      const existing = await this.venueRepository.findOne({
        where: {
          name: venueData.name,
          city: venueData.city,
          address: venueData.address,
        },
      });

      if (existing) {
        skipped++;
        continue;
      }

      const venue = this.venueRepository.create(venueData);
      await this.venueRepository.save(venue);

      inserted++;
    }

    this.logger.log(
      `Seed venues finished. Total: ${venuesData.length}, Inserted: ${inserted}, Skipped: ${skipped}`,
    );
  }
}
