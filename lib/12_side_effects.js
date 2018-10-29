const Task = require('data.task')

Task.of(1).fork(e => console.log('err', e), x => console.log('succ', x));

Task.rejected(1).fork(e => console.log('err', e), x => console.log('succ', x));
// behaves lika left
Task.rejected(1).map(x => x + 1).fork(e => console.log('err', e), x => console.log('succ', x));


const launchMissiles = () =>
  new Task((reject, resolve) => {
    console.log('Launch missiles');
    resolve('missile');
  })

launchMissiles().map(x => x + "!").fork(e => console.log('err', e), x => console.log('succ', x));