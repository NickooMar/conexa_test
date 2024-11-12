"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiSub = void 0;
const asyncapi_constants_1 = require("../asyncapi.constants");
const asyncapi_operation_for_meta_key_decorator_1 = require("./asyncapi-operation-for-meta-key.decorator");
function AsyncApiSub(...specificOperationOptions) {
    const options = specificOperationOptions.map((i) => (Object.assign(Object.assign({}, i), { type: 'sub' })));
    return (0, asyncapi_operation_for_meta_key_decorator_1.AsyncApiOperationForMetaKey)(asyncapi_constants_1.DECORATORS.AsyncApiSub, options);
}
exports.AsyncApiSub = AsyncApiSub;
//# sourceMappingURL=asyncapi-sub.decorator.js.map