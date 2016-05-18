'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  for (let account of accounts.list().map(a => a.name)) {
    if (account === accounts.current()) {
      cli.log(`* ${account}`)
    } else {
      cli.log(`  ${account}`)
    }
  }
}

module.exports = {
  topic: 'accounts',
  run: cli.command(co.wrap(run))
}
