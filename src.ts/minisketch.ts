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
      new build.MinisketchWrapper(
        opts.fieldSize,
        opts.implementation || 0,
        opts.capacity
      )
    );
  }
  deserialize(input: Buffer) {
    this._binding.deserialize(input.toString("ascii"));
  }
  deserialze_pointer(other: Minisketch) {
    this._binding.deserialize_pointer(other._binding.getPointer());
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
  getPointer(): any {
    return this._binding.getPointer();
  }
  addUint(i: any) {
    this._binding.addUint(i);
  }
}
