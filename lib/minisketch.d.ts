/// <reference types="node" />
import { MinisketchWrapper } from "../build/libminisketch";
import { Buffer } from "buffer";
export declare class Minisketch {
    _binding: MinisketchWrapper;
    constructor({ fieldSize, implementation, capacity }: {
        fieldSize: any;
        implementation?: number;
        capacity: any;
    });
    serialize(): Buffer;
    destroy(): void;
    addUint(i: any): void;
}
