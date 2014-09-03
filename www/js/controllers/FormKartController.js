(function() {
    'use strict';
    var module = angular.module('Kart', []);


    module.controller('FormKartController', function($scope, $http) {

        $scope.cantidad = 1;
        $scope.myTalle = {};
        $scope.working = false;
        $scope.products = [];

        $scope.addToKart = function() {

            $scope.working = true;
            alert("cadorneando");
            console.log($scope.myTalle);
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/articulos/carrito_add.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Articulo][id]=' + $scope.product.id + '&data[Articulo][cantidad]=' + $scope.cantidad + '&data[Articulo][talle]=' + $scope.myTalle + '&'
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
            $scope.products = data.result;
            $scope.working = false;
        }
    });
})();
