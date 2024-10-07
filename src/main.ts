import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from "class-validator";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app.select(AppModule),{fallbackOnErrors:true});
  const port = 3002;
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
       
     const srcFolderPath = join(__dirname, '..', '..', 'src');

    //  console.log('Path to src folder:', srcFolderPath);
     app.useStaticAssets(join(srcFolderPath,'uploads')); // Serve uploaded files
     app.enableCors();
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

}
bootstrap();
