// nested loops can be captured by applicative functors

const { List } = require('immutable-ext');

const res = List.of(x => x).ap(List([1, 2, 3]));

console.log(res);

const merch = () =>
  List.of(x => y => `${x}-${y}`)
  .ap(List(['beans', 'pineapple']))
  .ap(List(['large', 'medium']))

console.log(merch());
