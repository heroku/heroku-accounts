'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const Netrc = require('netrc')
const netrc = Netrc()
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
  fs.chmodSync(path.join(basedir, name), 0o600)
}

function remove (name) {
  fs.unlinkSync(path.join(basedir, name))
}

function set (name) {
  let current = account(name)
  netrc['git.heroku.com'] = netrc['api.heroku.com'] = {}
  netrc['git.heroku.com'].login = netrc['api.heroku.com'].login = current.username
  netrc['git.heroku.com'].password = netrc['api.heroku.com'].password = current.password
  Netrc.save(netrc)
}

module.exports = {
  add,
  current,
  list,
  remove,
  set
}
