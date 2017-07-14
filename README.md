# <http://zacanger.com/cv>

installation: `npm i -g zacanger`

```
  zacanger      # writes json in colour to your term
  zacanger -r   # writes raw json (for redirection or pipe)
  zacanger -h   # this help message
  zacanger -b   # blog link
  zacanger -n   # names
  zacanger -u   # website
  zacanger -p   # projects
                # example:
  zacanger -r | jq .links[9].url
```

to do something similar for yourself, just fork it and replace `zacanger.json` with
your own content, and change the name in `package.json`.

using functions from [rainbowify](https://github.com/maxogden/rainbowify) for colors
