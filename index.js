'use strict';

var through = require('through2');
var gutil = require( "gulp-util" );
var rginit = /"\\.{1,6}"/g;
var rgresolve = /"\{:.{1,6}\}"/g;

module.exports.init = function (){
	return through.obj( function ( file, _, next ) {

		if (file.isNull()) {
			next(null, file);
			return;
		}

		if (file.isStream()) {
			next(new gutil.PluginError('gulp-sass-unicode', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer( file.contents.toString().replace( rginit, function(input){
				return "\"{:" + input.substring( 2, input.length-1 ) + "}\"";

			} ) );
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sass-unicode', err, {fileName: file.path}));
		}

		next();
	} );
}

module.exports.resolve = function (){
	return through.obj( function ( file, _, next ) {

		if (file.isNull()) {
			next(null, file);
			return;
		}

		if (file.isStream()) {
			next(new gutil.PluginError('gulp-sass-unicode', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = new Buffer( file.contents.toString().replace( rgresolve, function(input){
				return "\"\\" + input.substring( 3, input.length-2 ) + "\"";

			} ) );
			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sass-unicode', err, {fileName: file.path}));
		}

		next();
	} );
}