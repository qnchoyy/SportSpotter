import { IsDateString } from 'class-validator';

export class VenueSlotsQueryDto {
  @IsDateString({}, { message: 'date must be a valid ISO date (YYYY-MM-DD)' })
  date: string;
}
