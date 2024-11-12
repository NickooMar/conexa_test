"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exploreGatewayMetadata = exports.exploreControllerMetadata = exports.exploreAsyncapiClassMetadata = exports.asyncApiClassAnnotationLabels = void 0;
const constants_1 = require("@nestjs/common/constants");
const asyncapi_constants_1 = require("../asyncapi.constants");
let GATEWAY_METADATA;
try {
    const wsConstants = require('@nestjs/websockets/constants');
    GATEWAY_METADATA = wsConstants.GATEWAY_METADATA;
}
catch (_a) {
    GATEWAY_METADATA = '__gateway__';
}
exports.asyncApiClassAnnotationLabels = [
    asyncapi_constants_1.DECORATORS.AsyncApiClass,
    constants_1.CONTROLLER_WATERMARK,
    GATEWAY_METADATA,
];
const exploreAsyncapiClassMetadata = (metatype) => {
    return Reflect.getMetadata(asyncapi_constants_1.DECORATORS.AsyncApiClass, metatype);
};
exports.exploreAsyncapiClassMetadata = exploreAsyncapiClassMetadata;
const exploreControllerMetadata = (metatype) => {
    return Reflect.getMetadata(constants_1.CONTROLLER_WATERMARK, metatype);
};
exports.exploreControllerMetadata = exploreControllerMetadata;
const exploreGatewayMetadata = (metatype) => {
    return Reflect.getMetadata(GATEWAY_METADATA, metatype);
};
exports.exploreGatewayMetadata = exploreGatewayMetadata;
//# sourceMappingURL=asyncapi-class.explorer.js.map