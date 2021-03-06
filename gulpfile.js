var gulp    = require('gulp'),
    wait    = require('gulp-wait'),
    concat  = require('gulp-concat'),
    // less    = require('gulp-less'),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify'),
    minify  = require('gulp-minify-css'),
    rename  = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    reload  = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    pngquant = require('gulp-pngquant'),
    // svgstore = require('gulp-svgstore'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger  = require('gulp-rigger'),
    pug     = require('gulp-pug'),
    clean   = require('gulp-clean'),
    notify  = require('gulp-notify'),
    prefixer = require('gulp-autoprefixer'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

var path = {
    build: {
        html:   'build/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/',
        libs:   'build/libs/',
        svg:    'build/svg/'
    },
    src: {
        html:   'src/*.html',
        pug:    'src/pug/*.pug',
        js:     'src/js/main.js',
        style:  'src/style/main.scss',
        img:    ['src/img/**/*.*', '!src/img/**/Thumbs.db', '!src/img/**/*.svg'],
        svg:    'src/svg/**/*.svg',
        fonts:  'src/fonts/**/*.*',
        libs:   'src/libs/**/*.*'
    },
    watch: {
        html:   'src/**/*.html',
        pug:    'src/pug/**/*.pug',
        js:     'src/js/**/*.js',
        style:  'src/style/**/*.scss',
        img:    ['src/img/**/*.*', '!src/img/**/*.svg'],
        svg:    'src/img/**/*.svg',
        fonts:  'src/fonts/**/*.*',
        libs:   'src/libs/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host:   'localhost',
    port: 7897,
    logPrefix: "dsrsr"
};


// TASKS
//html
gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
//pug
gulp.task('pug:build', function() {
    gulp.src(path.src.pug)
        .pipe(pug())
            .on('error', notify.onError(function (error) {
                return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error;
            }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
//libs
gulp.task('libs:build', function () {
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(reload({stream: true}));
});
//js
gulp.task('js:build', function () {
    gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(sourcemaps.init())
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
//style
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(wait(50))
        .pipe(sourcemaps.init())
            .pipe(sass())
                .on('error', sass.logError)
            .pipe(prefixer())
            .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
//img
gulp.task('img:build', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
//svg
gulp.task('svg:build', function() {
    return gulp.src(path.src.svg)
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest:'../../../src/style/modules/_sprite.scss',
                            //template: assetsDir + "sass/templates/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest(path.build.svg));
});
//fonts
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'html:build',
    'pug:build',
    'svg:build',
    'libs:build',
    'js:build',
    'style:build',
    'fonts:build',
    'img:build',

]);

gulp.task('watch', function() {
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.pug], ['pug:build']);
    gulp.watch([path.watch.libs], ['libs:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.style], ['style:build']);
    gulp.watch([path.watch.img], ['img:build']);
    gulp.watch([path.watch.svg], ['svg:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

gulp.task('webserver', function() {
    browserSync.init(config);
});

gulp.task('clean', function() {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
})

gulp.task('default', ['build', 'webserver', 'watch']);
