<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47579833-709f5700-d94d-11e8-9302-cd303c6d3ddf.gif" width="120" height="136">
  <br />  <br />
  <img src="https://user-images.githubusercontent.com/528550/47447802-b679e500-d7be-11e8-82a0-e446cd06b991.jpg" width="374" height="61" />
</p>
<br />
<br />

[![Build Status](https://travis-ci.org/entwicklerstube/takeoff.svg?branch=master)](https://travis-ci.org/entwicklerstube/takeoff)
[![Coverage Status](https://coveralls.io/repos/github/entwicklerstube/takeoff/badge.svg?branch=v5)](https://coveralls.io/github/entwicklerstube/takeoff?branch=v5)

> takeoff is the perfect tool if you want to automate workflows with a command line integration.

## Features

- <details><summary>📦 Shipped in one file</summary>details</details>
- <details><summary>🧙‍ One Dependency to rule them all</summary>details</details>
- <details><summary>🔌 Plug & Play</summary>details</details>
- <details><summary>💎 No configuration required</summary>details</details>
- <details><summary>🌟 You can install it globaly or project-based</summary>details</details>
- <details><summary>🔍 Detects valid stations up the tree</summary>details</details>
- <details><summary>💡 Possible to import existing files and structures</summary>details</details>
- <details><summary>⏱ Save time by automating your workflow</summary>details</details>
- <details><summary>💁‍ Easy as f by only requiring 2 properties (`get`, `exec`)</summary>details</details>
- <details><summary>🕹 Interactive mode</summary>details</details>
- <details><summary>💚 Full tested</summary>details</details>

## Install

🤭 This thing is so alpha that we didn't even publish it on npm

## Usage

> Work in progress

## Utils

> Links to the util docs

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
