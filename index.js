#!/usr/bin/env node

const { inspect } = require('util')

const id = (a) => a
const isTty = process.stdout.isTTY

const cols = (color, text) => {
  const codes = inspect.colors[color]
  return `\x1b[${codes[0]}m${text}\x1b[${codes[1]}m`
}

const colorize = () => {
  const val = {}
  Object.keys(inspect.colors).forEach((color) => {
    val[color] = (text) => cols(color, text)
  })
  return val
}

const colors = isTty
  ? colorize()
  : Object.keys(inspect.colors).reduce((prev, curr) => {
    prev[curr] = id
    return prev
  }, {})

const indent = isTty ? '  ' : ''

const zac = {
  Name: 'Zac Anger',
  Title: 'Senior Software Engineer',
  Web: 'https://zacanger.com',
  Resume: 'https://zacanger.com/resume',
  GitHub: 'https://github.com/zacanger'
}

const divider = '-'.repeat(42)

const { bold, green, blue, yellow } = colors
const infoString = `
${bold(blue(divider))}
${green(zac.Name)}
${green(zac.Title)}
${blue(divider)}
${Object.keys(zac)
  .reduce(
    (p, c) =>
      ['Name', 'Title'].includes(c)
        ? p + ''
        : p + `${bold(c)}: ${yellow(zac[c])}\n`,
    ''
  )
  .trim()}
${bold(blue(divider))}
`
  .trim()
  .split('\n')
  .reduce((p, c) => p + `${indent}${c}\n`, '')
  .trimEnd()

const main = () => {
  console.log(infoString)
}

if (require.main === module) {
  main()
} else {
  module.exports = zac
}
