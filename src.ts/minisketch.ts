import { MinisketchWrapper } from "../build/libminisketch";
import { Buffer } from "buffer";

export class Minisketch {
  public _binding: MinisketchWrapper;
  constructor({
    fieldSize,
    implementation = 0,
    capacity
  }) {
    this._binding = new MinisketchWrapper(fieldSize, implementation, capacity);
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
