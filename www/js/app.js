(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'ngSanitize', 'QuestionOnProduct', 'Cart', 'Register', 'Ofertas', 'CommingSoon', 'Category', 'NewProducts', 'ContactForm', 'List', 'Login', 'GridMenu']);

    app.factory('shoppingCart', function($http) {
        var returnValue = {
            firstRun: true,
            cartData: {}
        };

        returnValue.httpError = function(data, status, headers, config) {
            returnValue.isWorking = false;
            returnValue.firstRun = false;
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', androidCloseApp, 'Sin Conección', 'Bueno');
        };

        returnValue.httpSuccess = function(data, status, headers, config) {
            returnValue.isWorking = false;
            returnValue.firstRun = false;
            returnValue.cartData = data.result;
            console.log(data.result);
        };

        returnValue.refreshCartDetails = function() {
            console.log('Refrescando información de carrito...');
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/carrito.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);
        }

        if (returnValue.firstRun) {
            returnValue.refreshCartDetails();
        }
        return returnValue;
    });

    app.factory('userData', function($http) {
        var returnValue = {
            logedIn: false,
            profileData: {},
            userName: null,
            password: null,
            lastProfileData: null,
            isWorking: false
        };
        returnValue.reset = function() {

            this.logedIn = false;
            this.lastProfileData = this.profileData;
            this.profileData = null;
            window.localStorage.setItem('logedIn', false);
            window.localStorage.setItem('profileData', null);
        }

        if (window.localStorage.getItem('logedIn')) {
            returnValue.logedIn = window.localStorage.getItem('logedIn') === 'true' ? true : false;
            returnValue.profileData = JSON.parse(window.localStorage.getItem('profileData'));
            returnValue.userName = window.localStorage.getItem('user');
            returnValue.password = window.localStorage.getItem('password');
        }

        returnValue.httpError = function(data, status, headers, config) {
            returnValue.isWorking = false;
            promptError('Oops! Algo ha salido mal. Reintenta en un momento', androidCloseApp, 'Sin Conección', 'Aceptar');
        }

        returnValue.httpSuccess = function(data, status, headers, config) {
            returnValue.isWorking = false;
            if (data.result.logedIn === 1) {
                returnValue.profileData = data.result.Usuario;
                window.localStorage.setItem("profileData", JSON.stringify(data.result.Usuario));
                returnValue.logedIn = true;
            } else if (data.result.logedIn === -2) {
                prompt('Nombre de usuario o contraseña invalidas.', alertDismissed, 'Opa!', 'Aceptar');
            }
        }

        returnValue.refreshUserDetails = function() {
            console.log('Refrescando información de usuario...');
            console.log(returnValue);
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/applogin.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Login][login]=' + window.localStorage.getItem("user") + '&data[Login][password]=' + window.localStorage.getItem("password") + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);
        }
        if (returnValue.logedIn) {
            returnValue.refreshUserDetails();
        }

        return returnValue;
    });

})();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        if (id === 'deviceready') {
            console.log('device ready');
            gaPlugin = window.plugins.gaPlugin;
            gaPlugin.init(googleAnalyticsSuccess, googleAnalyticsError, "UA-55016244-1", 10);
            navigator.splashscreen.hide();
            subscriveToPushNotificationsAndroid();
        }
    }
};



function alertDismissed() {
    Console.log('dummy callback');
}

function subscriveToPushNotificationsAndroid() {
    var pushNotification = window.plugins.pushNotification;
    pushNotification.register(successHandler, errorHandler, {
        "senderID": "973400049330",
        "ecb": "onNotificationGCM"
    });

}


// result contains any message sent from the plugin call
function successHandler(result) {
    //alert('Callback Success! Result = '+result);
    console.log(result);
}

function errorHandler(error) {
    promptError(error);
}

function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log("Regid " + e.regid);
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


//---google app analitycs
var gaPlugin;

function googleAnalyticsSuccess() {
    gaPlugin.trackEvent(googleAnalyticsTrackEventSuccess, googleAnalyticsTrakEventError, "Application", "init", "Aplicación iniciada", 1);
}

function googleAnalyticsError() {
    console.log("error al inicializar google analytics");
}

function googleAnalyticsTrackEventSuccess()
{
    console.log('evento trackeado con exito');
}

function googleAnalyticsTrakEventError()
{
    console.log("error al trackear evento de google analytics");
}

