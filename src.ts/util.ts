import { stripZeros, hexlify } from "@ethersproject/bytes";
import { BigNumber } from "@ethersproject/bignumber";

function _stripZeros(a: Uint8Array) {
  return stripZeros(a.reverse());
}

export function resolve(arr: number[][]): [length: number, res: string[]] {
  let res = arr.map((d) => {
    const v = hexlify(_stripZeros(new Uint8Array(d)));
    if (v == "0x") return "0";
    else return BigNumber.from(v).toString();
  });
  const length = Number(res.splice(res.length - 1)[0]);
  console.log(length);
  if (length > 0) {
    res = res.slice(0, length);
  }
  return [length, res];
}
