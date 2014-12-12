# Heroku Accounts

Helps use multiple accounts on Heroku.

## Installation

    $ heroku plugins:install https://github.com/heroku/heroku-accounts.git

## Usage

To add accounts:

    $ heroku accounts:add personal
    Enter your Heroku credentials.
    Email: david@heroku.com
    Password: ******

To switch to a different account:

    $ heroku accounts:set personal

To list accounts:

    $ heroku accounts
    * personal
    work

To remove an account:

    $ heroku accounts:remove personal
    Account removed: personal

## Notes

This plugin is a fork of https://github.com/ddollar/heroku-accounts. The previous version did not support http-git which is now the Heroku default.

This plugin will be officially supported and maintained by Heroku.
