/// <reference types="node" />
import { Buffer } from "buffer";
export declare class Minisketch {
    _binding: any;
    static create(opts: {
        fieldSize: any;
        implementation?: any;
        capacity: any;
    }): Promise<Minisketch>;
    deserialize(input: Buffer): void;
    merge(other: Minisketch): void;
    decode(): any;
    constructor(binding: any);
    serialize(): Buffer;
    destroy(): void;
    getPointer(): any;
    addUint(i: String | Number): void;
}
