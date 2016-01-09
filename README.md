# `gulp-promisify`

[![NPM version][npm-img]][npm-url] [![Downloads][downloads-img]][npm-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Chat][gitter-img]][gitter-url] [![Tip][amazon-img]][amazon-url]

Enables use of Promises or ES7 async/await keywords to control the flow of Gulp tasks.

## Install

    $ npm install --save-dev gulp-promisify

## Example

```js
import gulp from 'gulp';
import promisify from 'gulp-promisify';
import tape from 'gulp-tape';
import xo from 'gulp-xo';

promisify(gulp);

function lint() {
	return gulp
		.src('*.js')
		.pipe(xo());
}

function test() {
	return gulp
		.src('test.js')
		.pipe(tape());
}

gulp.task('testSeries', async () => {
	await lint();
	await test();
});

gulp.task('testParallel', () => {
	lint();
	test();
});
```

## API

### `promisify(gulp)`

TODO: Section on how `.src()` and `.dest()` streams, and all subsequent streams, are assigned `.then()` and `.catch()` methods.

## Known Issues

### Event: `'finish'`

TODO: Section on promises resolving without a value.
TODO: Section on async `_flush`.

## Contribute

[![Tasks][waffle-img]][waffle-url]

Standards for this project, including tests, code coverage, and semantics are enforced with a build tool. Pull requests must include passing tests with 100% code coverage and no linting errors.

### Test

    $ npm test

----

© 2016 Shannon Moeller <me@shannonmoeller.com>

Licensed under [MIT](http://shannonmoeller.com/mit.txt)

[amazon-img]:    https://img.shields.io/badge/amazon-tip_jar-yellow.svg?style=flat-square
[amazon-url]:    https://www.amazon.com/gp/registry/wishlist/1VQM9ID04YPC5?sort=universal-price
[coveralls-img]: http://img.shields.io/coveralls/shannonmoeller/gulp-promisify/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/shannonmoeller/gulp-promisify
[downloads-img]: http://img.shields.io/npm/dm/gulp-promisify.svg?style=flat-square
[gitter-img]:    http://img.shields.io/badge/gitter-join_chat-1dce73.svg?style=flat-square
[gitter-url]:    https://gitter.im/shannonmoeller/shannonmoeller
[npm-img]:       http://img.shields.io/npm/v/gulp-promisify.svg?style=flat-square
[npm-url]:       https://npmjs.org/package/gulp-promisify
[travis-img]:    http://img.shields.io/travis/shannonmoeller/gulp-promisify.svg?style=flat-square
[travis-url]:    https://travis-ci.org/shannonmoeller/gulp-promisify
[waffle-img]:    http://img.shields.io/github/issues/shannonmoeller/gulp-promisify.svg?style=flat-square
[waffle-url]:    http://waffle.io/shannonmoeller/gulp-promisify
