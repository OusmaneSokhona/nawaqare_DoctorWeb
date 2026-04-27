import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AccessControlService } from './access-control.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';
import {
  CreateAccessRequestDto,
  EmergencyAccessDto,
  UpdateConsentDto,
} from './dto/access-request.dto';
import { ConsentType, AuditAction } from '@prisma/client';

@ApiTags('Access Control')
@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  // ============================================================================
  // PATIENT ENDPOINTS - Access Management for Own Data
  // ============================================================================

  @Get('me/authorized')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get list of people/systems with access to my data' })
  async getAuthorizedActors(@CurrentUser() currentUser: CurrentUserDto) {
    return this.accessControlService.getAuthorizedActors(currentUser.id);
  }

  @Get('me/history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get complete access history for my data' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of entries to return (default: 50)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Pagination offset (default: 0)' })
  @ApiQuery({ name: 'action', required: false, type: String, enum: ['READ', 'WRITE', 'EXPORT', 'EMERGENCY_ACCESS'] })
  async getAccessHistory(
    @CurrentUser() currentUser: CurrentUserDto,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('action') action?: AuditAction,
  ) {
    return this.accessControlService.getAccessHistory(currentUser.id, {
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      action,
    });
  }

  @Get('me/consents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all my consents' })
  async getMyConsents(@CurrentUser() currentUser: CurrentUserDto) {
    return this.accessControlService.getMyConsents(currentUser.id);
  }

  @Put('me/consents/:type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update consent for a specific type' })
  async updateConsent(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('type') consentType: ConsentType,
    @Body() updateConsentDto: UpdateConsentDto,
  ) {
    return this.accessControlService.updateConsent(currentUser.id, consentType, updateConsentDto);
  }

  @Get('me/sessions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all active sessions' })
  async getActiveSessions(@CurrentUser() currentUser: CurrentUserDto) {
    return this.accessControlService.getActiveSessions(currentUser.id);
  }

  @Delete('me/sessions/:sessionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PATIENT')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Revoke a specific session' })
  async revokeSession(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('sessionId') sessionId: string,
  ) {
    return this.accessControlService.revokeSession(currentUser.id, sessionId);
  }

  // ============================================================================
  // DOCTOR ENDPOINTS - Requesting and Managing Access
  // ============================================================================

  @Post('request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Request access to a patient\'s data' })
  async requestAccess(
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() createAccessRequestDto: CreateAccessRequestDto,
  ) {
    return this.accessControlService.requestAccess(currentUser.id, createAccessRequestDto);
  }

  @Get('my-requests')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all my pending access requests' })
  async getMyAccessRequests(@CurrentUser() currentUser: CurrentUserDto) {
    return this.accessControlService.getMyAccessRequests(currentUser.id);
  }

  @Get('check/:patientId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Check my current access level to a patient\'s data' })
  async checkMyAccess(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('patientId') patientId: string,
  ) {
    return this.accessControlService.checkMyAccess(currentUser.id, patientId);
  }

  @Post('emergency/:patientId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Request emergency (break-glass) access to patient data',
    description: 'Access is granted immediately but fully logged for audit. Must provide justification.',
  })
  async requestEmergencyAccess(
    @CurrentUser() currentUser: CurrentUserDto,
    @Param('patientId') patientId: string,
    @Body() emergencyAccessDto: EmergencyAccessDto,
  ) {
    const dto = {
      ...emergencyAccessDto,
      patientId,
    };
    return this.accessControlService.requestEmergencyAccess(currentUser.id, dto);
  }
}
