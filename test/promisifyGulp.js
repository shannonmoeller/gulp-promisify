import stream from 'stream';
import test from 'blue-tape';
import promisify from '../index';

const promisifyGulp = promisify.promisifyGulp;

test('ignores non-gulp-like input', async assert => {
	assert.is(promisifyGulp(), undefined, '');
	assert.is(promisifyGulp({}).src, undefined, '');
	assert.is(promisifyGulp({foo: 'bar'}).src, undefined, '');
});

test('promisifies gulp-like input', async assert => {
	function src() {}
	function dest() {}

	const gulp = {src: src, dest: dest};
	const promisifiedGulp = promisifyGulp(gulp);

	assert.is(gulp, promisifiedGulp, 'passes gulp instance through');
	assert.not(gulp.src, src, 'patches src');
	assert.not(gulp.dest, dest, 'patches dest');
	assert.is(gulp.symlink, undefined, 'skips missing methods');
});

test('promisified method returns promisified stream', async assert => {
	let count = 0;

	function src() {
		count += 1;
		return new stream.Transform();
	}

	const gulp = {src: src};
	const promisifiedGulp = promisifyGulp(gulp);
	const promisifiedSrc = promisifiedGulp.src();

	assert.is(count, 1, 'original method was executed');
	assert.is(typeof promisifiedSrc.then, 'function', 'has a then method');
	assert.is(typeof promisifiedSrc.catch, 'function', 'has a catch method');
});
