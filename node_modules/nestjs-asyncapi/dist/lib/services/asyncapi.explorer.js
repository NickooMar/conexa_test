"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiExplorer = void 0;
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const explorers_1 = require("../explorers");
class AsyncApiExplorer {
    constructor() {
        this.metadataScanner = new core_1.MetadataScanner();
        this.schemas = [];
        this.schemaRefsStack = [];
        this.operationIdFactory = (controllerKey, methodKey) => controllerKey ? `${controllerKey}_${methodKey}` : methodKey;
    }
    explorerAsyncapiServices(wrapper, modulePath, globalPrefix, operationIdFactory) {
        if (operationIdFactory) {
            this.operationIdFactory = operationIdFactory;
        }
        const { instance, metatype } = wrapper;
        if (!instance ||
            !metatype ||
            !Reflect.getMetadataKeys(metatype).find((label) => explorers_1.asyncApiClassAnnotationLabels.includes(label))) {
            return [];
        }
        const prototype = Object.getPrototypeOf(instance);
        const documentResolvers = {
            root: [
                explorers_1.exploreAsyncapiClassMetadata,
                explorers_1.exploreControllerMetadata,
                explorers_1.exploreGatewayMetadata,
            ],
            security: [],
            tags: [],
            operations: [explorers_1.exploreAsyncApiOperationMetadata],
        };
        return this.generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, modulePath, globalPrefix);
    }
    getSchemas() {
        const ret = Object.assign({}, this.schemas);
        return ret;
    }
    generateDenormalizedDocument(metatype, prototype, instance, documentResolvers, _modulePath, _globalPrefix) {
        const denormalizedAsyncapiServices = this.metadataScanner.scanFromPrototype(instance, prototype, (name) => {
            const targetCallback = prototype[name];
            const methodMetadata = documentResolvers.root.reduce((_metadata, fn) => {
                const serviceMetadata = fn(metatype);
                const channels = documentResolvers.operations.reduce((operations, exploreOperationsMeta) => {
                    const meta = exploreOperationsMeta(this.schemas, instance, prototype, targetCallback);
                    if (!meta) {
                        return operations;
                    }
                    meta.forEach((op) => {
                        if (operations.hasOwnProperty(op.channel)) {
                            operations[op.channel] = Object.assign(Object.assign({}, operations[op.channel]), op);
                        }
                        else {
                            operations[op.channel] = op;
                        }
                    });
                    return operations;
                }, {});
                return Object.keys(channels).map((channel) => ({
                    root: Object.assign(Object.assign({}, serviceMetadata), { name: channel }),
                    operations: channels[channel],
                }));
            }, []);
            return methodMetadata;
        });
        return (0, lodash_1.flatten)(denormalizedAsyncapiServices);
    }
}
exports.AsyncApiExplorer = AsyncApiExplorer;
//# sourceMappingURL=asyncapi.explorer.js.map