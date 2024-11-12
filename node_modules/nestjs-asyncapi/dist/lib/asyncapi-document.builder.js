"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncApiDocumentBuilder = void 0;
const lodash_1 = require("lodash");
class AsyncApiDocumentBuilder {
    constructor() {
        this.buildDocumentBase = () => ({
            asyncapi: '2.5.0',
            info: {
                title: '',
                description: '',
                version: '1.0.0',
                contact: {},
            },
            tags: [],
            servers: {},
            components: {},
        });
        this.document = this.buildDocumentBase();
    }
    setTitle(title) {
        this.document.info.title = title;
        return this;
    }
    setDescription(description) {
        this.document.info.description = description;
        return this;
    }
    setVersion(version) {
        this.document.info.version = version;
        return this;
    }
    setTermsOfService(termsOfService) {
        this.document.info.termsOfService = termsOfService;
        return this;
    }
    setContact(name, url, email) {
        this.document.info.contact = { name, url, email };
        return this;
    }
    setLicense(name, url) {
        this.document.info.license = { name, url };
        return this;
    }
    addServer(name, server) {
        this.document.servers[name] = server;
        return this;
    }
    addServers(servers) {
        for (const { name, server } of servers) {
            this.addServer(name, server);
        }
        return this;
    }
    setExternalDoc(description, url) {
        this.document.externalDocs = { description, url };
        return this;
    }
    setDefaultContentType(contentType) {
        this.document.defaultContentType = contentType;
        return this;
    }
    addTag(name, description = '', externalDocs) {
        this.document.tags = this.document.tags.concat((0, lodash_1.pickBy)({
            name,
            description,
            externalDocs,
        }, (0, lodash_1.negate)(lodash_1.isUndefined)));
        return this;
    }
    addSecurity(name, options) {
        this.document.components.securitySchemes = Object.assign(Object.assign({}, (this.document.components.securitySchemes || {})), { [name]: options });
        return this;
    }
    addBearerAuth(options = {
        type: 'http',
    }, name = 'bearer') {
        this.addSecurity(name, Object.assign({ scheme: 'bearer', bearerFormat: 'JWT' }, options));
        return this;
    }
    addOAuth2(options = {
        type: 'oauth2',
    }, name = 'oauth2') {
        this.addSecurity(name, Object.assign({ type: 'oauth2', flows: {} }, options));
        return this;
    }
    addApiKey(options = {
        type: 'apiKey',
    }, name = 'api_key') {
        this.addSecurity(name, Object.assign({ type: 'apiKey', in: 'header', name }, options));
        return this;
    }
    addBasicAuth(options = {
        type: 'http',
    }, name = 'basic') {
        this.addSecurity(name, Object.assign({ type: 'http', scheme: 'basic' }, options));
        return this;
    }
    addCookieAuth(cookieName = 'connect.sid', options = {
        type: 'apiKey',
    }, securityName = 'cookie') {
        this.addSecurity(securityName, Object.assign({ type: 'apiKey', in: 'cookie', name: cookieName }, options));
        return this;
    }
    build() {
        return this.document;
    }
}
exports.AsyncApiDocumentBuilder = AsyncApiDocumentBuilder;
//# sourceMappingURL=asyncapi-document.builder.js.map