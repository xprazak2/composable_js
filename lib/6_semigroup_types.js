// semigroup is a type with concat method
// concat has associativity

const Sum = x =>
({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

const res = Sum(1).concat(Sum(2))
console.log(res);

const All = x =>
({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

const result = All(true).concat(All(false))
console.log(result)

const First = x =>
({
  x,
  concat: y => First(x),
  inspect: () => `First(${x})`
})

const out = First('first').concat(First('second'))
console.log(out)