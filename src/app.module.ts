import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), // manual install: to access env file
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
