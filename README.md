<br />
<br />
<p align="center">
  <img src="https://user-images.githubusercontent.com/528550/47446506-af9da300-d7bb-11e8-8706-c4c0374b2360.gif" width="120" height="136">
  <br />  <br />
  <img src="https://user-images.githubusercontent.com/528550/47447802-b679e500-d7be-11e8-82a0-e446cd06b991.jpg" width="374" height="61" />
</p>
<br />
<br />

This is a absolute beta version, only work with it if you know what you're doing.

## Sneak peek

#### Setup

To contribute clone the repo and checkout the v5 branch

```
$ git clone git@github.com:entwicklerstube/takeoff.git
```

Also checkout the `v5` branch see the newest changes

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

#### FAQ

<details><summary>Will this work in Windows / Linux?</summary>
  <img src="https://user-images.githubusercontent.com/528550/47322882-e52a7b00-d659-11e8-9f59-b3778a448196.gif" />
  <p>
    `takeoff` is not tested on other operating systems, i can not guarantee that it works. It could, if not create an
    issue - i cant fix those, but maybe we will find someone who has the equipment to improve takeoff on other systems.
  </p>
</details>
