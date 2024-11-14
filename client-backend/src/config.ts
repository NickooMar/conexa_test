import 'dotenv/config';

class Config {
  get jsonWebTokenConfig() {
    return {
      secret: this.getEnv('JWT_SECRET'),
      expiresIn: this.getEnv('JWT_EXPIRES_IN'),
    };
  }

  get mongooseConfig() {
    return {
      host: this.getEnv('MONGO_HOST'),
      database: this.getEnv('MONGO_DATABASE'),
      ssl: this.getEnv('MONGO_SSL') === 'true',
      port: parseInt(this.getEnv('MONGO_PORT')),
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
