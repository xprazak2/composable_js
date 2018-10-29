const openSite = () => {
  if (currentUser) {
    return renderPage(currentUser);
  } else {
    return showLogin();
  }
}

const openSite = () =>
  fromNullable(currentUser)
  .fold(showLogin, renderPage);

//

const getPrefs = (user) => {
  if (user.premium) {
    return loadPrefs(user.preferences)
  } else {
    return defaultPrefs;
  }
}

const getPrefs = (user) =>
  (user.premium ? Right(user) : Left('not premium'))
  .map(u => u.preferences)
  .fold(() => defaultPrefs, prefs => loadPrefs(prefs))

//

const streetName = user => {
  const address = user.address;

  if (address) {
    const street = address.street;
    if (street) {
      return street.name;
    }
  }
  return 'no street';
}

const streetName = user =>
  fromNullable(user.address)
  .chain(add => fromNullable(add.street))
  .map(s => s.name)
  .fold(e => 'no street', n => n)

//

const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0]
  return found ? ys : ys.concat(x)
}

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
  .fold(() => ys.concat(x), y => ys)

//

const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath)
    } catch(e) {}
    return example;
  }
}

const readFile = x => tryCatch(() => fs.readFileSync(x));

const wrapExamples = example =>
  fromNullable(example.previewPath)
  .chain(readFile)
  .fold(() => example, preview => Object.assign(example, { preview }))

//

const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg)
    if (c.url) {
      return c.url.match(/regex/)
    }
  } catch(e) {
    retun null;
  }
}

const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
  .chain(c => fromNullable(c.url))
  .fold(e => null, url => url.match(/regex/));