import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get team members' })
  async getTeamMembers(@CurrentUser() user: CurrentUserDto) {
    const teamMembers = await this.teamService.getTeamMembers(user.id);
    return { data: teamMembers };
  }

  @Post('invite')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Invite team member' })
  async inviteTeamMember(
    @CurrentUser() user: CurrentUserDto,
    @Body() body: { member_user_id: string; role: string; permissions: any },
  ) {
    const teamMember = await this.teamService.inviteTeamMember(
      user.id,
      body.member_user_id,
      body.role,
      body.permissions,
    );
    return { data: teamMember };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update team member status' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    const teamMember = await this.teamService.updateTeamMemberStatus(id, body.status);
    return { data: teamMember };
  }

  @Patch(':id/permissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update team member permissions' })
  async updatePermissions(@Param('id') id: string, @Body() body: { permissions: any }) {
    const teamMember = await this.teamService.updateTeamMemberPermissions(id, body.permissions);
    return { data: teamMember };
  }

  @Patch(':id/suspend')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Suspend team member' })
  async suspendMember(@Param('id') id: string) {
    const teamMember = await this.teamService.updateTeamMemberStatus(id, 'SUSPENDED');
    return { data: teamMember };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DOCTOR')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Remove team member' })
  async removeTeamMember(@Param('id') id: string) {
    await this.teamService.removeTeamMember(id);
    return { message: 'Team member removed successfully' };
  }
}
