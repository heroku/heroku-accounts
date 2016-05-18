# Heroku Accounts

Helps use multiple accounts on Heroku.

## Installation

    $ heroku plugins:install heroku-accounts

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
