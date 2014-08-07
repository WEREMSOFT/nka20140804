(function() {
    'use strict';
    var module = angular.module('Alert', []);

    module.controller('AlertController', function($scope, $http) {
        $scope.mensaje = "EXITO!";

        $scope.dismis = function()
        {
        	modalAlert.hide();
        	ons.navigator.popPage();
        }

        
    });

})();
