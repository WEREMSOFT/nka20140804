(function() {
    'use strict';
    var module = angular.module('Register', []);


    module.controller('RegisterController', function($scope, $http) {

        $scope.searchString = "";
        $scope.isWorking = false;
        $scope.products = [];

        $scope.register = function() {

            $scope.isWorking = true;
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/registro.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Usuario][nombre]=' + $scope.nombre + '&data[Usuario][apellido]=' + $scope.apellido + '&data[Usuario][liam]=' + $scope.email + '&data[Usuario][provincia_id]=' + $scope.provincia + '&data[Usuario][login]=' + $scope.userName + '&data[Usuario][password]=' + $scope.password + '&data[Usuario][check_password]=' + $scope.password + '&data[Usuario][ant]=' + $scope.hashAnt + '&data[Usuario][mail]=' + $scope.hashMail + '&data[Usuario][maps]=&'
            });

            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);

        }

        $scope.httpError = function(data, status, headers, config) {
            promptError("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
            $scope.result = data.result;
            if ($scope.result.code === 0) {
                prompt($scope.result.messagge);
            } else {
                promptError($scope.result.message);
            }
            $scope.isWorking = false;
            $scope.goBack();
        }
        $scope.getHash = function() {
            if ($scope.isWorking === true) return;
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/webservices/hash.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpGetHashSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);
        }

        $scope.goBack = function() {
            if ($scope.isWorking === true) return;
            ons.navigator.popPage();
        }

        $scope.httpGetHashSuccess = function(data) {
            var hashObj = data.result;
            $scope.hashMail = hashObj.mail;
            $scope.hashAnt = hashObj.ant;

            $scope.register();
        }

        $scope.httpError = function(data, status, headers, config) {
            promptError("Ooosp!, algo ha salido mal, reintente en un momento");
            $scope.isWorking = false;
        }

    });

    module.directive('moduleComboProvincias', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/comboProvincias.html'
        };
    });

    module.directive('moduleCategoryList', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/categoryList.html'
        };
    });

    module.directive('moduleProductList', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/modules/productList.html'
        };
    });
})();
