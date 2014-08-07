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

                data: '_method=POST&data[Login][login]=' + $email + '&data[Login][password]=' + $pass + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.debugText = "error " + data;
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.debugText = "Exito!: " + data;
            $scope.getUserDetails();
        }

        $scope.getUserDetails = function()
        {
            this.debugText = "Obteniendo detalles del usuario...";
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/client/dashboards/index',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetUserDetailsSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetUserDetailsError);
        }

         $scope.httpGetUserDetailsError = function(data, status, headers, config) {
            $scope.debugText = "error " + data;
        }

        $scope.httpGetUserDetailsSuccess = function(data, status, headers, config) {
            $scope.debugText = "Exito!: " + data;
            $scope.userName = data.split('"Ver datos de ')[1].split('"')[0];
            alert("Bienvenido " + $scope.userName + "!!!!!");
        }

    });

})();
