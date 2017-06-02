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
$ takeoff <station>

  Usage
    $ takeoff

  Interactive Command-Line-Interface starts

  Examples
    $ takeoff
```

### Interactive UI
_Todo_


### Stations
#### Predefined Stations
<p><details>
<summary><code>node-module</code></summary>

**Contains**
- `README.md`
- `package.json`
- `index.js`
- `license` (choose between mit, gnu or apache)
- `babel` _optional_
- `git-init` _optional_
- `create project folder` _optional_
- `mocha` _optional_
- `ava` _optional_
- `xo` _optional_
- `standard` _optional_
- `travis.yml` _optional_

</details></p>

#### Build your own custom station
<p><details>
<summary><h4>node-module</h4></summary>

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

</details></p>

## Credits
- Take a look in the [`yarn.lock`](https://github.com/entwicklerstube/takeoff/blob/master/yarn.lock) and see how many open source modules this projects requires.. :heart:
- [Rocket-Icon](https://thenounproject.com/search/?q=rocket&i=865894) by [Aneeque Ahmed](https://thenounproject.com/aneeque/)

## Author

Michael J. Zoidl ([@michaelzoidl](https://twitter.com/michaelzoidl)) - [entwicklerstube](https://entwicklerstube.com)
