import { Injectable } from '@nestjs/common';
import { EventsService } from '../../events/events.service';
import { cloneDeep } from 'lodash';
import { Prisma } from '@prisma/client';
import { ValidateProjectUseCase } from './validate-project.use-case';

@Injectable()
export class GetEventsUseCase {
  constructor(
    private eventsService: EventsService,
    private readonly validateProjectUseCase: ValidateProjectUseCase,
  ) {}

  async execute(
    projectId: string,
    query: Prisma.EventFindManyArgs,
    page: number,
    userId: string,
  ) {
    await this.validateProjectUseCase.execute(projectId, userId);

    const request = cloneDeep(query);

    if (!request.where) request.where = {};
    request.where.projectId = projectId;

    const [data, total] = await Promise.all([
      this.eventsService.find(request),
      this.eventsService.count(request.where),
    ]);

    return {
      data: data,
      page: page,
      total: total,
    };
  }
}
