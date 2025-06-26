'use strict'

const cli = require('heroku-cli-util')
const co = require('co')
const color = require('@heroku-cli/color')
const accounts = require('../lib/accounts')

function * run (context, heroku) {
  cli.warn(`This command is now available as part of the Heroku CLI. Uninstall this archived plugin by running ${color.cmd('heroku plugins:uninstall @heroku-cli/heroku-accounts')}.`)

  const { name } = context.args
  if (accounts.list().find(a => a.name === name)) {
    cli.error(`${name} already exists`)
    cli.exit(1)
  }

  const auth = yield cli.login({ sso: context.flags.sso, skipLogout: true })
  accounts.add(name, auth.email, auth.token)
}

module.exports = {
  topic: 'accounts',
  command: 'add',
  args: [{ name: 'name' }],
  flags: [{ name: 'sso', description: 'login for enterprise users under SSO' }],
  run: cli.command(co.wrap(run))
}
