import { Injectable } from '@nestjs/common';
import { ElementsService } from '../../elements/elements.service';
import { ValidateProjectUseCase } from './validate-project.use-case';

@Injectable()
export class GetElementUseCase {
  constructor(
    private elementsService: ElementsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(projectId: string, userId: string, elementId: string) {
    await this.validateProjectUseCase.execute(projectId, userId);

    return this.elementsService.findOne(elementId);
  }
}
