import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health / liveness (load balancers, Docker)' })
  check() {
    return { status: 'ok', service: 'nawaqare-api' };
  }
}
