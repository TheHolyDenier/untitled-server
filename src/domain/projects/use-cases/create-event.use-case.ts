import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { EventsService } from '../../events/events.service';

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    data: Prisma.EventCreateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    return this.eventsService.create(data, projectId, userId);
  }
}
