'use strict';

function promisifyStream(stream) {
	if (!stream || !stream.pipe || stream.then) {
		return stream;
	}

	var promise = new Promise(function (resolve, reject) {
		stream.once('end', resolve.bind(null, stream));
		stream.once('error', reject);
		stream.on('pipe', promisifyStream);
	});

	stream.then = promise.then.bind(promise);
	stream.catch = promise.catch.bind(promise);

	return stream;
}

function promisifyGulp(gulp) {
	if (!gulp || !gulp.src) {
		return gulp;
	}

	['dest', 'src', 'symlink'].forEach(function (name) {
		var method = gulp[name];

		if (typeof method !== 'function') {
			return;
		}

		gulp[name] = function () {
			return promisifyStream(method.apply(this, arguments));
		};
	});

	return gulp;
}

module.exports = promisifyGulp;
module.exports.promisifyGulp = promisifyGulp;
module.exports.promisifyStream = promisifyStream;
