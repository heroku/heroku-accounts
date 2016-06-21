'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  const {name} = context.args
  if (accounts.list().find(a => a.name === name)) {
    cli.error(`${name} already exists`)
    cli.exit(1)
  }

  let auth = yield cli.login()
  accounts.add(name, auth.user.email, auth.access_token.token)
}

module.exports = {
  topic: 'accounts',
  command: 'add',
  args: [{name: 'name'}],
  run: cli.command(co.wrap(run))
}
