import { Controller, Get, Post, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get conversations' })
  async getConversations(
    @Query('patientUuid') patientUuid?: string,
    @Query('doctorId') doctorId?: string,
  ) {
    const conversations = await this.conversationsService.getConversations(patientUuid, doctorId);
    return { data: conversations };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create conversation' })
  async createConversation(@Body() body: { patient_uuid: string; doctor_id: string; context_label?: string }) {
    const conversation = await this.conversationsService.createConversation(
      body.patient_uuid,
      body.doctor_id,
      body.context_label,
    );
    return { data: conversation };
  }

  @Get(':id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get conversation messages' })
  async getMessages(@Param('id') id: string) {
    const messages = await this.conversationsService.getMessages(id);
    return { data: messages };
  }

  @Post(':id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Send message' })
  async sendMessage(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserDto,
    @Body() body: { content: string; category?: string },
  ) {
    const message = await this.conversationsService.sendMessage(id, user.id, body.content, body.category);
    return { data: message };
  }

  @Patch(':id/close')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Close conversation' })
  async closeConversation(@Param('id') id: string) {
    const conversation = await this.conversationsService.closeConversation(id);
    return { data: conversation };
  }
}
