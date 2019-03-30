'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var rg = rg = /content:( *)"([^"]*)"/g;

module.exports = function (){
	return through.obj( function ( file, _, next ) {

		if (file.isNull()) {
			next(null, file);
			return;
		}

		if (file.isStream()) {
			next(new PluginError('gulp-sass-unicode', 'Streaming not supported'));
			return;
		}

		try {
			file.contents = Buffer.from( file.contents.toString().replace( rg, function(input, whitespace, p2){
				var content = '';
				for (var i = 0; i < p2.length; i++) {
					var codePoint = p2.codePointAt(i);
					if (codePoint > 127) {
						content += "\\" + p2.codePointAt(i).toString(16);
					} else {
						content += p2.charAt(i);
					}
				}

				return "content:" + whitespace + "\"" + content + "\"";
			} ) );
			this.push(file);
			next();
		} catch (err) {
			this.emit('error', new PluginError('gulp-sass-unicode', err, {fileName: file.path}));
		}
	} );
}
