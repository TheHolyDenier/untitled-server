import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { extractIds } from '../../../shared/get-mention-ids';

@Injectable()
export class CreateElementOnElementUseCase {
  constructor(private prismaService: PrismaService) {}

  async execute(elementId: string, userId: string, description: string) {
    await this.prismaService.elementOnElement.deleteMany({
      where: { elementId: elementId },
    });

    const ids = extractIds(description);

    return this.prismaService.elementOnElement.createMany({
      data: ids.map((id) => ({
        elementId: elementId,
        relatesToElementId: id,
        createdAt: new Date(),
        createdById: userId,
      })),
    });
  }
}
