#!/usr/bin/env node

const colors = require('zeelib/lib/colorize').default

const zac = {
  Name: 'Zac Anger',
  Title: 'Senior DevOps Engineer',
  Web: 'https://zacanger.com',
  CV: 'https://zacanger.com/cv',
  GitHub: 'https://github.com/zacanger',
  LinkedIn: 'https://linkedin.com/in/zacanger',
  Email: 'zac@zacanger.com',
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
  .reduce((p, c) => p + `    ${c}\n`, '')
  .trimEnd()

const main = () => {
  console.log(infoString)
}

if (module.parent) {
  module.exports = zac
} else {
  main()
}
