import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { CreateElementOnElementUseCase } from './create-element-on-element.use-case';

@Injectable()
export class UpdateElementUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
    private readonly createElementOnElementUseCase: CreateElementOnElementUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    elementId: string,
    data: Prisma.ElementUpdateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    if (data.description) {
      await this.createElementOnElementUseCase.execute(
        elementId,
        userId,
        String(data.description),
      );
    }

    return this.elementsService.update(elementId, data, userId);
  }
}
