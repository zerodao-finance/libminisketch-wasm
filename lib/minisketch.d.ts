/// <reference types="node" />
import { Buffer } from "buffer";
export declare class Minisketch {
    _binding: any;
    deserialize(input: Buffer): void;
    merge(other: Minisketch): void;
    decode(maxElements: number): any;
    constructor({ fieldSize, implementation, capacity }: {
        fieldSize: any;
        implementation?: number;
        capacity: any;
    });
    serialize(): Buffer;
    destroy(): void;
    addUint(i: any): void;
}
