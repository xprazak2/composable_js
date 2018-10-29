const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''))

const percentToFloat = str => {
  const replaced = str.replace(/\$/g, '')
  const num = parseFloat(replaced)
  return num * 0.01
}

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cost - cost * savings;
}

const result = applyDiscount('$5.00', '20%')
// console.log(result);

const moneyToFloatRefactored = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(s => parseFloat(s))

const percentToFloatRefactored = str =>
  Box(str.replace(/\$/g, ''))
    .map(n => parseFloat(n))
    .map(n => n * 0.01)

// nesting with closures to work with multiple vars in box
const applyDiscountRefactored = (price, discount) =>
  moneyToFloatRefactored(price)
  .fold(cost =>
    percentToFloatRefactored(discount)
    .fold(savings =>
      cost - cost * savings))

const res = applyDiscountRefactored('$5.00', '20%')

console.log(res);