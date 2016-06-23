#!/usr/bin/env node

const
  fs   = require('fs')
, out  = process.stdout
, path = require('path')
, me   = path.resolve(__dirname, 'zacanger.json')

fs.createReadStream(me).pipe(out)
