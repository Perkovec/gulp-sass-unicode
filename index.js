'use strict';

var through = require('through2');
var gutil = require( "gulp-util" );
var rg = /content: *"."/g;

module.exports = function (){
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
			file.contents = new Buffer( file.contents.toString().replace( rg, function(input){
				return "content: \"\\" + input.codePointAt(input.length-2).toString(16) + "\"" ;

			} ) );
			this.push(file);
			next();
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sass-unicode', err, {fileName: file.path}));
		}
	} );
}