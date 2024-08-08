import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  const port = 3001;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
