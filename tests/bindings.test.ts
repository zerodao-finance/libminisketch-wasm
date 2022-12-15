import { Minisketch } from "../src.ts/minisketch";

describe("bindings", () => {
  let sketch_a: Minisketch, sketch_b: Minisketch;
  before(async () => {
    sketch_a = new Minisketch({
      fieldSize: 64,
      capacity: 5,
    });
    sketch_b = new Minisketch({
      fieldSize: 64,
      capacity: 5,
    });
  });
  it("should test lib loading", async () => {
    sketch_a.addUint(3001);
    sketch_a.addUint(3002);
    console.log(sketch_a.decode(5));
    sketch_b.addUint(3001);
    console.log(sketch_b.decode(5));
    console.log(sketch_a._binding.getPointer());
    sketch_b._binding.merge(sketch_a._binding.getPointer());
    console.log(sketch_b.decode(5));
    const serialized = sketch_a.serialize();
  });
});
