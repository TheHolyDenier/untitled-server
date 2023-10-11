import { Injectable } from '@nestjs/common';
import { EventsService } from '../../events/events.service';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    eventId: string,
    data: Prisma.EventUpdateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    return this.eventsService.update(eventId, data, userId);
  }
}
