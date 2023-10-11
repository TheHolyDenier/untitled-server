import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';

@Injectable()
export class CreateElementUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    data: Prisma.ElementCreateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    return this.elementsService.create(data, projectId, userId);
  }
}
