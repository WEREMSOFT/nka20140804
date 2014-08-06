(function() {
    'use strict';
    var module = angular.module('Login', []);

    module.controller('LoginController', function($scope, $http) {
        this.scope = $scope;

        $scope.login = function() {
            this.debugText = "enviando...";
            var $email = 'pablo.weremczuk@gmail.com';
            var $pass = '26825782';
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/frontlogin/0',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '[Login][login]=' + $email + '&[Login][password]=' + $pass + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.debugText = "error " + status;
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.debugText = "Exito!: " + headers;
        }
    });

})();
