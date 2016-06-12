#!/usr/bin/env node

const
  path = require('path')
, fs   = require('fs')
, me   = path.resolve(__dirname, 'zacanger.json')
, out  = process.stdout

fs.createReadStream(me).pipe(out)

