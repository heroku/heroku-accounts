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

  let auth = yield cli.login({sso: context.flags.sso, skipLogout: true})
  accounts.add(name, auth.email, auth.token)
}

module.exports = {
  topic: 'accounts',
  command: 'add',
  args: [{name: 'name'}],
  flags: [{name: 'sso', description: 'login for enterprise users under SSO'}],
  run: cli.command(co.wrap(run))
}
