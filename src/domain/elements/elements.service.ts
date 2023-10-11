import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Element } from '@prisma/client';

@Injectable()
export class ElementsService {
  constructor(private prisma: PrismaService) {}

  async findOne(elementId: string): Promise<Element | null> {
    return this.prisma.element.findFirstOrThrow({
      where: { id: elementId },
    });
  }

  async find(params: Prisma.ElementFindManyArgs): Promise<Element[]> {
    return this.prisma.element.findMany(params);
  }

  async count(where?: Prisma.ElementWhereInput): Promise<number> {
    return this.prisma.element.count({
      where,
    });
  }

  async create(
    data: Prisma.ElementCreateInput,
    projectId: string,
    userId: string,
  ): Promise<Element> {
    return this.prisma.element.create({
      data: Object.assign({}, data, {
        projectId: projectId,
        createdById: userId,
        createdAt: new Date(),
      }) as Prisma.ElementCreateInput,
    });
  }

  async update(
    elementId: string,
    data: Prisma.ElementUpdateInput,
    userId: string,
  ): Promise<Element> {
    return this.prisma.element.update({
      data: { ...data, updatedById: userId, updatedAt: new Date() },
      where: { id: elementId },
    });
  }

  async delete(elementId: string): Promise<Element> {
    return this.prisma.element.delete({
      where: { id: elementId },
    });
  }
}
