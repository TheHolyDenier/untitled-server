import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { EventsService } from '../../events/events.service';
import { CreateElementOnEventUseCase } from './create-element-on-event.use-case';

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
    private readonly createElementOnEventUseCase: CreateElementOnEventUseCase,
  ) {}

  async execute(
    projectId: string,
    userId: string,
    data: Prisma.EventCreateInput,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    const event = await this.eventsService.create(data, projectId, userId);

    if (data.description) {
      this.createElementOnEventUseCase.execute(
        event.id,
        userId,
        String(data.description),
      );
    }

    return event;
  }
}
