import 'babel-regenerator-runtime';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import promisify from './index.js';
import tape from 'gulp-tape';
import xo from 'gulp-xo';

promisify(gulp);

export function lint() {
	return gulp
		.src('{,test/}*.js')
		.pipe(xo());
}

export function instrument() {
	return gulp
		.src('index.js')
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
}

export function test() {
	return gulp
		.src('test/*.js')
		.pipe(tape());
}

export function report() {
	return test()
		.pipe(istanbul.writeReports());
}

gulp.task('default', ['test']);

gulp.task('test', async () => {
	await lint();
	await test();
});

gulp.task('cover', async () => {
	await instrument();
	await report();
});
