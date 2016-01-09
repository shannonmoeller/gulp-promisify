import test from 'blue-tape';
import promisifyGulp from '../index';

test('promisifyGulp', async assert => {
	let gulp = {src: () => {}, dest: () => {}};
	let promisifiedGulp = promisifyGulp(gulp);

	assert.is(gulp, promisifiedGulp, 'passes gulp instance through');
});
