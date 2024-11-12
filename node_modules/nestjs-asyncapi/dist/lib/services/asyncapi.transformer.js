"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncapiTransformer = void 0;
class AsyncapiTransformer {
    normalizeChannels(denormalizedDocs) {
        const flatChannels = denormalizedDocs.map((doc) => {
            const key = doc.root.name;
            const value = {
                description: doc.root.description,
                bindings: doc.root.bindings,
                parameters: doc.root.parameters,
                subscribe: doc.operations.sub,
                publish: doc.operations.pub,
            };
            return { key, value };
        });
        const channels = flatChannels.reduce((acc, { key, value }) => {
            var _a, _b;
            if (!acc[key]) {
                acc[key] = value;
            }
            acc[key].publish = (_a = acc[key].publish) !== null && _a !== void 0 ? _a : value.publish;
            acc[key].subscribe = (_b = acc[key].subscribe) !== null && _b !== void 0 ? _b : value.subscribe;
            return acc;
        }, {});
        return { channels };
    }
}
exports.AsyncapiTransformer = AsyncapiTransformer;
//# sourceMappingURL=asyncapi.transformer.js.map