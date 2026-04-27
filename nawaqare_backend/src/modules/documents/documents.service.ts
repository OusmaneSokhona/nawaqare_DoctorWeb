import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadDocument(
    patientUuid: string,
    uploadedBy: string,
    docType: string,
    filename: string,
    mimeType: string,
    sizeBytes: number,
    s3Key: string,
    description?: string,
  ) {
    return this.prisma.medicalDocument.create({
      data: {
        patient_uuid: patientUuid,
        uploaded_by: uploadedBy,
        doc_type: docType as any,
        filename,
        mime_type: mimeType,
        size_bytes: sizeBytes,
        s3_key: s3Key,
        description,
        is_deleted: false,
      },
    });
  }

  async getDocument(documentId: string) {
    return this.prisma.medicalDocument.findUnique({
      where: { id: documentId },
    });
  }

  async deleteDocument(documentId: string) {
    const doc = await this.prisma.medicalDocument.findUnique({
      where: { id: documentId },
    });

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return this.prisma.medicalDocument.update({
      where: { id: documentId },
      data: { is_deleted: true },
    });
  }

  async getPatientDocuments(patientUuid: string) {
    return this.prisma.medicalDocument.findMany({
      where: { patient_uuid: patientUuid, is_deleted: false },
      orderBy: { created_at: 'desc' },
    });
  }
}
