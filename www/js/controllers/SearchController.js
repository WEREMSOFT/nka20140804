(function() {
    'use strict';
    var module = angular.module('Search', []);
   

    module.controller('SearchController', function($scope, $http) {

        $scope.searchString = "";
        $scope.isWorking = false;
        $scope.products = [];

        $scope.search = function(strSearchString) {
            if(strSearchString.length < 3){
                alert('La cadena de busqueda es muy corta.');
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

        }

        $scope.httpError = function(data, status, headers, config) {
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            console.log(data);
            $scope.products = data.result;
            $scope.isWorking = false;
        }

        $scope.getUserDetails = function()
        {
            this.debugText = "Obteniendo detalles del usuario...";
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
