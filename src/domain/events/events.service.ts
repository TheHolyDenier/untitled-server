import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Event } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findOne(eventId: string): Promise<Event | null> {
    return this.prisma.event.findUnique({
      where: { id: eventId },
    });
  }

  async find(params: Prisma.EventFindManyArgs): Promise<Event[]> {
    return this.prisma.event.findMany(params);
  }

  async count(where?: Prisma.EventWhereInput): Promise<number> {
    return this.prisma.event.count({
      where,
    });
  }

  async create(
    data: Prisma.EventCreateInput,
    projectId: string,
    userId: string,
  ): Promise<Event> {
    return this.prisma.event.create({
      data: Object.assign({}, data, {
        projectId: projectId,
        createdById: userId,
        createdAt: new Date(),
      }) as Prisma.EventCreateInput,
    });
  }

  async update(
    eventId: string,
    data: Prisma.EventUpdateInput,
    userId: string,
  ): Promise<Event> {
    return this.prisma.event.update({
      data: { ...data, updatedById: userId, updatedAt: new Date() },
      where: { id: eventId },
    });
  }

  async delete(eventId: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { id: eventId },
    });
  }
}
