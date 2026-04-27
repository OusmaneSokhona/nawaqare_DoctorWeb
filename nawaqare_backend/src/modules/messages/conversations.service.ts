import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(patientUuid?: string, doctorId?: string) {
    const where: any = {};
    if (patientUuid) where.patient_uuid = patientUuid;
    if (doctorId) where.doctor_id = doctorId;

    return this.prisma.conversation.findMany({
      where,
      include: { messages: { orderBy: { created_at: 'desc' } } },
      orderBy: { created_at: 'desc' },
    });
  }

  async createConversation(patientUuid: string, doctorId: string, contextLabel?: string) {
    return this.prisma.conversation.create({
      data: {
        patient_uuid: patientUuid,
        doctor_id: doctorId,
        context_label: contextLabel,
        is_closed: false,
      },
    });
  }

  async getMessages(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversation_id: conversationId },
      orderBy: { created_at: 'asc' },
    });
  }

  async sendMessage(conversationId: string, senderUuid: string, content: string, category?: string) {
    return this.prisma.message.create({
      data: {
        conversation_id: conversationId,
        sender_uuid: senderUuid,
        content,
        category: category as any,
        is_read: false,
      },
    });
  }

  async closeConversation(conversationId: string) {
    return this.prisma.conversation.update({
      where: { id: conversationId },
      data: { is_closed: true, closed_at: new Date() },
    });
  }
}
