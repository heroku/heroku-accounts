'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const color = require('@heroku-cli/color')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  cli.warn(`This command is now available as part of the Heroku CLI. Uninstall this archived plugin by running ${color.cmd('heroku plugins:uninstall @heroku-cli/heroku-accounts')}.`)

  for (const account of accounts.list().map(a => a.name)) {
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
