<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47579833-709f5700-d94d-11e8-9302-cd303c6d3ddf.gif" width="120" height="136">
  <br />  <br />
  <img src="https://user-images.githubusercontent.com/528550/47447802-b679e500-d7be-11e8-82a0-e446cd06b991.jpg" width="374" height="61" />
</p>
<br />
<br />

<p align="center">
  <a href="https://travis-ci.org/entwicklerstube/takeoff"><img alt="Build Status" src="https://travis-ci.org/entwicklerstube/takeoff.svg?branch=master" /></a>
  <a href="https://www.npmjs.com/package/takeoff-cli"><img alt="npm Version" src="https://img.shields.io/npm/v/takeoff-cli.svg" /></a>
  <a href="https://coveralls.io/github/entwicklerstube/takeoff"><img alt="Coverage Status" src="https://coveralls.io/repos/github/entwicklerstube/takeoff/badge.svg"/></a>
  <a href="https://snyk.io/test/github/entwicklerstube/takeoff?targetFile=package.json"><img alt="Known Vulnerabilities" src="https://snyk.io/test/github/entwicklerstube/takeoff/badge.svg?targetFile=package.json"/></a>
  <a href="https://prettier.io/"><img alt="Code style" src="https://img.shields.io/badge/codestyle-prettier-blue.svg"/></a>
  <a href="https://github.com/entwicklerstube/takeoff/"><img alt="Github" src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat"/></a>
</p>

> 🚀 takeoff is the perfect tool if you want to automate workflows with a command line integration.

## Features

- 💁‍ Ultra-Easy™ requiring only two properties (`get`, `exec`)
- 🔌 Plug & Play
- 💎 No configuration required
- 🌟 You can install it globaly or project-based
- 🧙‍ One Dependency to rule them all
- 📦 Shipped with a bunch of useful utils
- 🔍 Detects valid stations up the tree
- ⏱ Save time by automating your workflow
- 🕹 Interactive mode
- 💚 Full tested with coverage check
- ⚡️ Battle-tested, its used in several >1000 employee companies

## Install

🤭 This thing is so alpha that we didn't even publish it on npm

## Usage

Checkout some examples how takeoff can be used

**Basic example**

```js
module.exports = {
  get: 'firstname',
  exec: name => {
    console.log(`👋 Hello ${name}`);
  }
};
```

**Create a folder in the current directory**

## Utils

|                |     Name      | Description                                 |     |
| -------------- | :-----------: | ------------------------------------------- | --: |
| **Cases**      |               |                                             |     |
|                |  `Camelcase`  | Changes the case of a string to _camelCase_ |  ✅ |
|                |  `Paramcase`  |                                             |  ✅ |
|                | `Pascalcase`  |                                             |  ✅ |
|                |  `Snakecase`  |                                             |  ✅ |
| **FileSystem** |               |                                             |     |
|                | `GetFileTree` | Returns a file-tree based from the          |  🔨 |

[» Checkout the documentation for more details](utils/UTILS.md)

## Contribute

To contribute clone the repo

```
$ git clone git@github.com:entwicklerstube/takeoff.git
```

Now you've two ways, either you run the tests:

```
$ npm test
```

or you build it and execute takeoff localy

```
$ npm run build
$ node takeoff.js
```

#### Debug

We're using the package [`debug`](https://www.npmjs.com/package/debug), so its enough to just set use the env variable DEBUG with an globa like:

```
$ DEBUG=* node takeoff.js
```

## FAQ

<details><summary>Is Windows supported?</summary>
  <img src="https://user-images.githubusercontent.com/528550/47322882-e52a7b00-d659-11e8-9f59-b3778a448196.gif" />
  <p>
    Maybe, its not tested on Windows, since takeoff works a lot with the OS`file-system its more likely that there is something not working. If you step on a bug on windows just create an issue and describe it.
  </p>
</details>

<details><summary>What about Yeoman or Slush??</summary>
  <p>
    Those tools are really great and you can do everything you can do with takeoff also with ones of these. The big difference
    between other tools like them and takeoff is the focus on the maximum simple API and the focus of maximum CLI customisation.
  </p>
</details>
