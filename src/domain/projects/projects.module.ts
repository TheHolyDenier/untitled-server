import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../../prisma.service';
import { ElementsService } from '../elements/elements.service';
import { GetElementsUseCase } from './use-cases/get-elements.use-case';
import { GetElementUseCase } from './use-cases/get-element.use-case';
import { ValidateProjectUseCase } from './use-cases/validate-project.use-case';
import { UpdateElementUseCase } from './use-cases/update-element.use-case';
import { CreateElementUseCase } from './use-cases/create-element.use-case';
import { GetEventsUseCase } from './use-cases/get-events.use-case';
import { GetEventUseCase } from './use-cases/get-event.use-case';
import { UpdateEventUseCase } from './use-cases/update-event.use-case';
import { CreateEventUseCase } from './use-cases/create-event.use-case';
import { EventsService } from '../events/events.service';
import { CreateElementOnElementUseCase } from './use-cases/create-element-on-element.use-case';
import { CreateElementOnEventUseCase } from './use-cases/create-element-on-event.use-case';

@Module({
  providers: [
    ProjectsService,
    PrismaService,
    ElementsService,
    EventsService,
    // Use cases
    ValidateProjectUseCase,
    GetElementsUseCase,
    GetElementUseCase,
    UpdateElementUseCase,
    CreateElementUseCase,
    GetEventsUseCase,
    GetEventUseCase,
    UpdateEventUseCase,
    CreateEventUseCase,
    CreateElementOnElementUseCase,
    CreateElementOnEventUseCase,
  ],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
