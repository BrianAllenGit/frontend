/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    firebase: {
      apiKey: "AIzaSyAXbjcOu_3FTIKe1uZheZ52brtsLMo6nJo",
      authDomain: "scanhappy-3e9e2.firebaseapp.com",
      databaseURL: "https://scanhappy-3e9e2.firebaseio.com",
      storageBucket: "Scannly-3e9e2.appspot.com"
    },
    torii: { sessionServiceName: 'session' },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
ENV['place-autocomplete'] = {
  exclude: true,
  key: 'AIzaSyAXbjcOu_3FTIKe1uZheZ52brtsLMo6nJo',
  client: '56205976105-o6ljjrq1v7sci0hdvq13eikpt6a2fq2d.apps.googleusercontent.com',
  version: 3.27 // Optional - if client is set version must be above 3.24
};
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
