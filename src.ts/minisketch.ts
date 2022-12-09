import { Buffer } from "buffer";
const build = require("../build/libminisketch");

export class Minisketch {
  public _binding: any;
  deserialize(input: Buffer) {
    this._binding.deserialize(input.buffer);
  }
  merge(other: Minisketch) {
    this._binding.merge(other._binding.getPointer());
  }
  decode(maxElements: number) {
    return this._binding.decode(maxElements);
  }
  constructor({
    fieldSize,
    implementation = 0,
    capacity
  }) {
    this._binding = new build.MinisketchWrapper(fieldSize, implementation, capacity);
  }
  serialize() {
    const result = Buffer.from(Array.from(this._binding.serialize()) as any);
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
