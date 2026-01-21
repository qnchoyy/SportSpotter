import { Expose } from 'class-transformer';
import { VenueSlotStatus } from 'src/common/enums/venue-slot-status.enum';

export class VenueSlotResponseDto {
  @Expose()
  startTime: string;

  @Expose()
  endTime: string;

  @Expose()
  status: VenueSlotStatus;
}
