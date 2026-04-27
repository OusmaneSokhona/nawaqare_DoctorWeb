import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';

@Module({
  imports: [PrismaModule],
  providers: [AccessControlService],
  controllers: [AccessControlController],
  exports: [AccessControlService],
})
export class AccessControlModule {}
