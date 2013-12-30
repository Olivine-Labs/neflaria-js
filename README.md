neflaria-js
===========

A javascript library for using data from Neflaria's API.
[http://www.neflaria.com](http://www.neflaria.com)


This contains `models` and `collections` that enforce validation, and `toJSON`
methods for converting model data to JSON acceptable by the API. This library
does not include methods for interacting with the API (at least, not yet.)

Getting Started
===============

Use the file from `dist/neflaria-js.js` in the browser, or use NPM with
`npm install neflaria-js --save`. (Neflaria-js is Browserify compatible.)

From there, you can:

```javascript
var neflaria = require('neflaria-js');

var player = new neflaria.Models.Player({
  id: 1,
  name: 'Herp McHerpington'
});

```

Check out the `test` folder for example usage. Docs coming eventually.


Development
===========

* Install Node
* Clone repository
* `cd` to repository
* Run `npm install`

Run `npm test` to run tests and check code coverage.

License
=======

MIT Licensed (see LICENSE file.)

