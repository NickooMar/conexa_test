import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../../config';

const { host, port, database, ssl } = config.mongooseConfig;

const MongooseMainConfig = MongooseModule.forRoot(
  `mongodb://${host}:${port}/${database}?ssl=${ssl}`,
  {
    dbName: database,
    connectionName: database,
  },
);

export default MongooseMainConfig;
