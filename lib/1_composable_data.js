const nextChar = str => {
  const trimmed = str.trim();
  const num = parseInt(trimmed);
  const nextNum = num + 1;
  return String.fromCharCode(nextNum);
}

const result = nextChar('  64 ');

// console.log(result);
//

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const nextCharRefactored = str =>
  Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .fold(i => String.fromCharCode(i))

const res = nextCharRefactored('  64 ');
console.log(res);

