import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    let config;

    if (fs.existsSync(filePath)) {
      const dotEnvData = dotenv.parse(fs.readFileSync(filePath));
      config = { ...dotEnvData, ...process.env };
    } else {
      config = process.env;
    }
    this.envConfig = this.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      DB_PORT: Joi.number().default(27017),
      DB_HOST: Joi.string().default('localhost'),
      DB_NAME: Joi.string().default('moneybunney'),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      {
        allowUnknown: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get databaseUri(): string {
    const { DB_HOST, DB_PORT, DB_NAME } = this.envConfig;
    const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    return uri;
  }
}
