import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { UserSkillModule } from './user-skill/user-skill.module';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { ParticipationModule } from './participation/participation.module';
import { VenuesModule } from './venues/venues.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    HealthModule,
    UsersModule,
    UserSkillModule,
    AuthModule,
    MatchesModule,
    ParticipationModule,
    VenuesModule,
    BookingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
