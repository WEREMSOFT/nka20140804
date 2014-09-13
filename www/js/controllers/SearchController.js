(function() {
    'use strict';
    var module = angular.module('Search', []);


    module.controller('SearchController', function($scope, $http) {

        $scope.searchString = "";
        $scope.isWorking = false;
        $scope.products = [];

        $scope.search = function(strSearchString) {
            if (strSearchString.length < 3) {
                promptError('La cadena de busqueda es muy corta.');
                return;
            }

            $scope.isWorking = true;
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/webservices/search.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Busqueda][string]=' + strSearchString + '&',
            });


            // Store the data-dump of the FORM scope.
            request.success(this.httpSuccess);


            // Store the data-dump of the FORM scope.
            request.error(this.httpError);
            if (ons.navigator.getCurrentPage().name != "templates/FormSearch.html") {
                ons.navigator.pushPage("templates/FormSearch.html");
            }

        }

        $scope.httpError = function(data, status, headers, config) {
            promptError("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
            $scope.products = data.result;
            $scope.isWorking = false;
        }

        
    });

})();
