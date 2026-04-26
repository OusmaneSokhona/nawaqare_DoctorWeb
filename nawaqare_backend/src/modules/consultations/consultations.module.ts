import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';

@Module({
  imports: [PrismaModule],
  providers: [ConsultationsService],
  controllers: [ConsultationsController],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}
