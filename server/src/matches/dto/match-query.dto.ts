import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SportType } from 'src/common/enums/sport-type.enum';
import { MatchStatus } from 'src/common/enums/match-status.enum';
import { Transform, Type } from 'class-transformer';

export class MatchQueryDto {
  @IsOptional()
  @IsEnum(SportType, { message: 'Sport must be one of: football, tennis' })
  sport?: SportType;

  @IsOptional()
  @IsEnum(MatchStatus, {
    message: 'Status must be one of: open, full, cancelled, completed',
  })
  status?: MatchStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'dateFrom must be a valid date' })
  dateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'dateTo must be a valid date' })
  dateTo?: Date;

  @IsOptional()
  @IsString({ message: 'City must be a string' })
  @IsNotEmpty({ message: 'City cannot be empty' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  city?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'availableOnly must be true or false' })
  availableOnly?: boolean;
}
