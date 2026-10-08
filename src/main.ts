import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS CONFIG
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  // ADD 'api' TO ENDPOINT START
  app.setGlobalPrefix('api');

  // The preferred NestJS way using ConfigService
  // const configService = app.get(ConfigService);
  // const nestPort = configService.get<number>('PORT') || 3000;

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
  });
}
bootstrap();
