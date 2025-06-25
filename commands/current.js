'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  cli.warn('This command is now available as part of the Heroku CLI and this plugin has been archived. Please uninstall this plugin by running `heroku plugins:uninstall @heroku-cli/heroku-accounts`.')
  
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
