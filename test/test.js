'use strict';

var gutil = require( "gulp-util" );
var sass_unicode = require( "../" );
var assert = require( "assert" );

describe( "gulp-sass-unicode", function (){

	describe( "init-resolve", function (){

		it( "Init", function ( done ) {
			var stream = sass_unicode.init();

			stream.on('data', function (data) {
				assert.equal(data.contents.toString(), '#test{content:"{:f000}"}');
			});

			stream.on('end', done);

			stream.write(new gutil.File({
				contents: new Buffer('#test{content:"\\f000"}')
			}));

			stream.end();
		} );

		it( "Init without content", function ( done ) {
			var stream = sass_unicode.init();

			stream.on('data', function (data) {
				assert.equal(data.contents.toString(), '');
			});

			stream.on('end', done);

			stream.write(new gutil.File({
				contents: new Buffer('')
			}));

			stream.end();
		} );

		it( "Resolve", function ( done ) {
			var stream = sass_unicode.resolve();

			stream.on('data', function (data) {
				assert.equal(data.contents.toString(), '#test{content:"\\f000"}');
			});

			stream.on('end', done);

			stream.write(new gutil.File({
				contents: new Buffer('#test{content:"{:f000}"}')
			}));

			stream.end();
		} );

		it( "Resolve without content", function ( done ) {
			var stream = sass_unicode.resolve();

			stream.on('data', function (data) {
				assert.equal(data.contents.toString(), '');
			});

			stream.on('end', done);

			stream.write(new gutil.File({
				contents: new Buffer('')
			}));

			stream.end();
		} );

	} );

} );