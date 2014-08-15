(function() {
    'use strict';
    var module = angular.module('Category', []);

    module.controller('CategoryController', function($scope, $http) {

        $scope.categories = [];
        $scope.products = null;
        $scope.lastCategory = [];
        $scope.nav = null;
        $scope.loading = true;

        $scope.getCategory = function(categoryID) {
            $scope.loading = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/categoria.json?id=' + categoryID,
            });

            this.httpGetCategoryDetailsError = function(data, status, headers, config) {
                console.log(data);
            }

            this.httpGetCategoryDetailsSuccess = function(data, status, headers, config) {
                if (data.result.child_categories) {
                    $scope.categories.push(data.result.child_categories);
                    console.log($scope.categories);
                    $scope.isCategory = true;
                } else if (data.result.child_products) {
                    $scope.products = data.result.child_products;
                    console.log($scope.products);
                    $scope.isCategory = false;
                }


                $scope.loading = false;
            }

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetCategoryDetailsSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetCategoryDetailsError);
        }

        $scope.showCategory = function(categoryID) {
            if ($scope.nav == null) {
                $scope.nav = ons.navigator;
                $scope.nav.on('prepop', function(event) {
                    var page = event.currentPage; // Get current page object
                    console.log('pagina');
                    console.log(event.currentPage);
                    if (page.page == "templates/PageCategory.html") {
                        if ($scope.products) {
                            $scope.products = null;
                        } else {
                            var pop = $scope.categories.pop();
                            console.log('popeando: ')
                            console.log(pop);

                        }
                    }
                });
            }


            $scope.lastCategory.push(categoryID);
            $scope.getCategory(categoryID);
            ons.navigator.pushPage('templates/PageCategory.html');
        }

        $scope.getProduct = function(productID) {

            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/producto.json?id=' + productID,
            });

            this.httpGetProductDetailsError = function(data, status, headers, config) {
                console.log(data);
            }

            this.httpGetProductDetailsSuccess = function(data, status, headers, config) {
                $scope.product = data.result;
                console.log($scope.product);
                $scope.isCategory = false;
                $scope.loading = false;
            }

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetProductDetailsSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetProductDetailsError);
        }

        $scope.showProduct = function(productID) {
            $scope.loading = true;
            $scope.getProduct(productID);
            ons.navigator.pushPage('templates/PageProduct.html');
        }

        $scope.getDestacados = function() {
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/destacados.json',
            });

            this.httpGetDestacadosDetailsError = function(data, status, headers, config) {
                console.log(data);
            }

            this.httpGetDestacadosSuccess = function(data, status, headers, config) {
                $scope.destacadosHome = data.result.child_products;
                console.log($scope.destacadosHome);
            }

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetDestacadosSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetDestacadosDetailsError);
        }




        $scope.getCategory(0);
        $scope.getDestacados();
    });



})();
