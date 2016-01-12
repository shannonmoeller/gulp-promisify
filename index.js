'use strict';

function promisifyStream(stream) {
	if (!stream || !stream.pipe || stream.then) {
		return stream;
	}

	var promise = new Promise(function (resolve, reject) {
		stream.on('end', resolve.bind(null, stream));
		stream.on('error', reject);
		stream.on('pipe', promisifyStream);
	});

	stream.then = promise.then.bind(promise);
	stream.catch = promise.catch.bind(promise);

	return stream;
}

function promisifyGulp(gulp) {
	if (!gulp) {
		return gulp;
	}

	var dest = gulp.dest;
	var src = gulp.src;
	var symlink = gulp.symlink;

	if (dest) {
		gulp.dest = function () {
			return promisifyStream(dest.apply(this, arguments));
		};
	}

	if (src) {
		gulp.src = function () {
			return promisifyStream(src.apply(this, arguments));
		};
	}

	if (symlink) {
		gulp.symlink = function () {
			return promisifyStream(symlink.apply(this, arguments));
		};
	}

	return gulp;
}

module.exports = promisifyGulp;
module.exports.promisifyStream = promisifyStream;
