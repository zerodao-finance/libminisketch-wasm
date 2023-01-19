var { Minisketch } = require('./');

var fn = async () => {
 var a = await Minisketch.create({ fieldSize: 12, capacity: 4 });
 a.addUint(100);
 a.addUint(200);

 var aSerialized = a.serialize();
 var b = await Minisketch.create({ fieldSize: 12, capacity: 4 });
 b.deserialize(aSerialized);
 a.addUint(300);
 var c = await Minisketch.create({ fieldSize: 12, capacity: 4 });
	return { a, b, aSerialized, c };
};
