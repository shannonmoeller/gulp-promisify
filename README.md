# DEPRECATED: Use [Gulp 4](https://github.com/gulpjs/gulp/tree/4.0) with `.series()` and `.parallel()` instead.

Using `gulpfile.babel.js` isn't compatible with the `async/await` keywords out of the box. If you're going to use Gulp, might as well embrace the ecosystem.

---

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

export function lint() {
    return gulp
        .src('*.js')
        .pipe(xo());
}

export function test() {
    return gulp
        .src('test.js')
        .pipe(tape());
}

export function testParallel() {
    lint();
    test();
}

export async function testSeries() {
    await lint();
    await test();
}

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('test:parallel', testParallel);
gulp.task('test:series', testSeries);
```

## API

### `promisify(gulp)`

Causes streams returned by `.src()`, `.dest()`, and `.symlink()` to also be [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects with `.then()` and `.catch()` methods. The promise is resolved when the stream emits the [`'end'`](https://nodejs.org/api/stream.html#stream_event_end) event. This promisification propagates to all subsequent streams via `.pipe()` to ensure that you may await any following stream.

```js
gulp.src('*.js')
    .pipe(somePlugin())
    .pipe(anotherPlugin())
    .pipe(yetAnotherPlugin()); // <- returns a promisified stream
```

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
