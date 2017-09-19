var args = require('yargs').argv,
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    webpackStream = require('webpack-stream'),
    // gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    historyApiFallback = require('connect-history-api-fallback'),
    // PluginError = $.util.PluginError,


    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpack = require('webpack');

// production mode (see build task)
// Example:
//    gulp --prod
var isProduction = !!args.prod;

if (isProduction)
    log('Starting production build...');

// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = true; // args.usesass // ReactJS project defaults to SASS only

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: 'app/',
    dist: 'dist/',
    styles: 'sass/',
    scripts: 'jsx/'
}



// SOURCES CONFIG
var source = {
    scripts: {
        app: [paths.app + paths.scripts + '**/*.{jsx,js}'],
        entry: [paths.app + paths.scripts + 'App.jsx']
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.dist + 'js',
    styles: paths.dist + 'css',
    images: paths.dist + 'img',
    fonts: paths.dist + 'fonts',
    serverAssets: paths.dist + 'server'
};

// PLUGINS OPTIONS
var webpackConfig = require(
    isProduction ?
        './webpack.config.prod' :
        './webpack.config'
);

var bundler = webpack(webpackConfig);

//---------------
// TASKS
//---------------




// Serve files with auto reaload
gulp.task('browsersync', function () {

    var middlewares = [historyApiFallback()];

    if (!isProduction) {
        middlewares = middlewares.concat([
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true
                }
            }),
            webpackHotMiddleware(bundler)
        ])
    }

    browserSync({
        notify: true,
        port: 4000,
        server: {
            baseDir: paths.dist,
            middleware: middlewares
        },
        files: [paths.app + '**/*.{jsx,js}']
    });

});


function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

