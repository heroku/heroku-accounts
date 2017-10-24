'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const Netrc = require('netrc')
const YAML = require('yamljs')
const mkdirp = require('mkdirp')

function configDir () {
  const legacyDir = path.join(os.homedir(), '.heroku')
  if (fs.existsSync(legacyDir)) {
    return legacyDir
  }
  return path.join(os.homedir(), '.config', 'heroku')
}

const basedir = path.join(configDir(), 'accounts')

const netrcfile = process.platform === 'win32' ? '_netrc' : '.netrc'
const netrcpath = path.join(os.homedir(), netrcfile)
const netrc = Netrc(netrcpath)

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
  if (netrc['api.heroku.com']) {
    let current = list().find(a => a.username === netrc['api.heroku.com'].login)
    return current ? current.name : null
  } else {
    return null
  }
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

  // see https://github.com/camshaft/netrc/blob/44290a902b21c8fea2f1c051db1d1350630aa15c/index.js#L101
  var data = Netrc.format(netrc) + '\n'
  fs.writeFileSync(netrcpath, data)
}

module.exports = {
  add,
  current,
  list,
  remove,
  set
}
