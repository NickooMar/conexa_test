import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

const DOC_RELATIVE_PATH = '/async-api';

export const createAsyncapiDocs = async (app) => {
  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('AsyncAPI Docs')
    .setDescription('Your descriptions go here')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .build();

  const asyncapiDocument = AsyncApiModule.createDocument(app, asyncApiOptions);

  await AsyncApiModule.setup(DOC_RELATIVE_PATH, app, asyncapiDocument);
};
