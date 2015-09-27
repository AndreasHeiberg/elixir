var gulp = require('gulp');
var _ = require('underscore');
var Elixir = require('laravel-elixir');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

/*
 |----------------------------------------------------------------
 | ImageMin Processor
 |----------------------------------------------------------------
 |
 | This task will trigger your images to be processed using
 | imagemin processor.
 |
 | Minify PNG, JPEG, GIF and SVG images
 |
 */

elixir.extend('imagemin', function(src, output, options) {
    new Elixir.Task('imagemin', function() {
        var paths = prepGulpPaths(src, output);

        this.log(paths.src, paths.output);

        options = _.extend(config.images.imagemin.pluginOptions, options);

        return (
            gulp.task('imagemin', function() {
                return gulp.src(paths.src)
                    .pipe(imagemin(options))
                    .pipe(gulp.dest(paths.output))
                    .on('error', function(e) {
                        new Elixir.Notification('ImageMin Failed!');

                        this.emit('end');
                    })
            })
        );
    })
    .watch(config.get('assets.images.folder') + '/**/*.+(gif|jpg|jpeg|png|svg)')
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.images.folder'))
        .output(output || config.get('public.images.outputFolder'));
};
