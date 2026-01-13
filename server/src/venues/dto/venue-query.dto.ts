import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SportType } from 'src/common/enums/sport-type.enum';

export class VenueQueryDto {
  @IsEnum(SportType)
  @IsOptional()
  sportType?: SportType;

  @IsString()
  @IsOptional()
  city?: string;
}
