const Box = x =>
({
  ap: box => box.map(x),
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

Box.of = x => Box(x);

// applicative functors have an .ap method
// F(x).map(f) == F(f).ap(F(x))

const res = Box(x => x + 1).ap(Box(2))

console.log(res);

const add = x => y => x + y;

const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy)

console.log(liftA2(add, Box(2), Box(3)))