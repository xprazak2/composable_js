const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy)

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

const Either = Right || Left;

Either.of = x => Right(x);

const $ = selector =>
  Either.of({ selector, height: 10 })

const getScreenSize = screen => head => foot =>
  screen - (head.height + foot.height)

// would work but is sequential
// $('header').chain(head =>
//   $('footer').map(footer =>
//     getScreenSize(800, head, footer)))

const res = Either.of(getScreenSize(800))
            .ap($('header'))
            .ap($('footer'))

console.log(res);

console.log(liftA2(getScreenSize(800), $('header'), $('footer')));
