<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47579833-709f5700-d94d-11e8-9302-cd303c6d3ddf.gif" width="120" height="136">
  <br />  <br />
  <img src="https://user-images.githubusercontent.com/528550/47447802-b679e500-d7be-11e8-82a0-e446cd06b991.jpg" width="374" height="61" />
</p>
<br />
<br />
takeoff is the perfect tool if you want to automate workflows with a command line integration.

## :warning: Alpha

The `v5` is in active development, its not published on npm yet either is it usable if you build it on your machine, but you can start the tests which is nice.

## Features

- 📦 Shipped in one file
- 🧙‍ One Dependency to rule them all
- 🔌 Plug & Play
- 💎 No configuration required
- 🌟 You can install it globaly or project-based
- 🔍 Detects valid stations up the tree
- 💡 Possible to import existing files and structures
- ⏱ Save time by automating your workflow
- 💁‍ Easy as f\*\*\* by only requiring 2 properties (`get`, `exec`)
- 🕹 Interactive mode
- 💚 Full tested

#### Compare

- Yeoman
- Slush
- takeoff

## Usage

🤭 This thing is so alpha that we didn't even publish it on npm.

- `get`, what information do you need for your station?
- `exec` the function we will execute with the informations we got from `get`

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
