const nextChar = str => {
  const trimmed = str.trim();
  const num = parseInt(trimmed);
  const nextNum = num + 1;
  return String.fromCharCode(nextNum);
}

const Box = x =>
({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const result = Box('  64 ').map(abba => abba.trim())
                           .map(trimmed => new Number(trimmed))
                           .map(number => number + 1)
                           .map(x => String.fromCharCode(x))
                           .fold(x => x.toLowerCase())

console.log(result);

const LazyBox = g =>
({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g()))
})

const lazyResult = LazyBox(() => '  64 ').map(abba => abba.trim())
                           .map(trimmed => new Number(trimmed))
                           .map(number => number + 1)
                           .map(x => String.fromCharCode(x))

console.log(lazyResult);

// fold triggers the execution
console.log(lazyResult.fold(x => x.toLowerCase()))
