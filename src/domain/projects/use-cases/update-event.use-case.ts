import { Injectable } from '@nestjs/common';
import { EventsService } from '../../events/events.service';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { CreateElementOnEventUseCase } from './create-element-on-event.use-case';

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
    private readonly createElementOnEventUseCase: CreateElementOnEventUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    eventId: string,
    data: Prisma.EventUpdateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    if (data.description) {
      this.createElementOnEventUseCase.execute(
        eventId,
        userId,
        String(data.description),
      );
    }

    return this.eventsService.update(eventId, data, userId);
  }
}
