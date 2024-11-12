"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiOperation = void 0;
const asyncapi_constants_1 = require("../asyncapi.constants");
const asyncapi_operation_for_meta_key_decorator_1 = require("./asyncapi-operation-for-meta-key.decorator");
function AsyncApiOperation(...options) {
    return (0, asyncapi_operation_for_meta_key_decorator_1.AsyncApiOperationForMetaKey)(asyncapi_constants_1.DECORATORS.AsyncApiOperation, options);
}
exports.AsyncApiOperation = AsyncApiOperation;
//# sourceMappingURL=asyncapi-operation.decorator.js.map