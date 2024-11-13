import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as yaml from 'yamljs';
import * as fs from 'fs';
import * as path from 'path';

export const createSwaggerApiDocs = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Conexa test - API Gateway')
    .setDescription('API Gateway to handle microservices request')
    .setVersion('1.0')
    .addTag('Conexa')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  try {
    // Try to load YAML file if exists
    const yamlPath = path.join(process.cwd(), 'swagger.yaml');
    if (fs.existsSync(yamlPath)) {
      const swaggerDocument = yaml.load(yamlPath);
      SwaggerModule.setup('api-docs', app, swaggerDocument);
      return;
    }

    // Fallback to generated docs if no YAML found
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  } catch (error) {
    console.error('Error setting up Swagger:', error);
    // Fallback to generated docs on error
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }
};
