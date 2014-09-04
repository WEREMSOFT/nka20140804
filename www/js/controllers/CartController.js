(function() {
    'use strict';
    var module = angular.module('Cart', []);


    module.controller('CartController', function($scope, $http, shoppingCart) {
        $scope.shoppingCart = shoppingCart;
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
            shoppingCart.refreshCartDetails();
            $scope.products = data.result;
            $scope.working = false;
        }

        $scope.init = function() {
            console.log('cargando carrito de compras');
            $scope.working = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/carrito.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpRecorverCartSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpRecorverCartError);
        }

        $scope.httpRecorverCartError = function(data, status, headers, config) {
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpRecorverCartSuccess = function(data, status, headers, config) {
            console.log(data);
            $scope.products = data.result.items;
            $scope.working = false;
        }

    });
})();
