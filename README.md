<p align="center">
<br>
<a href="https://github.com/jebkor/support-me" target="_blank"><img src="https://badgen.net/badge/support%20me/donate/ff69b4?maxAge=2592000&amp;style=flat" alt="donate"></a>
</p>


## Introduction

BattleTrackr.io is an web application made for all Dungeon Masters, Game Masters and the likes. It's a digital tool made to simplify the task of keeping track of the current health of the foes on the battlefield.

<br/>

## Gothcas
A small list of known gotchas within the project

### Font Awesome
I am using FontAwesome Pro in this project, but because I don't want the API key to be publicly known, there should be no references in the project. This means that the NPM registry responsible for serving the package can't be reached if you clone the project, so you will have to install the free versions of the Font Awesome icons, and change the ones I use already.
You can read more [here](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)

### http-server
To have the localhost server being able to run, you need to install the NPM module 'http-server'. To install, run:
```bash
npm install -g http-server
```

<br/>

# Development

## Issues
All improvement, feature or bug must be related to a ticket on github. Each commit must contain on the first row the name and ticket id of the issue related to the change.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

<br/>

## Production
Once a feature is ready and tested, the admin will merge it into the master branch. There is no auto-deploy to the servers.


## Author

**BattleTrackr.io** © [jebkor](https://github.com/jebkor), Released under the [MIT](https://opensource.org/licenses/MIT) License.<br>
Authored and maintained by @jebkor.

> [jebkor.dk](https://jebkor.dk) · GitHub [@jebkor](https://github.com/jebkor) · Twitter [@jebkor_](https://twitter.com/jebkor_)
