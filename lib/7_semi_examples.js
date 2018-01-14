const { Map } = require('immutable-ext');

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

const First = x =>
({
  x,
  concat: y => First(x),
  inspect: () => `First(${x})`
})

const acc1 = { name: 'Nico', isPaid: true, points: 10, friends: ['Franklin'] };
const acc2 = { name: 'Nico', isPaid: false, points: 2, friends: ['Gatsby'] };

//

const account1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] });
const account2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] });

const res = account1.concat(account2);
console.log(res.toJS());