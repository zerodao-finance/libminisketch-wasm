import { Minisketch } from "../src.ts/minisketch";
import { ethers } from "ethers";
import { chunk } from "lodash";
import { resolve, cast } from "../src.ts/util";

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
    let hash: any = ethers.utils.keccak256("0x21");
    let hash2: any = ethers.utils.keccak256("0x22");
    let hash3: any = ethers.utils.keccak256("0x23");
    hash = ethers.utils.arrayify(hash).slice(0, 8);
    hash2 = ethers.utils.arrayify(hash2).slice(0, 8);
    hash3 = ethers.utils.arrayify(hash3).slice(0, 8);
    console.log(ethers.BigNumber.from(hash).toString());
    console.log(ethers.BigNumber.from(hash2).toString());
    console.log(ethers.BigNumber.from(hash3).toString());
    sketch_a.addUint(ethers.BigNumber.from(hash).toString());
    sketch_a.addUint(ethers.BigNumber.from(hash2).toString());
    sketch_b.addUint(ethers.BigNumber.from(hash3).toString());
    const sketchSerialized = sketch_a.serialize();
    let sketch_c = await Minisketch.create({ fieldSize: 64, capacity: 5 });
    cast(sketchSerialized as any);
    sketch_c.deserialize(sketchSerialized as any);
    console.log(sketch_a._binding.len());
    sketch_b.merge(sketch_c);
    const decoded = chunk(sketch_b.decode(), 8);
    const [length, hexed] = resolve(decoded);
    console.log(hexed);
  });
});
