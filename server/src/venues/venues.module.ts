import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venue]), BookingsModule],
  controllers: [VenuesController],
  providers: [VenuesService],
})
export class VenuesModule {}
