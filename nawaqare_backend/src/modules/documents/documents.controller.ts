import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserDto } from '@/common/decorators/current-user.decorator';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Upload medical document' })
  async uploadDocument(@CurrentUser() user: CurrentUserDto, @Body() body: any) {
    const document = await this.documentsService.uploadDocument(
      body.patient_uuid,
      user.id,
      body.doc_type,
      body.filename,
      body.mime_type,
      body.size_bytes,
      body.s3_key,
      body.description,
    );
    return { data: document };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get document' })
  async getDocument(@Param('id') id: string) {
    const document = await this.documentsService.getDocument(id);
    return { data: document };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete document' })
  async deleteDocument(@Param('id') id: string) {
    const document = await this.documentsService.deleteDocument(id);
    return { data: document };
  }

  @Get('patient/:patientUuid')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get patient documents' })
  async getPatientDocuments(@Param('patientUuid') patientUuid: string) {
    const documents = await this.documentsService.getPatientDocuments(patientUuid);
    return { data: documents };
  }
}
