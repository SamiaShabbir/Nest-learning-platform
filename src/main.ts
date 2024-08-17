import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from "class-validator";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  const port = 3001;
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Learning Platform API')
    .setDescription('Learning Platform api')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
    )
    .build();
     const document = SwaggerModule.createDocument(app, options);
     SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
