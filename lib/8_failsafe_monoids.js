const All = x =>
({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

const Sum = x =>
({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0);
All.empty = () => All(true);

// semigroup with identity is a monoid

const First = x =>
({
  x,
  concat: y => First(x),
  inspect: () => `First(${x})`
})
// cannot define identity for First('?').concat(First('second'))

const sum = xs =>
  xs.reduce((memo, item) => memo + item, 0);

const all = xs =>
  xs.reduce((memo, item) => memo && item, true);