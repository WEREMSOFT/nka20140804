(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'angular-carousel', 'Category','ContactForm', 'List', 'Login', 'GridMenu', 'Carrousel' ]);
})();

document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
    //cuando cordova esta lista. Este script funciona en todas partes, otros scripts dependientes de angular pueden no funcionar.
}
