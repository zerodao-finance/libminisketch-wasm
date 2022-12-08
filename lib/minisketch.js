"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minisketch = void 0;
const libminisketch_1 = require("../build/libminisketch");
const buffer_1 = require("buffer");
class Minisketch {
    constructor({ fieldSize, implementation = 0, capacity }) {
        this._binding = new libminisketch_1.MinisketchWrapper(fieldSize, implementation, capacity);
    }
    serialize() {
        const result = buffer_1.Buffer.from(Array.from(this._binding.serialize()));
        this._binding.destroySerialized();
        return result;
    }
    destroy() {
        this._binding.destroy();
    }
    addUint(i) {
        this._binding.addUint(i);
    }
}
exports.Minisketch = Minisketch;
//# sourceMappingURL=minisketch.js.map