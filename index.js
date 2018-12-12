'use strict';

var through = require('through2');
var gutil = require( "gulp-util" );
var rg = rg = /content: *"(.+)"/g;

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
			file.contents = Buffer.from( file.contents.toString().replace( rg, function(input, p1){
				var content = '';
				for (var i = 0; i < p1.length; i++) {
					content += "\\" + p1.codePointAt(i).toString(16);
				}

				return "content: \"" + content + "\"";
			} ) );
			this.push(file);
			next();
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-sass-unicode', err, {fileName: file.path}));
		}
	} );
}
