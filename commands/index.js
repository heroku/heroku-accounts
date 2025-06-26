'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  cli.warn('This command is now available as part of the Heroku CLI and this plugin has been archived. Please uninstall this plugin by running `heroku plugins:uninstall @heroku-cli/heroku-accounts`.')

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
