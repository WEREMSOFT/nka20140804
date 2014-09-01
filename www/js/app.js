(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'ngSanitize', 'QuestionOnProduct', 'Register', 'Ofertas', 'CommingSoon', 'Category', 'NewProducts', 'ContactForm', 'List', 'Login', 'GridMenu', 'Search']);

    app.factory('userData', function() {
        var returnValue = {
            logedIn: false,
            profileData: null,
            userName: null,
            password: null,
            lastProfileData: null
        };
        returnValue.reset = function() {

            this.logedIn = false;
            this.lastProfileData = this.profileData;
            this.profileData = null;
            window.localStorage.setItem('logedIn', false);
            window.localStorage.setItem('profileData', null);
        }

        if (window.localStorage.getItem('logedIn')) {
            returnValue.logedIn = window.localStorage.getItem('logedIn');
            returnValue.profileData = JSON.parse(window.localStorage.getItem('profileData'));
            returnValue.userName = window.localStorage.getItem('userName');
            returnValue.password = window.localStorage.getItem('password');
        }

        return returnValue;
    });

})();

document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//
function onDeviceReady() {
    //cuando cordova esta lista. Este script funciona en todas partes, otros scripts dependientes de angular pueden no funcionar.
    /* 
Push notification credentials

APIKey AIzaSyCRGPHBgI_34D56Dph6E55zU-8rU5ca03c
Project Number/GCM sender ID: 973400049330*/
 /*   alert('inicializando');
    var pushNotification = window.plugins.pushNotification;
    pushNotification.register(successHandler, errorHandler, {
        "senderID": "973400049330",
        "ecb": "app.onNotificationGCM"
    });*/

}

function successHandler(result) {
    alert('Callback Success! Result = ' + result)
}

function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log("Regid " + e.regid);
                alert('registration id = ' + e.regid);
            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model from the push server
            alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
            break;

        case 'error':
            alert('GCM error = ' + e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}

function errorHandler(error) {
    alert(error);
},
