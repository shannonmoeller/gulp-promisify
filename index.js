'use strict';

function promisifyStream(stream) {
	if (!stream || !stream.pipe || stream.then) {
		return stream;
	}

	var pipe = stream.pipe;
	var promise = new Promise(function (resolve, reject) {
		stream.on('finish', resolve);
		stream.on('error', reject);
	});

	stream.then = promise.then.bind(promise);
	stream.catch = promise.catch.bind(promise);

	stream.pipe = function (nextStream) {
		promisifyStream(nextStream);
		return pipe.apply(this, arguments);
	};

	return stream;
}

function promisifyGulp(gulp) {
	if (!gulp || !gulp.dest || !gulp.src) {
		return gulp;
	}

	var dest = gulp.dest;
	var src = gulp.src;

	gulp.dest = function () {
		return promisifyStream(dest.apply(this, arguments));
	};

	gulp.src = function () {
		return promisifyStream(src.apply(this, arguments));
	};

	return gulp;
}

module.exports = promisifyGulp;
module.exports.promisifyStream = promisifyStream;
