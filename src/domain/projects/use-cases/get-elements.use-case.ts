import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { cloneDeep } from 'lodash';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';

@Injectable()
export class GetElementsUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    query: Prisma.ElementFindManyArgs,
    page: number,
    userId: string,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    const request = cloneDeep(query);

    if (!request.where) request.where = {};
    request.where.projectId = projectId;

    const [data, total] = await Promise.all([
      this.elementsService.find(request),
      this.elementsService.count(request.where),
    ]);

    return {
      data: data,
      page: page,
      total: total,
    };
  }
}
