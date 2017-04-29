var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var layout = require('gulp-layout');
var fileinclude = require('gulp-file-include');
var dom  = require('gulp-dom');

gulp.task('clean', function() {
  return del(['./pages/**', '!./pages']);
  return gulp.src('./pages', {read: false})
      .pipe(clean());
});

gulp.task('content_markdown', function() {
  return gulp.src('./src/content/**/[^%]*(*.md|*.markdown)')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(layout(function(file) {
      var options = file.frontMatter;
      if (!options.layout) options.layout = 'layout.html';
      options.layout = './src/template/' + options.layout
      if (!options.engine) options.engine = 'handlebars';
      if (!options.title) console.warn("No title set for file", file.path);
      return options;
    }))
    .pipe(dom(function() {

      // Find all <p>s which contain only images and add the 'images' class to them
      var ps = this.querySelector('article').querySelectorAll('p');
      for (i = 0; i < ps.length; i++) { // For some reason there's no forEach available
        var p = ps[i];

        if (p.children.length > 0) {
          var childrenAreAllImages = true;

          for (c = 0; c < p.children.length; c++) {
            if (p.children[c].tagName != 'IMG') childrenAreAllImages = false;
          }
          if (childrenAreAllImages) {
            p.classList.add("images");
          }
        }
      }
      return this;
    }))

    .pipe(gulp.dest('./pages'));
});

gulp.task('content_other', function() {
  return gulp.src([
    './src/content/**/[^%]*',
    '!./src/content/**/[^%]*(*.md|*.markdown)'])
    .pipe(gulp.dest('./pages'));
});

gulp.task('content', ['content_markdown', 'content_other']);

gulp.task('template_sass', function(){
  return gulp.src('./src/template/scss/styles.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('./pages/css'));
});

gulp.task('template_images', function() {
  return gulp.src('./src/template/images/**/*')
    .pipe(gulp.dest('./pages/images'))
});

gulp.task('template', ['template_sass', 'template_images']);

gulp.task('build', [ 'template', 'content' ]);
