#!/usr/bin/env node

'use strict'

const
  fs   = require('fs')
, path = require('path')
, out  = process.stdout
, arg  = process.argv[2]
, pkg  = require('./package.json')
, t    = pkg.name
, fl   = require(`./${t}.json`)
, me   = path.resolve(__dirname, `${t}.json`)
, log  = a => console.log(a)

const help = `\x1b[36m
  ${t}      # writes json in colour to your term
  ${t} -r   # writes raw json (for redirection or pipe)
  ${t} -h   # this help message
  ${t} -b   # blog link
  ${t} -n   # names
  ${t} -u   # website
  ${t} -p   # projects
                # example:
  ${t} -r | jq .projects[4].url
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

if (arg) {
  switch (arg) {
    case '-r':
    case '--raw':
    case 'raw':
      return fs.createReadStream(me).pipe(out)
      break
    case '-v':
    case '--version':
    case 'version':
      log(`${t} version ${pkg.version}`)
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
