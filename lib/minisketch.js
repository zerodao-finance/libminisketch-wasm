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
exports.Minisketch = void 0;
const build = require("../build/libminisketch");
class Minisketch {
    static create(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return new this(new build.MinisketchWrapper(opts.fieldSize, opts.implementation || 0, opts.capacity));
        });
    }
    deserialize(input) {
        this._binding.deserialize(input);
    }
    deserialze_pointer(other) {
        this._binding.deserialize_pointer(other._binding.getPointer());
    }
    merge(other) {
        this._binding.merge(other._binding.getPointer());
    }
    decode() {
        return this._binding.decode();
    }
    constructor(binding) {
        this._binding = binding;
    }
    serialize() {
        const result = this._binding.serialize();
        return result;
    }
    destroy() {
        this._binding.destroy();
    }
    rebuild() {
        this._binding.destroy();
        this._binding.create();
    }
    getPointer() {
        return this._binding.getPointer();
    }
    addUint(i) {
        this._binding.addUint(i);
    }
}
exports.Minisketch = Minisketch;
//# sourceMappingURL=minisketch.js.map