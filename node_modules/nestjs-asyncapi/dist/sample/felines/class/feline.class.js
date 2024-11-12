"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feline = void 0;
var PawsEnum;
(function (PawsEnum) {
    PawsEnum["left"] = "left";
    PawsEnum["right"] = "right";
})(PawsEnum || (PawsEnum = {}));
var GendersEnum;
(function (GendersEnum) {
    GendersEnum["male"] = "male";
    GendersEnum["female"] = "female";
})(GendersEnum || (GendersEnum = {}));
class Feline {
    constructor(initializer) {
        Object.assign(this, initializer);
    }
}
exports.Feline = Feline;
//# sourceMappingURL=feline.class.js.map