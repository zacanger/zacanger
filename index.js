#!/usr/bin/env node

'use strict'

const { readFileSync, createReadStream } = require('fs')
const { resolve } = require('path')
const out = process.stdout
const arg = process.argv[2]
const pkg = require('./package.json')
const t = pkg.name
const fl = require(`./${t}.json`)
const me = resolve(__dirname, `${t}.json`)
const log = a => console.log(a)
const logJ = a => console.log(JSON.stringify(a, null, 2))
const v = `${t} version ${pkg.version}`

const help = `\x1b[36m
  ${t}      # writes json in colour to your term
  ${t} -r   # writes raw json (for redirection or pipe)
  ${t} -h   # this help message
  ${t} -b   # blog link
  ${t} -n   # names
  ${t} -u   # website
  ${t} -p   # projects
                # example:
  ${t} -r | jq .links[3].url
\x1b[0m`

// rainbow -- see npm.im/rainbowify
const gencolors = () => {
  const colors = []
  for (let i = 0; i < (6 * 7); i++) {
    const
      pi3 = Math.floor(Math.PI / 3)
    , n   = (i * (1.0 / 6))
    , r   = Math.floor(3 * Math.sin(n) + 3)
    , g   = Math.floor(3 * Math.sin(n + 2 * pi3) + 3)
    , b   = Math.floor(3 * Math.sin(n + 4 * pi3) + 3)
    colors.push(36 * r + 6 * g + b + 16)
  }
  return colors
}
const rainbowColors = gencolors()
let colorIndex = 0
const col = str => {
  const color = rainbowColors[colorIndex % rainbowColors.length]
  colorIndex += 1
  return `\u001b[38;5;${color}m${str}\u001b[0m`
}

// runs the json through rainbow bit, writes to stdout
const go = () => {
  console.log('\x1Bc')
  readFileSync(me).toString().split('\n').map(a =>
      out.write(col(a) + '\n'))
}

// handle arguments and run
if (arg) {
  switch (arg) {
    case '-r':
    case '--raw':
    case 'raw':
      return createReadStream(me).pipe(out)
    case '-v':
    case '--version':
    case 'version':
      log(v)
      break
    case '-n':
    case 'names':
    case 'name':
      logJ(fl.names)
      break
    case '-s':
    case 'status':
    case 'employed':
      log(fl.status)
      break
    case '-w':
    case '-u':
    case 'website':
    case 'url':
      log(fl.website)
      break
    case '-b':
    case 'blog':
    case 'writing':
      log(fl.writing)
      break
    case '-p':
    case 'projects':
    case 'work':
      logJ(fl.projects)
      break
    case '-l':
    case 'links':
      logJ(fl.links)
      break
    default:
      log(help)
  }
} else {
  return go()
}
