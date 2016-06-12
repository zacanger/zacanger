#!/usr/bin/env node

const
  path = require('path')
, fs   = require('fs')

fs.createReadStream(path.resolve(__dirname, 'zacanger.json')).pipe(process.stdout)

