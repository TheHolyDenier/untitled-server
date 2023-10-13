import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { extractIds } from '../../../shared/get-mention-ids';

@Injectable()
export class CreateElementOnEventUseCase {
  constructor(private prismaService: PrismaService) {}

  async execute(eventId: string, userId: string, description: string) {
    await this.prismaService.elementOnEvent.deleteMany({
      where: { eventId: eventId },
    });

    const ids = extractIds(description);

    return this.prismaService.elementOnEvent.createMany({
      data: ids.map((id) => ({
        elementId: id,
        eventId: eventId,
        createdAt: new Date(),
        createdById: userId,
      })),
    });
  }
}
