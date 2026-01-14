import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  try {
    const seedService = app.get(SeedService);
    await seedService.seedVenues();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

bootstrap();
