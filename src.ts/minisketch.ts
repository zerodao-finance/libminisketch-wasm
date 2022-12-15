import { Buffer } from "buffer";
const build = require("../build/libminisketch");

export class Minisketch {
  public _binding: any;
  static async create(opts: {
    fieldSize: any;
    implementation?: any;
    capacity: any;
  }) {
    return new this(
      new (await build()).MinisketchWrapper(
        opts.fieldSize,
        opts.implementation || 0,
        opts.capacity
      )
    );
  }
  deserialize(input: Buffer) {
    this._binding.deserialize(input.buffer);
  }
  merge(other: Minisketch) {
    this._binding.merge(other._binding.getPointer());
  }
  decode() {
    return this._binding.decode();
  }
  constructor(binding: any) {
    this._binding = binding;
  }
  serialize() {
    const result = Buffer.from(Array.from(this._binding.serialize()) as any);
    this._binding.destroySerialized();
    return result;
  }
  destroy() {
    this._binding.destroy();
  }
  getPointer(): any {
    this._binding.getPointer();
  }
  addUint(i: Number) {
    this._binding.addUint(i);
  }
}
