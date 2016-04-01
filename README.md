# stub-class-unit-tests

[![npm](https://img.shields.io/npm/v/stub-class-unit-tests.svg)](https://www.npmjs.com/package/stub-class-unit-tests) [![Dependencies](https://img.shields.io/david/timdp/stub-class-unit-tests.svg)](https://david-dm.org/timdp/stub-class-unit-tests) [![Build Status](https://img.shields.io/travis/timdp/stub-class-unit-tests.svg)](https://travis-ci.org/timdp/stub-class-unit-tests) [![Coverage Status](https://img.shields.io/coveralls/timdp/stub-class-unit-tests.svg)](https://coveralls.io/r/timdp/stub-class-unit-tests) [![JavaScript Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

Stubs unit tests for ES2015 classes. Uses Mocha + Chai.

This is very much a work in progress.

## Usage

```js
import stubClassUnitTests from 'stub-class-unit-tests'
import fs from 'fs'

class MyClass {
  constructor () {
    this._foo = 0
  }

  get foo () {
    return this._foo
  }

  set foo (value) {
    this._foo = value
  }

  add (num) {
    this._foo += num
  }
}

const jsCode = stubClassUnitTests(MyClass)
fs.writeFileSync('test.js', jsCode, 'utf8')
```

## Options

### className

Override the class name. Defaults to `constructor.name`.

### importPath

Path to the module that exports the class, relative to where you're going to
save the test source code. Used to generate an `import` statement.

### importType

Either `'default'` (default export, the default) or `'named'` (named export).
Determines how the class will be imported from `importPath`.

## Author

[Tim De Pauw](https://tmdpw.eu/)

## License

MIT
