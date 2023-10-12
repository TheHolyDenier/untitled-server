import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { QueryPipeline } from '../../shared/query-pipeline';
import { cloneDeep } from 'lodash';
import { GetElementsUseCase } from './use-cases/get-elements.use-case';
import { GetElementUseCase } from './use-cases/get-element.use-case';
import { UpdateElementUseCase } from './use-cases/update-element.use-case';
import { CreateElementUseCase } from './use-cases/create-element.use-case';
import { GetEventsUseCase } from './use-cases/get-events.use-case';
import { GetEventUseCase } from './use-cases/get-event.use-case';
import { UpdateEventUseCase } from './use-cases/update-event.use-case';
import { CreateEventUseCase } from './use-cases/create-event.use-case';

@UseGuards(AuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(
    private service: ProjectsService,
    // Elements
    private readonly getElementsUseCase: GetElementsUseCase,
    private readonly getElementUseCase: GetElementUseCase,
    private readonly updateElementUseCase: UpdateElementUseCase,
    private readonly createElementUseCase: CreateElementUseCase,
    //Events
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly getEventUseCase: GetEventUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly createEventUseCase: CreateEventUseCase,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getProjects(
    @Query(QueryPipeline) query: Prisma.ProjectFindManyArgs,
    @Query('page') page: number,
    @Request() { user }: { user: Partial<User> },
  ) {
    const request = cloneDeep(query);

    if (!request.include) request.include = {};
    request.include.projectOnUser = true;

    if (!request.where) request.where = {};
    if (!request.where.OR) request.where.OR = [];
    request.where.OR.push({ createdById: { equals: user.id } });
    request.where.OR.push({ projectOnUser: { some: { userId: user.id } } });

    const [data, total] = await Promise.all([
      this.service.find(request),
      this.service.count(request.where),
    ]);

    return {
      data: data,
      page: page,
      total: total,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':projectId/elements')
  async getElements(
    @Param('projectId') projectId: string,
    @Query(QueryPipeline) query: Prisma.ElementFindManyArgs,
    @Query('page') page: number,
    @Request() { user }: { user: Partial<User> },
  ) {
    return this.getElementsUseCase.execute(projectId, query, page, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':projectId/elements/:elementId')
  async getElement(
    @Param('projectId') projectId: string,
    @Param('elementId') elementId: string,
    @Request() { user }: { user: Partial<User> },
    @Query(QueryPipeline) query: Prisma.ElementFindFirstOrThrowArgs,
  ) {
    return this.getElementUseCase.execute(projectId, user.id, elementId, query);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':projectId/elements')
  async createElement(
    @Param('projectId') projectId: string,
    @Request() { user }: { user: Partial<User> },
    @Body() data: Prisma.ElementCreateInput,
  ) {
    return this.createElementUseCase.execute(projectId, user.id, data);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':projectId/elements/:elementId')
  async updateElement(
    @Param('projectId') projectId: string,
    @Param('elementId') elementId: string,
    @Request() { user }: { user: Partial<User> },
    @Body() data: Prisma.ElementUpdateInput,
  ) {
    return this.updateElementUseCase.execute(
      projectId,
      user.id,
      elementId,
      data,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':projectId/events')
  async getEvents(
    @Param('projectId') projectId: string,
    @Query(QueryPipeline) query: Prisma.EventFindManyArgs,
    @Query('page') page: number,
    @Request() { user }: { user: Partial<User> },
  ) {
    return this.getEventsUseCase.execute(projectId, query, page, user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':projectId/events/:eventId')
  async getEvent(
    @Param('projectId') projectId: string,
    @Param('eventId') eventId: string,
    @Request() { user }: { user: Partial<User> },
  ) {
    return this.getEventUseCase.execute(projectId, user.id, eventId);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':projectId/events')
  async createEvent(
    @Param('projectId') projectId: string,
    @Request() { user }: { user: Partial<User> },
    @Body() data: Prisma.EventCreateInput,
  ) {
    return this.createEventUseCase.execute(projectId, user.id, data);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':projectId/events/:eventId')
  async updateEvent(
    @Param('projectId') projectId: string,
    @Param('eventId') eventId: string,
    @Request() { user }: { user: Partial<User> },
    @Body() data: Prisma.EventUpdateInput,
  ) {
    return this.updateEventUseCase.execute(projectId, user.id, eventId, data);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':projectId')
  async getProject(
    @Param('projectId') projectId: string,
    @Request() { user }: { user: Partial<User> },
  ) {
    return this.service.findOne(projectId, user.id!);
  }
}
