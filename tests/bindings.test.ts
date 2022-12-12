import { Minisketch } from "../src.ts/minisketch";

describe("bindings", () => {
  let sketch: Minisketch;
  before(async () => {
    sketch = await Minisketch.create({
      fieldSize: 12,
      capacity: 5,
    });
    setTimeout(() => {}, 5000);
  });
  it("should test lib loading", async () => {
    sketch.getPointer();
    sketch.addUint(3002);
    console.log(sketch.serialize());
    sketch.destroy();
  });
});
