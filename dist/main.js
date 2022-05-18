"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston.transports.File({
                    maxsize: 512000,
                    maxFiles: 5,
                    filename: `${__dirname}/../logs/log-api.log`,
                    format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.align(), winston.format.simple(), winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`))
                }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.simple(), winston.format.colorize({ all: true }), winston.format.align(), winston.format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`))
                })
            ]
        })
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map