(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'ContactForm', 'List', 'Login', 'GridMenu', 'Alert']);

    app.initialize = function() {
        this.bindEvents();
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    app.bindEvents = function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    app.onDeviceReady = function() {
        // set to either portrait
        window.plugins.orientationchanger.lockOrientation('portrait');
    }
})();
