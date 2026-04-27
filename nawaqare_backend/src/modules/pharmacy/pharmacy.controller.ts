import { Controller, Get, Post, Patch, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PharmacyService } from './pharmacy.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';
import {
  PharmacyDispenseDto,
  PharmacyRejectDto,
  PharmacySubstitutionDto,
  UpdatePharmacyProfileDto,
} from './dto/pharmacy-dispense.dto';

@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  /**
   * GET /pharmacy/prescriptions - Liste des prescriptions
   */
  @Get('prescriptions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'List prescriptions accessible to pharmacy' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by prescription status' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Filter by start date' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Filter by end date' })
  async getPrescriptions(
    @CurrentUser() user: CurrentUserDto,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filters = {
      status: status as any,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    const data = await this.pharmacyService.getPrescriptions(user.id, filters);
    return { data };
  }

  /**
   * GET /pharmacy/prescriptions/qr/:qrToken - Récupère prescription par QR
   */
  @Get('prescriptions/qr/:qrToken')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get prescription by QR code token' })
  async getPrescriptionByQr(
    @CurrentUser() user: CurrentUserDto,
    @Param('qrToken') qrToken: string,
  ) {
    const data = await this.pharmacyService.getPrescriptionByQrToken(user.id, qrToken);
    return { data };
  }

  /**
   * GET /pharmacy/prescriptions/patient/:patientId - Cherche par patient
   */
  @Get('prescriptions/patient/:patientId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get prescriptions by patient ID' })
  async getPrescriptionsByPatient(
    @CurrentUser() user: CurrentUserDto,
    @Param('patientId') patientId: string,
  ) {
    const data = await this.pharmacyService.getPrescriptionsByPatient(user.id, patientId);
    return { data };
  }

  /**
   * GET /pharmacy/prescriptions/:id - Détail prescription
   */
  @Get('prescriptions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get prescription detail with lines' })
  async getPrescriptionDetail(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ) {
    const data = await this.pharmacyService.getPrescriptionDetail(user.id, id);
    return { data };
  }

  /**
   * PATCH /pharmacy/prescriptions/:id/validate - Valider prescription
   */
  @Patch('prescriptions/:id/validate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Validate prescription and mark as RECEIVED' })
  async validatePrescription(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ) {
    const data = await this.pharmacyService.validatePrescription(user.id, id);
    return { data };
  }

  /**
   * POST /pharmacy/prescriptions/:id/dispense - Délivrance complète
   */
  @Post('prescriptions/:id/dispense')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Dispense complete prescription (all lines)' })
  async dispensePrescription(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() dto: PharmacyDispenseDto,
  ) {
    const data = await this.pharmacyService.dispensePrescription(user.id, id, dto);
    return { data };
  }

  /**
   * POST /pharmacy/prescriptions/:id/partial - Délivrance partielle
   */
  @Post('prescriptions/:id/partial')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Dispense partial prescription (some lines)' })
  async dispensePartial(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() dto: PharmacyDispenseDto,
  ) {
    const data = await this.pharmacyService.dispensePartial(user.id, id, dto);
    return { data };
  }

  /**
   * POST /pharmacy/prescriptions/:id/reject - Rejeter prescription
   */
  @Post('prescriptions/:id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Reject prescription with reason' })
  async rejectPrescription(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() dto: PharmacyRejectDto,
  ) {
    const data = await this.pharmacyService.rejectPrescription(user.id, id, dto);
    return { data };
  }

  /**
   * POST /pharmacy/prescriptions/:id/substitution - Substitution générique
   */
  @Post('prescriptions/:id/substitution')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Record generic drug substitution' })
  async substituteDrug(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() dto: PharmacySubstitutionDto,
  ) {
    const data = await this.pharmacyService.substituteDrug(user.id, id, dto);
    return { data };
  }

  /**
   * GET /pharmacy/history - Historique des délivrances
   */
  @Get('history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get dispensing history for this pharmacy' })
  @ApiQuery({ name: 'limit', required: false, default: 50, description: 'Limit results' })
  async getPharmacyHistory(
    @CurrentUser() user: CurrentUserDto,
    @Query('limit') limit?: string,
  ) {
    const data = await this.pharmacyService.getPharmacyHistory(
      user.id,
      limit ? parseInt(limit, 10) : 50,
    );
    return { data };
  }

  /**
   * GET /pharmacy/access-log - Log des accès
   */
  @Get('access-log')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get audit log of this pharmacy access to prescriptions' })
  @ApiQuery({ name: 'limit', required: false, default: 100, description: 'Limit results' })
  async getAccessLog(
    @CurrentUser() user: CurrentUserDto,
    @Query('limit') limit?: string,
  ) {
    const data = await this.pharmacyService.getAccessLog(
      user.id,
      limit ? parseInt(limit, 10) : 100,
    );
    return { data };
  }

  /**
   * GET /pharmacy/profile - Profil pharmacie
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get current pharmacy profile' })
  async getPharmacyProfile(@CurrentUser() user: CurrentUserDto) {
    const data = await this.pharmacyService.getPharmacyProfile(user.id);
    return { data };
  }

  /**
   * PUT /pharmacy/profile - Mettre à jour profil
   */
  @Put('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PHARMACIST')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update pharmacy profile' })
  async updatePharmacyProfile(
    @CurrentUser() user: CurrentUserDto,
    @Body() dto: UpdatePharmacyProfileDto,
  ) {
    const data = await this.pharmacyService.updatePharmacyProfile(user.id, dto);
    return { data };
  }
}
