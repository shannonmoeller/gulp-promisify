import 'babel-regenerator-runtime';
import gulp from 'gulp';
import faucet from 'faucet';
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
		.pipe(tape({
			reporter: faucet()
		}));
}

export function report() {
	return test()
		.pipe(istanbul.writeReports());
}

export async function cover() {
	await instrument();
	await report();
}

gulp.task('default', async () => {
	await lint();
	await cover();
});

gulp.task('lint', lint);
gulp.task('test', cover);
