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
- 📦 Shipped with a bunch of useful utils
- 🔍 Detects valid stations up the tree
- ⏱ Save time by automating your workflow
- 🕹 Interactive mode
- 💚 Full tested with coverage check
- ⚡️ Battle-tested, its used in several >1000 employee companies

## Install

**npm**

```
npm install takeoff-cli@next -g
```

**yarn**

```
yarn global add takeoff-cli@next -g
```

**npx**

```
npx takeoff-cli@next
```

**Project based**

> Sometimes you don't want to install things global, you can also install takeoff only in specific projects

```
npm install takeoff-cli@next --save-dev
```

Add to `scripts` in `package.json`:

```json
{
  "scripts": {
    "takeoff": "takeoff-cli"
  }
}
```

Then use takeoff in the project with:

```
npm run takeoff
```

## Usage

> Simple example which shows how fast you can create a automation

1. Create a file: `.takeoff/basic-example.js`

```js
const { createFile, paramCase } = require('takeoff/utils');

module.exports = {
  get: 'util-name',
  exec: async ({ utilName }) => {
    await createFile(
      `utils/${paramCase(utilName)}.js`,
      `console.log('My Util is ${utilName}')`
    );
  }
};
```

2. Run `takeoff` in the folder

<p align="center">
<img width="800" src="https://user-images.githubusercontent.com/528550/52242607-6fc87a80-28d7-11e9-8095-19e2f4e713b9.gif" />
</p>

## API

#### Station

> A station is a `object` which can have the following properties

| Property      |   Type   | Required? | Description                                                                        |
| ------------- | :------: | :-------: | ---------------------------------------------------------------------------------- |
| `get`         |    \*    |     ✓     | This will generate the prompts in the terminal                                     |
| `exec`        | Function |     ✓     | Function starts when all `get` prompts are filled. Async and Promises are possible |
| `name`        |  String  |           | Give the station a better name (default is the filename of the station)            |
| `description` |  String  |           | Add a short description which will be shown beside the name in the CLI             |

**Advanced Example**

```js
{
  name: 'Get name',
  description: 'Ask for user details',
  get: [
    'Firstname',
    'Lastname',
    () => [
      'Age',
      () => new Promise(resolve => {
        setTimeout(() => {
          resolve(() => 'Gender')
        }, 500)
      })
    ]
  ],
  exec: function() {
    console.log('Hello World!');
  }
}
```

### CLI

```
Usage: takeoff [options]

Options:
  -V, --version             output the version number
  --stations-folder [path]  Pass a custom path where takeoff should search for stations
  -h, --help                output usage information
```

## Utils

|                |      Name      | Description                                 |     |
| -------------- | :------------: | ------------------------------------------- | --: |
| **Cases**      |                |                                             |     |
|                |  `Camelcase`   | Hello World ⏩ helloWorld                   |  ✅ |
|                |  `Paramcase`   | Hello World ⏩ hello-world                  |  ✅ |
|                |  `Pascalcase`  | Hello World ⏩ HelloWorld                   |  ✅ |
|                |  `Snakecase`   | Hello World ⏩ Hello_World                  |  ✅ |
| **FileSystem** |                |                                             |     |
|                |  `CreateFile`  | Create a file by passing a path and content |  ✅ |
|                | `CreateFolder` | Create a folder by passing a path           |  ✅ |

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

We're using the package [`debug`](https://www.npmjs.com/package/debug), so its enough to just set use the env variable DEBUG with an global like:

```
$ DEBUG=* takeoff
```
