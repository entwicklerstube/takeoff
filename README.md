![Takeoff](repo-banner.png)

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Scaffold structures - pre-defined or custom

### Install
```
npm install takeoff-cli -g
```

### Usage
```
$ takeoff --help

  Usage
    $ takeoff <command>

    Command can be:
      stations: node-module | react-app
      global:   init | help

    init
      You can create a .takeoff folder in your project and takeoff will use your custom scaffoldings

  Each station requires different parameters, the interactive

  Global Options
    --no-git    The takeoff will not contain a git-setup

  Examples
    $ takeoff node-module --without
```

### Interactive UI
_Todo__

### Create a custom station
1. Create a `.takeoff` folder in your project root
2. Add a new directory named after your wanted `station` e.g. `node-modules`
3. Create a `__station.js`
4. Use the format:
```js
module.exports = {
  requiredProps: ['content'],
  targetRoute: '',
  run: props => ({
    files: [{
      filename: 'my-file.txt',
      template: 'This is the content my file has: ' + props.content
    }})
};
```
You see, there is a array with `requiredProps`, this information uses the interface to get the specific props.
When the user has given us all prop-informations and everything passed, the `run()` function executes, here we expect a returned object within a `files` array, each item (a object) holds the information about the filename and the content of the file.

#

### Credits
- [Rocket-Icon](https://thenounproject.com/search/?q=rocket&i=865894) by [Aneeque Ahmed](https://thenounproject.com/aneeque/)
