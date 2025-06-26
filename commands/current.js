'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const color = require('@heroku-cli/color')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  cli.warn(`This command is now available as part of the Heroku CLI. Uninstall this archived plugin by running ${color.cmd('heroku plugins:uninstall @heroku-cli/heroku-accounts')}.`)

  const account = accounts.current()
  if (account) {
    cli.log(`${account}`)
  } else {
    cli.log('no account is set')
  }
}

module.exports = {
  topic: 'accounts',
  command: 'current',
  run: cli.command(co.wrap(run))
}
