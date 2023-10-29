import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findOne(projectId: string, userId: string): Promise<Project | null> {
    return this.prisma.project.findFirstOrThrow({
      where: {
        id: projectId,
        OR: [
          { createdById: { equals: userId } },
          { projectOnUser: { some: { userId: userId } } },
        ],
      },
      include: { projectOnUser: true },
    });
  }

  async find(params: Prisma.ProjectFindManyArgs): Promise<Project[]> {
    return this.prisma.project.findMany(params);
  }

  async count(where?: Prisma.ProjectWhereInput): Promise<number> {
    return this.prisma.project.count({
      where,
    });
  }

  async create(
    data: Prisma.ProjectCreateInput,
    userId: string,
  ): Promise<Project> {
    return this.prisma.project.create({
      data: { ...data, createdById: userId, createdAt: new Date() },
    });
  }

  async update(
    projectId: string,
    data: Prisma.ProjectUpdateInput,
    userId: string,
  ): Promise<Project> {
    return this.prisma.project.update({
      data: { ...data, updatedById: userId, updatedAt: new Date() },
      where: { id: projectId },
    });
  }

  async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({
      where,
    });
  }
}
