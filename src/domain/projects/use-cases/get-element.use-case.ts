import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { Prisma } from '@prisma/client';

@Injectable()
export class GetElementUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    elementId: string,
    query: Prisma.ElementFindFirstOrThrowArgs,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    if (!query.where) query.where = {};
    query.where.id = elementId;

    return this.elementsService.findOne(query);
  }
}
