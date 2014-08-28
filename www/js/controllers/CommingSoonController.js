(function() {
    'use strict';
    var module = angular.module('CommingSoon', []);

    module.controller('CommingSoonController', function($scope, $http) {

        $scope.searchString = "";
        $scope.working = false;
        $scope.newProducts = [];

        $scope.init = function() {
            console.log('inicializando');
            $scope.working = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/proximamente.json',
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
            $scope.newProducts = data.result.child_products;
            $scope.working = false;
        }
    });


})();
