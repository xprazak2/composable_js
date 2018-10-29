const fs = require('fs')
const Task = require('data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) =>
  Task.of(`${path}: result  `)

Map({ home: '/', about: '/about', blog: '/blog' })
  .traverse(Task.of, route => httpGet(route, {}))
  .fork(console.error, console.log)


Map({ home: ['/', '/home'], about: ['/about'] })
  .traverse(Task.of, routes =>
    List(routes).traverse(Task.of, route => httpGet(route, {})))
  .fork(console.error, console.log)
