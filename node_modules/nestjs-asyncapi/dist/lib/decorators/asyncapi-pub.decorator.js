"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiPub = void 0;
const asyncapi_constants_1 = require("../asyncapi.constants");
const asyncapi_operation_for_meta_key_decorator_1 = require("./asyncapi-operation-for-meta-key.decorator");
function AsyncApiPub(...specificOperationOptions) {
    const options = specificOperationOptions.map((i) => (Object.assign(Object.assign({}, i), { type: 'pub' })));
    return (0, asyncapi_operation_for_meta_key_decorator_1.AsyncApiOperationForMetaKey)(asyncapi_constants_1.DECORATORS.AsyncApiPub, options);
}
exports.AsyncApiPub = AsyncApiPub;
//# sourceMappingURL=asyncapi-pub.decorator.js.map