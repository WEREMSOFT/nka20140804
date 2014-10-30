(function() {
    'use strict';
    var module = angular.module('MainApp', []);

    module.controller('MainAppController', function($scope, $http, $sce, userData, shoppingCart) {
        $scope.userData = userData;
        $scope.shoppingCart = shoppingCart;
        $scope.categories = [];
        $scope.products = null;
        $scope.lastCategory = [];
        $scope.nav = null;
        $scope.loading = true;

        $scope.searchString = "";
        $scope.isWorking = false;

        $scope.barCodeScanEnabled = true;

        $scope.deviceType = deviceType;
        $scope.connectionFail = false;

        $scope.searchTotal = 0;
        $scope.lastPage = 1;

        $scope.slides2 = [{
            "id": 1,
            "label": "slide #1",
            "img": "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1.jpg",
            "color": "#fc0003",
            "odd": true
        }, {
            "id": 2,
            "label": "slide #2",
            "img": "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1_1.jpg",
            "color": "#c90036",
            "odd": false
        }, {
            "id": 3,
            "label": "slide #3",
            "img": "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1_2.jpg",
            "color": "#c90036",
            "odd": false
        }];

        var nakaSlides = [{
            file: "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1.jpg",
            url: ""
        }, {
            file: "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1_1.jpg",
            url: ""
        }, {
            file: "http://www.nakaoutdoors.com.ar/img/slides/slide_mobile_test_1_2.jpg",
            url: ""
        }];

        console.log($scope.slides2);

        $scope.getCategory = function(categoryID) {
            $scope.loading = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/categoria.json?id=' + categoryID + '&max=9999&offset=1&order=1',
            });

            this.httpGetCategoryDetailsError = function(data, status, headers, config) {
                $scope.loading = false;
                $scope.connectionFail = true;
            }

            this.httpGetCategoryDetailsSuccess = function(data, status, headers, config) {
                console.log("cargando categoría");
                if (data.result.child_categories) {
                    var categoryID = 0;
                    if (ons.navigator) {
                        if (ons.navigator.getCurrentPage().options.categoryID) {
                            categoryID = ons.navigator.getCurrentPage().options.categoryID;
                        }
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
                $scope.connectionFail = false;
                $scope.checkForPushNotificationData();
            }

            // Store the data-dump of the FORM scope.
            request.success(this.httpGetCategoryDetailsSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpGetCategoryDetailsError);
        }

        $scope.showCategory = function(categoryID) {
            console.log(categoryID);
            ons.navigator.pushPage('templates/pages/PageCategory.html', {
                'categoryID': categoryID
            });
        }

        $scope.getProduct = function(productID, pIsCodebar) {
            var searchVariable = pIsCodebar ? 'barcode' : 'id';

            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/producto.json?' + searchVariable + '=' + productID,
            });

            this.httpGetProductDetailsError = function(data, status, headers, config) {
                console.log(data);
                $scope.connectionFail = true;
                $scope.loading = false;
            }

            this.httpGetProductDetailsSuccess = function(data, status, headers, config) {
                $scope.connectionFail = false;
                $scope.product = data.result;
                if ($scope.product.code === 3) {
                    prompt('Atículo no encontrado');
                    $scope.loading = false;
                    ons.navigator.popPage();
                    return;
                }

                if ($scope.product.video) {
                    $scope.product.videoURL = '';

                    if ($scope.product.video.type === 'YOUTUBE') {
                        $scope.product.videoURL = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + $scope.product.video.code);
                    }
                    if ($scope.product.video.type === 'VIMEO') {
                        $scope.product.videoURL = $sce.trustAsResourceUrl('http://player.vimeo.com/video/' + $scope.product.video.code);
                    }
                }

                if ($scope.product.options) {
                    $scope.product.talles = [];
                    if ($scope.product.options["En Stock"]) {
                        for (var i = 0; i < $scope.product.options["En Stock"].length; i++) {
                            $scope.product.options["En Stock"][i].stock = "En Stock";
                        }
                        console.log('concatenando...');
                        $scope.product.talles = $scope.product.talles.concat($scope.product.options["En Stock"]);
                    }

                    if ($scope.product.options["Consultar Stock"]) {
                        for (var i = 0; i < $scope.product.options["Consultar Stock"].length; i++) {
                            $scope.product.options["Consultar Stock"][i].stock = "Consultar Stock";
                        }
                        console.log('concatenando...');
                        $scope.product.talles = $scope.product.talles.concat($scope.product.options["Consultar Stock"]);
                    }
                    console.log("opciones de talle");
                    console.log($scope.product.talles);
                }

                $scope.product.unsafeParsedHTML = $sce.trustAsHtml($scope.product.body);

                var stars = new Array(5);
                for (var i = 0; i < 5; i++) {
                    stars[i] = {
                        "value": 0
                    };
                    stars[i].value = (i + 1) <= $scope.product.score ? 1 : 0;
                }
                $scope.product.stars = stars;


                console.log($scope.product.stars);



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

        $scope.showProduct = function(productID, pCodebar) {
            $scope.loading = true;
            $scope.getProduct(productID, pCodebar);
            ons.navigator.pushPage('templates/pages/PageProduct.html');
        }

        $scope.getDestacados = function() {
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/destacados.json?max=9999&offset=1&order=1',
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



        $scope.setCurrentSlide = function(pSlide) {
            $scope.currentSlide = pSlide;
        }

        $scope.checkForPushNotificationData = function() {
            if (gcmProductID) {
                $scope.showProduct(gcmProductID);
                gcmProductID = null;
            } else if (gcmCategoryID) {
                $scope.showCategory(gcmCategoryID);
                gcmCategoryID = null;
            }
        }

        $scope.search = function(strSearchString, pPage, pCount) {
            $scope.searchString = strSearchString;
            if (gaPlugin) {
                gaPlugin.trackEvent(googleAnalyticsTrackEventSuccess, googleAnalyticsTrakEventError, "Application", "SearchString", strSearchString, 1);
            }

            if (pCount == null) {
                pCount = 30;
            }

            if (pPage == null) {
                pPage = 1;
                $scope.lastPage = 1;
            } else {
                $scope.lastPage = pPage;
            }

            $scope.isWorking = true;
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/webservices/search.json?max=' + pCount + '&offset=' + pPage + '&order=1',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Busqueda][string]=' + strSearchString + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success($scope.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error($scope.httpError);

            if (ons.navigator.getCurrentPage().name != "templates/forms/FormSearch.html") {
                ons.navigator.pushPage("templates/forms/FormSearch.html");
            }

        }

        $scope.httpError = function(data, status, headers, config) {
            $scope.connectionFail = true;
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.connectionFail = false;
            if ($scope.lastPage > 1) {
                $scope.products = $.merge($scope.products, data.result.child_products);
            } else {
                $scope.products = data.result.child_products;
            }

            $scope.isWorking = false;
            $scope.searchTotal = data.result.count;
        }

        $scope.barCodeScan = function() {
            cordova.plugins.barcodeScanner.scan($scope.barCodeScanSuccess, $scope.barCodeScanError);
        }

        $scope.barCodeScanSuccess = function(result) {
            /*           prompt("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);*/
            if (result.cancelled) {
                prompt('Lectura Cancelada');
            } else {
                $scope.showProduct(result.text, true);
            }

        }

        $scope.barCodeScanError = function(error) {
            promptError("Scanning failed: " + error);
        }

        $scope.init = function() {
            console.log('page initialize');
            $scope.connectionFail = false;
            var categoryID = 0;
            if (ons.navigator) {
                if (ons.navigator.getCurrentPage().options.categoryID) {
                    categoryID = ons.navigator.getCurrentPage().options.categoryID;
                }
            }
            $scope.getCategory(categoryID);

        }

        document.addEventListener("resume", $scope.checkForPushNotificationData, false);
        document.addEventListener("deviceready", $scope.init, false);


    });


    module.directive('moduleSinConexion', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/sinConexion.html'
        };
    });

    module.directive('moduleHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/header.html'
        };
    });

    module.directive('moduleLoadingSpinner', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/loadingSpinner.html'
        };
    });

    module.directive('moduleTabBarBottom', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/tabBarBottom.html'
        };
    });
    module.directive('moduleStockColorCodes', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/stockColorCodes.html'
        };
    });







})();
