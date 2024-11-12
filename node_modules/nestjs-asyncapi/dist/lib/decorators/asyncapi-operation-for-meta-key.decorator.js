"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiOperationForMetaKey = void 0;
const helpers_1 = require("@nestjs/swagger/dist/decorators/helpers");
function makeHeaders(headers) {
    return headers
        ? {
            type: 'object',
            properties: Object.entries(headers)
                .map(([key, value]) => ({
                [key]: Object.assign({ type: 'string' }, value),
            }))
                .reduce((acc, j) => (Object.assign(Object.assign({}, acc), j)), {}),
        }
        : undefined;
}
function makeMessage(message, defaultName) {
    return Object.assign(Object.assign({}, message), { name: message.name || defaultName, payload: {
            type: message.payload,
        }, headers: makeHeaders(message.headers) });
}
function AsyncApiOperationForMetaKey(metaKey, options) {
    return (target, propertyKey, descriptor) => {
        const methodName = `${target.constructor.name}#${String(propertyKey)}`;
        const transformedOptions = options.map((i) => {
            const message = Array.isArray(i.message)
                ? {
                    oneOf: i.message.map((i, index) => makeMessage(i, `${methodName}#${index}`)),
                }
                : makeMessage(i.message, methodName);
            const transformedOptionInstance = Object.assign(Object.assign({}, i), { message });
            return transformedOptionInstance;
        });
        return (0, helpers_1.createMethodDecorator)(metaKey, transformedOptions)(target, propertyKey, descriptor);
    };
}
exports.AsyncApiOperationForMetaKey = AsyncApiOperationForMetaKey;
//# sourceMappingURL=asyncapi-operation-for-meta-key.decorator.js.map