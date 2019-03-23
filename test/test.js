'use strict';

var Vinyl = require('vinyl');
var sass_unicode = require('../');
var sass = require('gulp-sass');
var assert = require('assert');
var fs = require('fs');

describe('gulp-sass-unicode', function() {

    it('Compile FontAwesome', function(done) {

        var sassStream = sass();

        sassStream.on('data', function(sassData) {

            var unicodeStream = sass_unicode();

            unicodeStream.on('data', function(unicodeData) {
                assert.equal(unicodeData.contents.toString(), fs.readFileSync('test/font-awesome.css').toString());
            });

            unicodeStream.on('end', done);

            unicodeStream.write(new Vinyl({
                contents: new Buffer.from(sassData.contents)
            }));

            unicodeStream.end();

        });

        sassStream.write(new Vinyl({
            path: 'test/scss/font-awesome.scss',
            contents: new Buffer.from(fs.readFileSync('test/scss/font-awesome.scss'))
        }));

        sassStream.end();

    });

    it('Compile FontAwesome Compressed', function(done) {

        var sassStream = sass({outputStyle: 'compressed'});

        sassStream.on('data', function(sassData) {

            var unicodeStream = sass_unicode();

            unicodeStream.on('data', function(unicodeData) {
                assert.equal(unicodeData.contents.toString(), fs.readFileSync('test/font-awesome-compressed.css').toString());
            });

            unicodeStream.on('end', done);

            unicodeStream.write(new Vinyl({
                contents: new Buffer.from(sassData.contents)
            }));

            unicodeStream.end();

        });

        sassStream.write(new Vinyl({
            path: 'test/scss/font-awesome.scss',
            contents: new Buffer.from(fs.readFileSync('test/scss/font-awesome.scss'))
        }));

        sassStream.end();

    });

});