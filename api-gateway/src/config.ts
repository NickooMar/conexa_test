import 'dotenv/config';

class Config {
  get mongooseConfig() {
    return {
      host: this.getEnv('MONGO_HOST'),
      port: parseInt(this.getEnv('MONGO_PORT')),
      database: this.getEnv('MONGO_DATABASE'),
      ssl: this.getEnv('MONGO_SSL') === 'true',
    };
  }

  getEnv(key: string, optional = false) {
    if (!optional && !process.env[key]) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return process.env[key];
  }
}

export const config = new Config();
