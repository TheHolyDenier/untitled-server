import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { JSDOM } from 'jsdom';

@Injectable()
export class CreateElementOnElementUseCase {
  constructor(private prismaService: PrismaService) {}

  async execute(elementId: string, userId: string, description: string) {
    await this.prismaService.elementOnElement.deleteMany({
      where: { elementId: elementId },
    });

    const ids = this.extractIds(description);

    return this.prismaService.elementOnElement.createMany({
      data: ids.map((id) => ({
        elementId: elementId,
        relatesToElementId: id,
        createdAt: new Date(),
        createdById: userId,
      })),
    });
  }

  private extractIds(htmlString: string) {
    const dom = new JSDOM(htmlString);
    const mentions = dom.window.document.querySelectorAll(
      '[data-type="mention"]',
    );

    const ids: string[] = [];
    for (const mention of mentions) {
      const id = mention.getAttribute('data-id');
      if (id && !ids.includes(id)) ids.push(id);
    }

    return ids;
  }
}
