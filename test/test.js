'use strict';

var gutil = require("gulp-util");
var sass_unicode = require("../");
var sass = require("gulp-sass");
var assert = require("assert");
var fs = require("fs");

describe("gulp-sass-unicode", function() {

    it("Compile FontAwesome", function(done) {

        var sassStream = sass();

        sassStream.on('data', function(sassData) {

            var unicodeStream = sass_unicode();

            unicodeStream.on('data', function(unicodeData) {
                assert.equal(unicodeData.contents.toString(), fs.readFileSync('test/font-awesome.css').toString());

            });

            unicodeStream.on('end', done);

            unicodeStream.write(new gutil.File({
                contents: new Buffer(sassData.contents)
            }));

            unicodeStream.end();

        });

        sassStream.write(new gutil.File({
            path: "test/scss/font-awesome.scss",
            contents: new Buffer(fs.readFileSync("test/scss/font-awesome.scss"))
        }));

        sassStream.end();

    });

});