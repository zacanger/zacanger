// @ts-nocheck
import colorize from 'zeelib/lib/colorize'

const id = <T>(a: T): T => a
type Colors = {
  blue: (s: string) => string
  bold: (s: string) => string
  green: (s: string) => string
  yellow: (s: string) => string
}

const colors: Colors = process.stdout.isTTY
  ? colorize
  : Object.keys(colorize).reduce((prev, curr) => {
      // eslint-disable-next-line fp/no-mutation
      prev[curr] = id
      return prev
    }, {})

const indent = process.stdout.isTTY ? '    ' : ''

export const zac = {
  Name: 'Zac Anger',
  Title: 'Senior DevOps Engineer',
  Web: 'https://zacanger.com',
  CV: 'https://zacanger.com/cv',
  GitHub: 'https://github.com/zacanger',
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

export const main = () => {
  console.log(infoString)
}
