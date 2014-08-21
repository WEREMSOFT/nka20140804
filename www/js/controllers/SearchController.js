(function() {
    'use strict';
    var module = angular.module('Search', []);
   

    module.controller('SearchController', function($scope, $http) {

        $scope.search = function(strSearchString) {
            if(strSearchString.logedIn < 3){
                alert('La cadena de busqueda es muy corta.');
                return;
            }
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/applogin.json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Login][login]=' + $scope.user + '&data[Login][password]=' + $scope.password + '&',
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
            if(data.result.logedIn === 1)
            {
                alert('Bienvenido ' + data.result.Usuario.nombre + '!!');
            }else if(data.result.logedIn === -2)
            {
                alert('Nombre de usuario o contraseña invalidas');
            }
            
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
