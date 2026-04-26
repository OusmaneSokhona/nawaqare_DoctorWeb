import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get notifications' })
  async getNotifications(@CurrentUser() user: CurrentUserDto) {
    const notifications = await this.notificationsService.getNotifications(user.id);
    return { data: notifications };
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mark notification as read' })
  async markAsRead(@CurrentUser() user: CurrentUserDto) {
    const result = await this.notificationsService.markAllAsRead(user.id);
    return { success: true, modified_count: result.count };
  }

  @Patch('read-all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  async markAllAsRead(@CurrentUser() user: CurrentUserDto) {
    const result = await this.notificationsService.markAllAsRead(user.id);
    return { success: true, modified_count: result.count };
  }
}
