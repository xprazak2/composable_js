const Task = require('data.task')

const fs = require('fs')

const app = () => {
  fs.readFile('configs.json', 'utf-8', (err, contents) => {
    if (err) throw err;

    const newContents = contents.replace(/5/g, '6')

    fs.writeFile(configs1.json, newContents, (err, _) => {
      if (err) throw err;

      console.log(success)
    })
  })
}


const readFile = (filename, enc) =>
  new Task((rej, res) =>
    fs.readFile(filename, enc, (err, contents) =>
      err ? rej(err) : res(contents)))

const writeFile = (filename, contents) =>
  new Task((rej, res) =>
    fs.readFile(filename, contents, (err, success) =>
      err ? rej(err) : res(success)))

const appRefactored =
  readFile('configs.json', 'utf-8')
  .map(contents =>  contents.replace(/5/g, '6'))
  .chain(contents => writeFile('configs1.json', contents))


appRefactored.fork(e => console.log(e), x => console.log('success'))