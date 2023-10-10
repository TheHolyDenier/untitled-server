import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ElementsService } from './elements.service';

@Module({
  providers: [ElementsService, PrismaService],
  exports: [ElementsService],
})
export class ElementsModule {}
