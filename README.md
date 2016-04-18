# gulp-replace
> Return 'content' unicode after sass compile

## Usage

First, install `gulp-sass-unicode` as a development dependency:

```shell
npm install --save-dev gulp-sass-unicode
```

Then, add it to your `gulpfile.js`:

```javascript
var sass = require('gulp-sass');
var sassUnicode = require('gulp-sass-unicode');

gulp.task('sass2css', function(){
  gulp.src(['style.scss'])
    .pipe(sass())
    .pipe(sassUnicode());
});
```