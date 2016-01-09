import stream from 'stream';
import test from 'blue-tape';
import promisifyGulp from '../index';

const promisifyStream = promisifyGulp.promisifyStream;

test('promisifyStream', async assert => {
	let transform = new stream.Transform();
	let promisifiedStream = promisifyStream(transform);

	assert.is(transform, promisifiedStream, 'passes stream instance through');
	assert.is(typeof transform.then, 'function', 'adds a then method');
	assert.is(typeof transform.catch, 'function', 'adds a catch method');
});
