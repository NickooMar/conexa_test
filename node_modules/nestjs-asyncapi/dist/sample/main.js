"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const platform_express_1 = require("@nestjs/platform-express");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
const common_2 = require("./common");
const constants_1 = require("./constants");
const _lib_1 = require("#lib");
const USE_FASTIFY = false;
const adapter = USE_FASTIFY
    ? new platform_fastify_1.FastifyAdapter({
        ignoreTrailingSlash: false,
    })
    : new platform_express_1.ExpressAdapter();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, adapter);
        const asyncapiDocument = yield (0, common_2.makeAsyncapiDocument)(app);
        yield _lib_1.AsyncApiModule.setup(constants_1.DOC_RELATIVE_PATH, app, asyncapiDocument);
        app.connectMicroservice({ transport: microservices_1.Transport.TCP });
        yield app.startAllMicroservices();
        yield app.listen(constants_1.PORT, constants_1.HOST);
        const baseUrl = `http://${constants_1.HOST}:${constants_1.PORT}`;
        const docUrl = baseUrl + constants_1.DOC_RELATIVE_PATH;
        common_1.Logger.log(`Server started at ${baseUrl}; AsyncApi at ${docUrl};`, constants_1.BOOTSTRAP);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map