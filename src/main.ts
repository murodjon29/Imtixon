import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors'
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = config.PORT
  app.use(cors())
  await app.listen(PORT ?? 3000);
  console.log(`Application is running on: ${PORT ?? 3000}`);
}
bootstrap();
