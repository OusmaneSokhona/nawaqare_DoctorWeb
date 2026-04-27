import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('doctor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get bookings for authenticated doctor' })
  async getDoctorBookings(@CurrentUser() user: CurrentUserDto) {
    // Get doctor ID from user
    const bookings = await this.bookingsService.getBookingsForDoctor(user.id);
    return { data: bookings };
  }

  @Get('patient/:patientUuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get bookings for patient' })
  async getPatientBookings(@Param('patientUuid') patientUuid: string) {
    const bookings = await this.bookingsService.getBookingsForPatient(patientUuid);
    return { data: bookings };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create booking' })
  async createBooking(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: {
      doctor_id: string;
      slot_id: string;
      consultation_mode: string;
      notes_patient?: string;
    },
  ) {
    const booking = await this.bookingsService.createBooking(
      user.id,
      body.doctor_id,
      body.slot_id,
      body.consultation_mode,
      body.notes_patient,
    );
    return { data: booking };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update booking status' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const booking = await this.bookingsService.updateBookingStatus(id, body.status);
    return { data: booking };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Cancel booking' })
  async cancelBooking(
    @Param('id') id: string,
    @Body() body?: { cancelled_reason?: string; cancelled_by?: string },
  ) {
    const booking = await this.bookingsService.cancelBooking(
      id,
      body?.cancelled_reason,
      body?.cancelled_by,
    );
    return { data: booking };
  }
}
