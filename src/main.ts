import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as  winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({
          maxsize: 512000,
          maxFiles: 5,
          filename: `${__dirname}/../logs/log-api.log`,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.align(),
            winston.format.simple(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),        
          )
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.simple(),
            winston.format.colorize({ all: true }),
            winston.format.align(),
            winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
            // nestWinstonModuleUtilities.format.nestLike('Equinoccio', { prettyPrint: true })
          )
        })
      ]
    })
  });  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
