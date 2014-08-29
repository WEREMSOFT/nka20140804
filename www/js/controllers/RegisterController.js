(function() {
    'use strict';
    var module = angular.module('Register', []);
   

    module.controller('RegisterController', function($scope, $http) {

        $scope.searchString = "";
        $scope.working = false;
        $scope.products = [];

        $scope.register = function() {
           
            $scope.working = true;
            var request = $http({
                method: "post",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/registro',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

                data: '_method=POST&data[Usuario][nombre]=' + $scope.nombre + '&data[Usuario][apellido]=' + $scope.apellido + '&data[Usuario][mail]=' + $scope.email + '&data[Usuario][provincia_id]=2&data[Usuario][login]=' + $scope.userName + '&data[Usuario][password]=' + $scope.password + '&data[Usuario][check_password]=' + $scope.passwordVerification + '&data[Usuario][tipo_usuario_id]=2&data[Usuario][habilitado]=0&'
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

