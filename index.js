#!/usr/bin/env node

if (module.parent) {
  module.exports = require('./lib').zac
} else {
  require('./lib').main()
}
