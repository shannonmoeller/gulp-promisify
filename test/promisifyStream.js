import stream from 'stream';
import test from 'blue-tape';
import promisify from '../index';

const promisifyStream = promisify.promisifyStream;

test('ignores non-stream-like input', async assert => {
	assert.is(promisifyStream(), undefined, '');
	assert.is(promisifyStream({}).then, undefined, '');
	assert.is(promisifyStream({foo: 'bar'}).then, undefined, '');
});

test('promisifies stream-like input', async assert => {
	let transform = new stream.Transform();
	let promisifiedStream = promisifyStream(transform);

	assert.is(transform, promisifiedStream, 'passes stream instance through');
	assert.is(typeof transform.then, 'function', 'has a then method');
	assert.is(typeof transform.catch, 'function', 'has a catch method');
});
