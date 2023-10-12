import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { CreateElementOnElementUseCase } from './create-element-on-element.use-case';

@Injectable()
export class CreateElementUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
    private readonly createElementOnElementUseCase: CreateElementOnElementUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    data: Prisma.ElementCreateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    const element = await this.elementsService.create(data, projectId, userId);

    if (data.description) {
      await this.createElementOnElementUseCase.execute(
        element.id,
        userId,
        String(data.description),
      );
    }
    return element;
  }
}
