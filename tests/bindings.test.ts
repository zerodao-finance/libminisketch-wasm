import { Minisketch } from "../src.ts/minisketch";
import { ethers } from "ethers";
import { chunk } from "lodash";
import { resolve } from "../src.ts/util";

describe("bindings", () => {
  let sketch_a: Minisketch, sketch_b: Minisketch;
  before(async () => {
    sketch_a = await Minisketch.create({
      fieldSize: 64,
      capacity: 5,
    });
    sketch_b = await Minisketch.create({
      fieldSize: 64,
      capacity: 5,
    });
  });
  it("should test lib loading", async () => {
    let hash: any = ethers.utils.keccak256(ethers.utils.randomBytes(8));
    hash = ethers.utils.arrayify(hash).slice(0, 8);
    console.log(ethers.BigNumber.from(hash).toString());
    sketch_a.addUint(ethers.BigNumber.from(hash).toString());
    sketch_a.addUint("3002");
    sketch_b.addUint("3001");
    sketch_b.merge(sketch_a);
    const decoded = chunk(sketch_b.decode(), 8);
    const [length, hexed] = resolve(decoded);
    console.log(hexed);
    const serialized = sketch_a.serialize();
  });
});
