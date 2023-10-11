import { Injectable } from '@nestjs/common';
import { ValidateProjectUseCase } from './validate-project.use-case';
import { EventsService } from '../../events/events.service';

@Injectable()
export class GetEventUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(projectId: string, userId: string, eventId: string) {
    await this.validateProjectUseCase.execute(projectId, userId);

    return this.eventsService.findOne(eventId);
  }
}
