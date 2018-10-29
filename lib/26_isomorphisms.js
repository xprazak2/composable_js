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
const { List, Map }= require('immutable-ext')

// isomorphism proves different types contain same amount of information
// String ~ [Char]
const Iso = (to, from) =>
({
  to,
  from
})

const chars = Iso(s => s.split(''), s => s.join(''))

const trunc = str =>
  chars.from(chars.to(str).slice(0, 3)).concat('...')

// [a] ~ Either null a
const singleton = Iso(e => e.fold(() => [], x => [x]),
                      ([x]) => x ? Right(x) : Left())

const filterEither = (e, pred) =>
  singleton.from(singleton.to(e).filter(pred))

const res = filterEither(Right('hello'), x => x.match(/h/ig))
            .map(x => x.toUpperCase())

console.log(res)