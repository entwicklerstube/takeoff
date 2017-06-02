![Takeoff](https://mjz.io/CsgV4.png)

[![Build Status](https://travis-ci.org/entwicklerstube/takeoff.svg?branch=master)](https://travis-ci.org/entwicklerstube/takeoff)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
![Node Version 7](https://img.shields.io/badge/node-v7-green.svg)

Scaffold structures - predefined or custom

### Install
```
npm install takeoff-cli -g
```

### Usage
```
  Usage
    $ takeoff <station>

  If no station is given a interactive cli prompt will ask you which station you want.

  Examples
    $ takeoff
    - or
    $ takeoff node-module
```

### Interactive UI
![Takeoff Node-Module](https://mjz.io/EtRW9.gif)
_Example of the `node-module` station_


### Stations
<p><details>
<summary><code>node-module</code></summary>

**Contains**
- `README.md`
- `package.json`
- `index.js`
- `license` (choose between mit, gnu or apache)
- `babel` _optional_
- `.git` _optional_
- `create project folder` _optional_
- `mocha` _optional_
- `ava` _optional_
- `xo` _optional_
- `standard` _optional_
- `travis.yml` _optional_

</details></p>

<p><details>
<summary><code>react-starter-kit</code></summary>
It uses the latest version of the awesome [`react-starter-kit`](https://github.com/kriasoft/react-starter-kit) project.

Tree after process:
```cl
- .editorconfig
- .eslintrc.js
- .flowconfig
- .git
- .gitattributes
- .gitignore
- .nycrc
- .stylelintrc.js
- .travis.yml
- CHANGELOG.md
- CONTRIBUTING.md
- Dockerfile
- LICENSE.txt
- README.md
- docs
- node_modules
- package.json
- public
- src
- test
- tools
- yarn.lock
```

</details></p>

[Create your own station!](https://github.com/entwicklerstube/takeoff/wiki/Create-a-station)

## Credits
- Take a look in the [`yarn.lock`](https://github.com/entwicklerstube/takeoff/blob/master/yarn.lock) and see how many open source modules this projects requires.. :heart:
- [Rocket-Icon](https://thenounproject.com/search/?q=rocket&i=865894) by [Aneeque Ahmed](https://thenounproject.com/aneeque/)

## Author

Michael J. Zoidl ([@michaelzoidl](https://twitter.com/michaelzoidl)) - [entwicklerstube](https://entwicklerstube.com)
