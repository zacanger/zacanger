#!/usr/bin/env node

const colorize = require('zeelib/lib/colorize').default

const id = (a) => a

const colors = process.stdout.isTTY
  ? colorize
  : Object.keys(colorize).reduce((prev, curr) => {
    prev[curr] = id
    return prev
  }, {})

const indent = process.stdout.isTTY ? '    ' : ''

const zac = {
  Name: 'Zac Anger',
  Title: 'Software and DevOps Engineer',
  Web: 'https://zacanger.com',
  CV: 'https://zacanger.com/cv',
  GitHub: 'https://github.com/zacanger'
}

const divider = '-'.repeat(42)

const infoString = `
${colors.bold(colors.blue(divider))}
${colors.green(zac.Name)}
${colors.green(zac.Title)}
${colors.blue(divider)}
${Object.keys(zac)
  .reduce(
    (p, c) =>
      ['Name', 'Title'].includes(c)
        ? p + ''
        : p + `${colors.bold(c)}: ${colors.yellow(zac[c])}\n`,
    ''
  )
  .trim()}
${colors.bold(colors.blue(divider))}
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
