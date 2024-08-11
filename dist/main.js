"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_ctx_1 = require("express-ctx");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const express = require("express");
const cors = require("cors");
const configuration_module_1 = require("./configuration/configuration.module");
const configuration_service_1 = require("./configuration/configuration.service");
const dotenv = require("dotenv");
dotenv.config({ path: `.env.test` });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    app.use(cors());
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey
    };
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Task Runs ')
        .setDescription('The task runs API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(express.json({ limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'assets', 'messages'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'assets', 'images'));
    app.set('trust proxy', 1);
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.enableVersioning();
    app.useGlobalPipes(new common_1.ValidationPipe({}));
    const configService = app.select(configuration_module_1.ConfigurationModule).get(configuration_service_1.ConfigurationService);
    app.use(express_ctx_1.middleware);
    if (!configService.isDevelopment) {
        app.enableShutdownHooks();
    }
    const port = configService.appConfig.port;
    await app.listen(port || 3000);
    console.info(`server running on ${await app.getUrl()}`);
    return app;
}
bootstrap();
//# sourceMappingURL=main.js.map