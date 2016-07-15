# <http://zacanger.com/cv>

installation: `npm i -g zacanger`

```
  zacanger      # writes json in colour to your term
  zacanger -r   # writes raw json (for redirection or pipe)
  zacanger -h   # this help message
  zacanger blog # blog link
  zacanger name # names
  zacanger url  # website
  zacanger work # projects
                # example:
  zacanger -r | jq .projects[3].url

```

using functions from [rainbowify](https://github.com/maxogden/rainbowify) for colors
