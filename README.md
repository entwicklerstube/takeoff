# Takeoff
> Scaffold structures

[![Build Status](https://travis-ci.org/entwicklerstube/takeoff.svg?branch=master)](https://travis-ci.org/entwicklerstube/takeoff)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
![Node Version 7](https://img.shields.io/badge/node-v7-green.svg)

### Global Install
```
npm install takeoff-cli -g
```

### Project Local Install
```
npm install takeoff-cli
```

If you add takeoff then as an npm script, keep in mind that `npm run` changes the execution directory to the root of the project before execution. So you won't take advantage of multiple `.takeoff` folders inside your project then.

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

## Create a station
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

## Stations discovery
takeoff discovers all stations (.takeoff folders) beginning from the execution directory up to the root path. This makes it possible to have different stations in different contextes. E.g. you could have some Project specific, some Customer specific and some global stations defined.

- /Users/myuser/Documents/Projects/myCustomer/customerProject/.takeoff
- /Users/myuser/Documents/Projects/myCustomer/.takeoff
- /Users/myuser/Documents/Projects/.takeoff

Invoking takeoff in `/Users/myuser/Documents/Projects/myCustomer/customerProject` would result in:
```
? What do you want to create? (Use arrow keys)
  Stations from "/Users/myuser/Documents/Projects/myCustomer/customerProject/.takeoff"
❯ projectStation
  Stations from "/Users/myuser/Documents/Projects/myCustomer/.takeoff"
  customerStation
  Stations from "/Users/myuser/Documents/Projects/.takeoff"
  globalStation
```


Checkout the example stations in [`example`](https://github.com/entwicklerstube/takeoff/tree/master/example)

#### Advanced
**More specific interactive cli questions**
Pass valid [`inquirer objects`](https://github.com/SBoudrias/Inquirer.js#objects) in `requiredProps` for more specific questions.

**Run script after creating files**
Add a `postTakeoff` function to your `__station.js` configuration, after successfully creating the files this will be executed


## Credits
- Take a look in the [`yarn.lock`](https://github.com/entwicklerstube/takeoff/blob/master/yarn.lock) and see how many open source modules this projects requires.. :heart:

## Author
Michael J. Zoidl ([@michaelzoidl](https://twitter.com/michaelzoidl)) - [entwicklerstube](https://entwicklerstube.com)
Jan Schmidle - [cospired](https://cospired.com)
