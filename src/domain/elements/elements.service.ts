import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Element } from '@prisma/client';

@Injectable()
export class ElementsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    elementUniqueInput: Prisma.ElementWhereUniqueInput,
  ): Promise<Element | null> {
    return this.prisma.element.findUnique({
      where: elementUniqueInput,
    });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ElementWhereUniqueInput;
    where?: Prisma.ElementWhereInput;
    orderBy?: Prisma.ElementOrderByWithRelationInput;
  }): Promise<Element[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.element.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ElementCreateInput): Promise<Element> {
    return this.prisma.element.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ElementWhereUniqueInput;
    data: Prisma.ElementUpdateInput;
  }): Promise<Element> {
    const { where, data } = params;
    return this.prisma.element.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ElementWhereUniqueInput): Promise<Element> {
    return this.prisma.element.delete({
      where,
    });
  }
}
