import { Module } from '@nestjs/common';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { ProjectsModule } from './domain/projects/projects.module';
import { ElementsModule } from './domain/elements/elements.module';
import { EventsModule } from './domain/events/events.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    ElementsModule,
    EventsModule,
  ],
})
export class DomainModule {}
