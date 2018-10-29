const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')

const readFile = futurize(fs.readFile);

const files = ['box.json', 'config.json']
const res = files.map(fn => readFile(fn, 'utf-8'))
console.log(res);

// we want to turn [Task] into Task([])

const listFiles = List(['box.json', 'config.json'])
const resAgain = listFiles.traverse(Task.of, fn => readFile(fn, 'utf-8'))
                          .fork(console.error, console.log)
