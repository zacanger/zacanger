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
  zacanger -r | jq .projects[4].url
```

using functions from [rainbowify](https://github.com/maxogden/rainbowify) for colors
