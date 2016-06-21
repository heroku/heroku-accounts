'use strict'

exports.topic = {
  name: 'accounts',
  description: 'manage multiple heroku accounts'
}

exports.commands = [
  require('./commands'),
  require('./commands/add')
]
