import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ComplianceService } from './compliance.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Compliance')
@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get compliance items' })
  async getComplianceItems(@CurrentUser() user: CurrentUserDto) {
    const items = await this.complianceService.getComplianceItems(user.id);
    return { data: items };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update compliance item' })
  async updateComplianceItem(@Param('id') id: string, @Body() body: any) {
    const item = await this.complianceService.updateComplianceItem(id, body);
    return { data: item };
  }

  @Post(':id/upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Upload compliance document' })
  async uploadDocument(@Param('id') id: string, @Body() body: { document_url: string }) {
    const item = await this.complianceService.uploadComplianceDocument(id, body.document_url);
    return { data: item };
  }
}
