(function() {
    'use strict';
    var app = angular.module('myApp', ['onsen.directives', 'ngSanitize', 'Product', 'Category', 'ContactForm', 'List', 'Login', 'GridMenu']);

    app.factory('userData', function() {
    	var returnValue = {logedIn: false, profileData: null, userName: null, password: null};
    	returnValue.reset = function()
    	{

    		this.logedIn = false;
    		this.profileData = null;
    		window.localStorage.setItem('logedIn', false);
    		window.localStorage.setItem('profileData', null);
    	}

    	if(window.localStorage.getItem('logedIn'))
    	{
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
}
