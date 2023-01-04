"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.cast = void 0;
const bytes_1 = require("@ethersproject/bytes");
const bignumber_1 = require("@ethersproject/bignumber");
function _stripZeros(a) {
    return (0, bytes_1.stripZeros)(a.reverse());
}
function cast(a) {
    console.log(a.buffer);
}
exports.cast = cast;
function resolve(arr) {
    let res = arr.map((d) => {
        const v = (0, bytes_1.hexlify)(_stripZeros(new Uint8Array(d)));
        if (v == "0x")
            return "0";
        else
            return bignumber_1.BigNumber.from(v).toString();
    });
    console.log(res);
    const length = Number(res.splice(res.length - 1)[0]);
    console.log(length);
    if (length > 0) {
        res = res.slice(0, length);
    }
    return [length, res];
}
exports.resolve = resolve;
//# sourceMappingURL=util.js.map