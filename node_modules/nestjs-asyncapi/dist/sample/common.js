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
exports.makeAsyncapiDocument = void 0;
const constants_1 = require("./constants");
const class_1 = require("./felines/class");
const felines_module_1 = require("./felines/felines.module");
const _lib_1 = require("#lib");
function makeAsyncapiDocument(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const asyncApiServer = {
            url: `ws://${constants_1.HOST}:${constants_1.PORT}`,
            protocol: 'socket.io',
            protocolVersion: '4',
            description: 'Allows you to connect using the websocket protocol to our Socket.io server.',
            security: [{ 'user-password': [] }],
            variables: {
                port: {
                    description: 'Secure connection (TLS) is available through port 443.',
                    default: '443',
                },
            },
            bindings: {},
        };
        const servers = Object.keys(constants_1.SERVER).map((i) => ({
            name: constants_1.SERVER[i],
            server: asyncApiServer,
        }));
        const asyncApiOptions = new _lib_1.AsyncApiDocumentBuilder()
            .setTitle('Feline')
            .setDescription('Feline server description here')
            .setVersion('1.0')
            .setDefaultContentType('application/json')
            .addSecurity('user-password', { type: 'userPassword' })
            .addServers(servers)
            .build();
        return _lib_1.AsyncApiModule.createDocument(app, asyncApiOptions, {
            include: [felines_module_1.FelinesModule],
            extraModels: [class_1.Cat, class_1.Lion, class_1.Tiger, class_1.Feline],
        });
    });
}
exports.makeAsyncapiDocument = makeAsyncapiDocument;
//# sourceMappingURL=common.js.map