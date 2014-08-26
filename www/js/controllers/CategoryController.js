(function() {
    'use strict';
    var module = angular.module('Category', []);

    module.controller('CategoryController', function($scope, $http, userData) {
        $scope.userData = userData;
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
                    var categoryID = 0;
                    if (ons.navigator.getCurrentPage().options.categoryID) {
                        categoryID = ons.navigator.getCurrentPage().options.categoryID;
                    }
                    $scope.categories[categoryID] = data.result.child_categories;
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
            ons.navigator.pushPage('templates/PageCategory.html', {
                'categoryID': categoryID
            });
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
                $scope.currentSlide = $scope.product.images[0];
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

        $scope.init = function() {
            console.log('page initialize');
            var categoryID = 0;
            if (ons.navigator) {
                if (ons.navigator.getCurrentPage().options.categoryID) {
                    categoryID = ons.navigator.getCurrentPage().options.categoryID;
                }
            }
            $scope.getCategory(categoryID);
        }

        $scope.setCurrentSlide = function(pSlide)
        {
            $scope.currentSlide = pSlide;
        }
    });



})();
