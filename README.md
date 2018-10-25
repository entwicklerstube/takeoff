<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47219576-7cb87100-d3af-11e8-8ec8-68847e0328b6.jpg" width="335" height="226"></p>
<br />
<br />

## :warning: This is a absolute alpha version, only work with it if you know what you're doing.

## Features

- 📦 Shipped in one file
- 🌟 One Dependency
- 🔌 Plug & Play
- 💎 No Configuration Required
- 🔍 Detects valid stations up the tree
- 💡 Possible to import existing files and structures
- ⏱ Save time by automating your working flow
- 🕹 Interactive Mode
- 💚 Tested

## Pitch

Everything takeoff does is also be possible with yeoman and other tools like that. But our target is to be easier, the only required information is that a station export two properties:

- `get`, what information do you need for your station?
- `exec` the function we will execute with the informations we got from `get`

#### Compare

- Yeoman
- Slush
- takeoff

## Usage

🤭 This thing is so alpha that we didn't even publish it on npm.

## Contribute

To contribute clone the repo and checkout the v5 branch

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

#### FAQ

<details><summary>Is Windows supported?</summary>
  <img src="https://user-images.githubusercontent.com/528550/47322882-e52a7b00-d659-11e8-9f59-b3778a448196.gif" />
  <p>
    Maybe, its not tested on Windows, since takeoff works a lot with the OS`file-system its more likely that there is something not working. If you step on a bug on windows just create an issue and describe it.
  </p>
</details>
