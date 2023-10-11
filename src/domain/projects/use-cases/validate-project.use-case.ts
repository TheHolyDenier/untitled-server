import { ProjectsService } from '../projects.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ValidateProjectUseCase {
  constructor(private projectsService: ProjectsService) {}

  async execute(projectId: string, userId: string) {
    const project = await this.projectsService.findOne(projectId, userId);
    if (!project) throw new UnauthorizedException();
  }
}
