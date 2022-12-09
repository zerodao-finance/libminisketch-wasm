"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minisketch = void 0;
const buffer_1 = require("buffer");
const build = require("../build/libminisketch");
class Minisketch {
    deserialize(input) {
        this._binding.deserialize(input.buffer);
    }
    merge(other) {
        this._binding.merge(other._binding.getPointer());
    }
    decode(maxElements) {
        return this._binding.decode(maxElements);
    }
    constructor({ fieldSize, implementation = 0, capacity }) {
        this._binding = new build.MinisketchWrapper(fieldSize, implementation, capacity);
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