const Sum = x =>
({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
})

Sum.empty = () => Sum(0);

const { Map, List } = require('immutable-ext')

const res = [Sum(1), Sum(2), Sum(3)].reduce((memo, item) => memo.concat(item), Sum.empty())
// same thing is
const result = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty())


const mapResult = Map({ brian: Sum(3), sara: Sum(5) }).fold(Sum.empty());

const mappedResult = Map({ brian: 3, sara: 5 }).map(Sum).fold(Sum.empty());

const foldMappedResult = Map({ brian: 3, sara: 5 }).foldMap(Sum, Sum.empty());


console.log(res);
console.log(result);
console.log(mapResult);
console.log(mappedResult);
console.log(foldMappedResult);
