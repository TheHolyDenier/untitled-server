import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { EventsService } from './events.service';

@Module({
  providers: [EventsService, PrismaService],
  exports: [EventsService],
})
export class EventsModule {}
