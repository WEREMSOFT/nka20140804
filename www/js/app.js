(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'ngSanitize', 'QuestionOnProduct', 'Cart', 'Register', 'Ofertas', 'CommingSoon', 'Category', 'NewProducts', 'ContactForm', 'List', 'Login', 'GridMenu', 'Search']);

    app.factory('shoppingCart', function($http) {
        var returnValue = {
           firstRun: true,
           cartData: {}
        };

        returnValue.httpError = function(data, status, headers, config) {
            returnValue.isWorking = false;
            returnValue.firstRun = false;
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        };

        returnValue.httpSuccess = function(data, status, headers, config) {
            returnValue.isWorking = false;
            returnValue.firstRun = false;
            returnValue.cartData = data.result;
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

        if(returnValue.firstRun)
        {
            returnValue.refreshCartDetails();
        }
        return returnValue;
    });

    app.factory('userData', function($http) {
        var returnValue = {
            logedIn: false,
            profileData: null,
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
            returnValue.logedIn = window.localStorage.getItem('logedIn') === 'true'?true:false;
            returnValue.profileData = JSON.parse(window.localStorage.getItem('profileData'));
            returnValue.userName = window.localStorage.getItem('user');
            returnValue.password = window.localStorage.getItem('password');
        }

        returnValue.httpError = function(data, status, headers, config) {
            returnValue.isWorking = false;
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        returnValue.httpSuccess = function(data, status, headers, config) {
            returnValue.isWorking = false;
            if (data.result.logedIn === 1) {
                returnValue.profileData = data.result.Usuario;
                window.localStorage.setItem("profileData", JSON.stringify(data.result.Usuario));
                returnValue.logedIn = true;
            } else if (data.result.logedIn === -2) {
                alert('Nombre de usuario o contraseña invalidas');
            }
        }

        returnValue.refreshUserDetails = function() {
            console.log('Refrescando información de usuario...' + returnValue.userName + ' ' + returnValue.password);
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/applogin.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Login][login]=' + returnValue.userName + '&data[Login][password]=' + returnValue.password + '&',
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
        alert("app inicializada");
    }
};
