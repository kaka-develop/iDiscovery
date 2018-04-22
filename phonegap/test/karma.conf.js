module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            // bower:js

            '../www/bower_components/angular/angular.js',

            '../www/bower_components/angular-aria/angular-aria.js',

            '../www/bower_components/angular-messages/angular-messages.js',

            '../www/bower_components/angular-animate/angular-animate.js',

            '../www/bower_components/angular-material/angular-material.js',

            '../www/bower_components/angular-ui-router/release/angular-ui-router.js',

            '../www/bower_components/moment/moment.js',

            '../www/bower_components/ngCordova/dist/ng-cordova.js',

            '../www/bower_components/angular-mocks/angular-mocks.js',

            '../www/bower_components/mdPickers/dist/mdPickers.min.js',

            // endbower
            '../www/app/app.module.js',
            '../www/app/app.state.js',
            '../www/app/app.js',
            '../www/app/**/*.js',
            'helpers/module.js',
            'app/**/*.test.js'
        ],
        port: 9876,
        autoWatch: false,
        logLevel: config.LOG_INFO,
        singleRun: false,
        browsers: ['PhantomJS']
    });
};