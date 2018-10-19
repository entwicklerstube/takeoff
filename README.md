<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47219576-7cb87100-d3af-11e8-8ec8-68847e0328b6.jpg" width="335" height="226"></p>
<br />
<br />

This is a absolute beta version, only work with it if you know what you're doing.

## Contributing

#### Setup

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

We're using the famous package [`debug`](https://www.npmjs.com/package/debug), so its enough to just set use the env variable DEBUG with an globa like:

```
$ DEBUG=* node takeoff.js
```
