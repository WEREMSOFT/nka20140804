(function() {
    'use strict';
    var module = angular.module('Ofertas', []);

    module.controller('OfertasController', function($scope, $http) {

        $scope.searchString = "";
        $scope.isWorking = false;
        $scope.products = [];

        $scope.init = function() {
            console.log('inicializando');
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/ofertas.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
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
            $scope.products = data.result.child_products;
            $scope.isWorking = false;
        }
    });


})();
