import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // The preferred NestJS way using ConfigService
  const configService = app.get(ConfigService);

  // ADD 'api' TO ENDPOINT START
  app.setGlobalPrefix('api');

  // CORS CONFIG
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies
  });

  // HTTP Security Headers via Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows cross-origin asset sharing if needed
    }),
  );

  // supported only in v12 so can remove helmet package
  // app.useSecurityHeaders({
  //   crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows cross-origin asset sharing if needed
  // });

  //Cookie Parsing Middleware (Pass an optional secret string for signed cookies)
  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET');
  app.use(cookieParser(COOKIE_SECRET));

  // Custom JSON Body Parser (Limits payload sizes to prevent DDoS)
  app.use(json({ limit: '10mb' }));

  // URL-Encoded Body Parser (Handles standard form submissions)
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // globally enabled validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Bind the interceptor globally
  app.useGlobalInterceptors(new TransformInterceptor());

  // const PORT = process.env.PORT ?? 3000;
  const PORT = configService.get<number>('PORT') || 5060;

  await app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
  });
}
bootstrap();
