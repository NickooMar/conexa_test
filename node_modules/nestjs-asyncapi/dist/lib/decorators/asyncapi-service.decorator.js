"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApi = void 0;
const helpers_1 = require("@nestjs/swagger/dist/decorators/helpers");
const asyncapi_constants_1 = require("../asyncapi.constants");
function AsyncApi() {
    return (0, helpers_1.createMixedDecorator)(asyncapi_constants_1.DECORATORS.AsyncApiClass, true);
}
exports.AsyncApi = AsyncApi;
//# sourceMappingURL=asyncapi-service.decorator.js.map