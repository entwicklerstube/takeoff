<br />
<br />
<br />
<p align="center">
  <!-- <img src="https://mjz.io/eqsyu.svg" /> -->
  <br />
  <br />
  <code>
    <strong>$ takeoff</strong>
  </code>
  <br />
  <br />
  <a href="https://travis-ci.org/entwicklerstube/takeoff">
    <img
      src="https://travis-ci.org/entwicklerstube/takeoff.svg?branch=master"
      alt="Build Status">
  </a>
</p>
<br />
<br />

### Global Install
```
$ npm install takeoff-cli -g
```

### Project Local Install
```
$ npm install takeoff-cli
```

If you add takeoff then as an npm script, keep in mind that `npm run` changes the execution directory to the root of the project before execution. So you won't take advantage of multiple `.takeoff` folders inside your project then.

### Usage
```
  Usage
    $ takeoff

  A interactive cli prompt will ask you which of the found stations you want to create.

  Examples
    $ takeoff
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

## Author
- Michael Zoidl - [entwicklerstube](https://entwicklerstube.com)
- Jan Schmidle - [cospired](https://cospired.com)

_Thanks [Nikita Tcherednikov](https://thenounproject.com/nikita.tcherednikov/) for the rocket._
