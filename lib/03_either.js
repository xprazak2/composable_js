const Right = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const Either = Right || Left;

const fromNullable = x =>
  x != null ? Right(x) : Left(x)

const findColor = name =>
  fromNullable({ red: 'red', blue: 'blue', yellow: 'yellow' }[name]);

const resultRight = Right(3).map(x => x + 3).fold(x => 'error', x => x)
const resultLeft = Left(3).map(x => x + 3).fold(x => 'error', x => x)
console.log(resultRight);
console.log(resultLeft);

const colLeft = findColor('green').map(c => c.slice(1)).fold(c => 'no color', c => c.toUpperCase());
const colRight = findColor('blue').map(c => c.slice(1)).fold(c => 'no color', c => c.toUpperCase());
console.log(colLeft);
console.log(colRight);
