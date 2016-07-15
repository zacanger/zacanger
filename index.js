#!/usr/bin/env node

'use strict'

const
  fs   = require('fs')
, out  = process.stdout
, path = require('path')
, fl   = require('./zacanger.json')
, me   = path.resolve(__dirname, 'zacanger.json')
, pkg  = require('./package.json')

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

const help = () =>
  out.write(`\x1b[36m
  zacanger      # writes json in colour to your term
  zacanger -r   # writes raw json (for redirection or pipe)
  zacanger -h   # this help message
  zacanger blog # blog link
  zacanger name # names
  zacanger url  # website
  zacanger work # projects
                # example:
  zacanger -r | jq .projects[3].url

\x1b[0m`)

const version = () =>
  out.write(`\x1b[33mzacanger version ${pkg.version}\x1b[0m`)

const go = () =>
  fs.readFileSync(me).toString().split('\n').map(a =>
    out.write(col(a) + '\n'))

if (process.argv[2]) {
  const arg = process.argv[2]
  switch (arg) {
    case '-r':
    case '--raw':
      return fs.createReadStream(me).pipe(out)
      break
    case '-v':
    case '--version':
      return version()
      break
    case 'names':
    case 'name':
      console.log(fl.names)
      break
    case 'status':
    case 'employed':
      console.log(fl.status)
      break
    case 'website':
    case 'url':
      console.log(fl.website)
      break
    case 'blog':
    case 'writing':
      console.log(fl.writing)
      break
    case 'projects':
    case 'work':
      console.log(fl.projects)
      break
    case 'links':
      console.log(fl.links)
      break
    default:
      return help()
      }
} else {
  return go()
}
