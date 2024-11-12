import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerApiDocs = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for authentication')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, documentFactory);
};
