'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const netrc = require('netrc')()
const YAML = require('yamljs')
const mkdirp = require('mkdirp')

const basedir = path.join(os.homedir(), '.heroku', 'accounts')

function account (name) {
  let account = YAML.load(path.join(basedir, name))
  if (account[':username']) {
    // convert from ruby symbols
    account.username = account[':username']
    account.password = account[':password']
    delete account[':username']
    delete account[':password']
  }
  return account
}

function list () {
  try {
    return fs.readdirSync(basedir)
    .map(name => Object.assign(account(name), {name}))
  } catch (err) {
    return []
  }
}

function current () {
  let current = list().find(a => a.username === netrc['api.heroku.com'].login)
  return current ? current.name : null
}

function add (name, username, password) {
  mkdirp.sync(basedir)
  fs.writeFileSync(
    path.join(basedir, name),
    YAML.stringify({username, password}),
    'utf8'
  )
}

module.exports = {
  add,
  list,
  current
}
