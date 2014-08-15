(function() {
    'use strict';
    var module = angular.module('Product', []);

    module.controller('ProductController', function($scope, $http) {

        $scope.getToken = function() {

            var request = $http({
                method: "post",
                url: 'https://api.mercadolibre.com/oauth/token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                },
                data: 'grant_type=client_credentials&client_id=8562601371980414&client_secret=PK24Ais5PBdabKMNGZvbcvwEq8LvRr7r&'
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
        }

        $scope.buy = function() {
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
