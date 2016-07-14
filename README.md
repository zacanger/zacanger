# <http://zacanger.com/cv>

installation: `npm i -g zacanger`

```shell
  zacanger      # writes json in colour to your term
  zacanger -r   # writes raw json (for redirection or pipe)
  zacanger -h   # this help message
                # example:
  zacanger -r | jq .projects[0].description
```

using functions from [rainbowify](https://github.com/maxogden/rainbowify) for colors
