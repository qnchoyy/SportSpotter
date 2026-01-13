import { Exclude, Expose } from 'class-transformer';
import { SportType } from 'src/common/enums/sport-type.enum';

@Exclude()
export class VenueResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  city: string;

  @Expose()
  address: string;

  @Expose()
  sportType: SportType;

  @Expose()
  capacityPlayers: number;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;
}
