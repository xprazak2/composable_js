const Right = x =>
({
  map: f => Right(f(x)),
  ap: right => right.map(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})

const Left = x =>
({
  map: f => Left(x),
  ap: left => left.map(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})

const fromNullable = x =>
  x != null ? Right(x) : Left(x)

const Box = x =>
({
  ap: box => box.map(x),
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

Box.of = x => Box(x);

const Task = require('data.task')

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

eitherToTask(Right('nigtingale'))
  .fork(e => console.error('err', e), r => console.log('res', r))

eitherToTask(Left('error'))
  .fork(e => console.error('err', e), r => console.log('res', r))

const boxToEither = b =>
  b.fold(Right)

console.log(boxToEither(Box(100)))

// nt(x).map(f) == nt(x.map(f))