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

//
const { List } = require('immutable-ext')

const res = List(['hello', 'world']).chain(x => List(x.split('')))
console.log(res);
//

const first = xs =>
  fromNullable(xs[0])

const largeNumbers = xs =>
  xs.filter(x => x > 100)

const larger = x =>
  x * 2

const app = xs =>
  first(largeNumbers(xs).map(larger))

const appRef = xs =>
  first(largeNumbers(xs)).map(larger)

console.log(app([2, 400, 5, 1000]))
console.log(appRef([2, 400, 5, 1000]))
//

const fake = id =>
  ({ id: id, name: 'user', best_friend_id: id + 1 })

const Db = ({
  find: id =>
    new Task((rej, res) =>
      res(id > 2 ? Right(fake(id)) : Left('not found')))
})

Db.find(3)
.chain(either =>
  either.map(user => Db.find(user.best_friend_id)))

Db.find(3)
.chain(eitherToTask)
.chain(user =>
  Db.find(user.best_friend_id))
.chain(eitherToTask)
.fork(console.error, console.log)