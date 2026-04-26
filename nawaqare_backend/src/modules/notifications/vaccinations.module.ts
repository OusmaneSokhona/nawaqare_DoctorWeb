import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { VaccinationsService } from './vaccinations.service';
import { VaccinationsController } from './vaccinations.controller';

@Module({
  imports: [PrismaModule],
  providers: [VaccinationsService],
  controllers: [VaccinationsController],
  exports: [VaccinationsService],
})
export class VaccinationsModule {}
