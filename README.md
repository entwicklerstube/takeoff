![Takeoff](repo-banner.png)

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
$ takeoff

  Usage
    $ takeoff

  Interactive Command-Line-Interface starts

  Examples
    $ takeoff
```

### Interactive UI
_Todo_

### Predefined Stations
#### `node-module`
**requiredProps**
- package-name
- license

**What you get**
- `package.json`
- full `.gitignore`
- preformated `README`
- selected `LICENSE`
- empty `yarn.lock`

### Create a custom station for your own project
1. Create a `.takeoff` folder in your project root
2. Add a new directory named after your wanted `station` e.g. `node-modules`
3. Create a `__station.js` in the new directory
4. Fill:
```js
module.exports = {
  requiredProps: ['content'], // required props, will be required in interactive CLI
  run: props => ({  // run function will be fired with - before - defined props
    files: [{ // return a files array, takeoff will use this information to create the files
      filename: 'my-file.txt',  // choose here the filename, if you want to create a file in a deeper folder just add the path `my/folder/my-file.txt`
      template: `My Content: ${props.content}`  // template is simply the content of the file
    }]
  })
};
```
Checkout the example stations in [`example`](https://github.com/entwicklerstube/takeoff/tree/master/example)

#### Advanced
**More specific interactive cli questions**
Pass valid [`inquirer objects`](https://github.com/SBoudrias/Inquirer.js#objects) in `requiredProps` for more specific questions.

**Run script after creating files**
Add a `postTakeoff` function to your `__station.js` configuration, after successfully creating the files this will be executed

#

### Credits
- [Rocket-Icon](https://thenounproject.com/search/?q=rocket&i=865894) by [Aneeque Ahmed](https://thenounproject.com/aneeque/)
