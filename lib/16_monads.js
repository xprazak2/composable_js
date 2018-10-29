//  monads have .of and .chain functions

// httpGet('user')
//   .chain(user =>
//     httpGet(`/comments/${user.id}`)
//     .chain(comments =>
//       updateDOM(user, comments)))

const Box = x =>
({
  map: f => Box(f(x)),
  chain: f => f(x),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});


Box.of = x => Box(x);

const join = m =>
  m.chain(x => x)

// join(m.map(join)) == join(join(m))

const m = Box(Box(Box(3)))
const res1 = join(m.map(join))
const res2 = join(join(m))
console.log(res1, res2)

const n = Box('wonder')
const r1 = join(Box.of(n))
const r2 = join(n.map(Box.of))

console.log(r1, r2)