const { List, Map } = require('immutable-ext')
const Task = require('data.task')

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

const fromNullable = x =>
  x != null ? Right(x) : Left(x)

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

// functor is a type with a map method
// rules it must follow

// preserve function composition
fx.map(f).map(g) == fs.map(x => g(f(x)))
