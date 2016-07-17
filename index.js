#!/usr/bin/env node

'use strict'

const
  fs   = require('fs')
, out  = process.stdout
, path = require('path')
, fl   = require('./zacanger.json')
, pkg  = require('./package.json')
, me   = path.resolve(__dirname, 'zacanger.json')
, log  = i  => console.log(i)

const help = `\x1b[36m
  zacanger      # writes json in colour to your term
  zacanger -r   # writes raw json (for redirection or pipe)
  zacanger -h   # this help message
  zacanger -b   # blog link
  zacanger -n   # names
  zacanger -u   # website
  zacanger -p   # projects
                # example:
  zacanger -r | jq .projects[4].url
\x1b[0m`

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

const go = () =>
  fs.readFileSync(me).toString().split('\n').map(a =>
    out.write(col(a) + '\n'))

if (process.argv[2]) {
  const arg = process.argv[2]
  switch (arg) {
    case '-r':
    case '--raw':
    case 'raw':
      return fs.createReadStream(me).pipe(out)
      break
    case '-v':
    case '--version':
    case 'version':
      log(`zacanger version ${pkg.version}`)
      break
    case '-n':
    case 'names':
    case 'name':
      log(fl.names)
      break
    case '-s':
    case 'status':
    case 'employed':
      log(fl.status)
      break
    case '-w':
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
      log(fl.projects)
      break
    case '-l':
    case 'links':
      log(fl.links)
      break
    default:
      log(help)
    }
} else {
  return go()
}
