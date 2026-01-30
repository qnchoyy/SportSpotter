import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Match } from './entities/match.entity';
import { MatchStatus } from 'src/common/enums/match-status.enum';

@Injectable()
export class MatchStatusScheduler {
  private readonly logger = new Logger(MatchStatusScheduler.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron('1 * * * *')
  async autoCompleteMatches(): Promise<void> {
    const updateResult = await this.dataSource
      .createQueryBuilder()
      .update(Match)
      .set({ status: MatchStatus.COMPLETED })
      .where('status IN (:...active)', {
        active: [MatchStatus.OPEN, MatchStatus.FULL],
      })
      .andWhere(
        `id IN (
        SELECT b.match_id
        FROM bookings b
        WHERE b.end_at <= NOW()
      )`,
      )
      .execute();

    const completedCount = updateResult.affected ?? 0;

    if (completedCount > 0) {
      this.logger.log(`Auto-completed matches: ${completedCount}`);
    }
  }
}
