#!/usr/bin/env node

const colorize = require('zeelib/lib/colorize').default
const id = (a) => a
const isTty = process.stdout.isTTY

const colors = isTty
  ? colorize
  : Object.keys(colorize).reduce((prev, curr) => {
    prev[curr] = id
    return prev
  }, {})

const indent = isTty ? '    ' : ''

const zac = {
  Name: 'Zac Anger',
  Title: 'Software and DevOps Engineer, Musician',
  Web: 'https://zacanger.com',
  CV: 'https://zacanger.com/cv',
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

if (module.parent) {
  module.exports = zac
} else {
  main()
}
