import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());
  app.use(compression());

  const corsOrigins = configService.get<string>('CORS_ORIGINS') || 'http://localhost:3001';
  app.enableCors({
    origin: corsOrigins.split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('NawaQare API')
    .setDescription('Digital Health Platform for Senegal')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${port}`, 'Development')
    .addServer('https://api.nawaqare.sn', 'Production')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtained from /auth/login endpoint',
      },
      'JWT',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Doctors', 'Doctor profile endpoints')
    .addTag('Patients', 'Patient profile endpoints')
    .addTag('Bookings', 'Appointment booking endpoints')
    .addTag('Consultations', 'Consultation management endpoints')
    .addTag('Prescriptions', 'Prescription endpoints')
    .addTag('Documents', 'Medical document endpoints')
    .addTag('Payments', 'Payment processing endpoints')
    .addTag('Teams', 'Team management endpoints')
    .addTag('Compliance', 'Compliance and regulations endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      deepLinking: true,
      displayRequestDuration: true,
    },
  });

  await app.listen(port, '0.0.0.0', () => {
    console.log(`\n========================================`);
    console.log(`🏥 NawaQare Backend Server Running`);
    console.log(`========================================`);
    console.log(`Environment: ${nodeEnv}`);
    console.log(`Port: ${port}`);
    console.log(`API: http://localhost:${port}/api/v1`);
    console.log(`Swagger UI: http://localhost:${port}/api/docs`);
    console.log(`========================================\n`);
  });

  const gracefulShutdown = async (signal: string) => {
    console.log(`\n${signal} signal received: closing HTTP server`);
    await app.close();
    process.exit(0);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
