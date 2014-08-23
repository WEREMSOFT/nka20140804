(function() {
    'use strict';
    var module = angular.module('Login', []);


    module.controller('LoginController', function($scope, $http, userData) {
        $scope.userData = userData;
        $scope.isWorking = false;
        $scope.login = function() {
            if($scope.isWorking) return;
            if (!$scope.user) {
                alert('La dirección de mail no es válida');
                return;
            }
            $scope.isWorking = true;
            window.localStorage.setItem("user", $scope.user);
            window.localStorage.setItem("password", $scope.password);
            window.localStorage.setItem("logedIn", true);
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
            $scope.isWorking = false;
            alert("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.httpSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            if (data.result.logedIn === 1) {
                $scope.userData.profileData = data.result.Usuario;
                window.localStorage.setItem("profileData", JSON.stringify(data.result.Usuario));
                $scope.userData.logedIn = true;
               
                ons.navigator.resetToPage('templates/PageHome.html');

            } else if (data.result.logedIn === -2) {
                alert('Nombre de usuario o contraseña invalidas');
            }

        }

        $scope.init = function() {
            console.log('inicializando......' + ons.navigator.getCurrentPage().name);
            if (ons.navigator.getCurrentPage().name === 'templates/FormProfile.html') {
                //$scope.userData = ons.navigator.getCurrentPage().options.userData; 
                return;
            }
            if ($scope.userData.logedIn === true) {
                ons.navigator.resetToPage('templates/FormProfile.html');
            } else {
                $scope.user = window.localStorage.getItem('user');
                $scope.password = window.localStorage.getItem('password');
            }
        }

        $scope.logout = function() {
            $scope.isWorking = true;
            var request = $http({
                method: "get",
                url: 'http://www.nakaoutdoors.com.ar/usuarios/logout',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            // Store the data-dump of the FORM scope.
            request.success(this.logoutSuccess);
            // Store the data-dump of the FORM scope.
            request.error(this.logoutError);
        }

        $scope.logoutError = function(data, status, headers, config) {
            $scope.isWorking = false;
            console.log("Oops! Algo ha salido mal. Reintenta en un momento");
        }

        $scope.logoutSuccess = function(data, status, headers, config) {
            $scope.isWorking = false;
            $scope.userData.reset();
            ons.navigator.resetToPage('templates/PageHome.html');
        }

    });

})();
